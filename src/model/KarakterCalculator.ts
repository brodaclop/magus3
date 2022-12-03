import { Calculation, CalculationArgument, CalculationBinary, CalculationValue } from "./Calculation";
import { Fegyver, FEGYVER_KEPZETTSEG_HARCERTEKEK } from "./Fegyver";
import { Harcertek } from "./Harcertek";
import { convertHarcmodorEffect, HarcmodorCalculation, HarcmodorEffect, HARCMODOR_EFFEKTEK } from "./Harcmodor";
import { Karakter, SzintInfo } from "./Karakter";
import { KockaDobas } from "./Kocka";
import { mergeToArray, transformRecord } from "./util";

export interface CalcFegyver {
    te: CalculationArgument,
    //TODO: kocka calculation?
    sebzes: KockaDobas,
}

export interface KarakterCalcResult {
    fp: CalculationArgument;
    ep: CalculationArgument;
    kepessegek: Record<string, number>;
    harcertek: Record<keyof Harcertek, CalculationArgument>;
    harcmodor?: HarcmodorCalculation;
    fegyverrel: {
        ke: CalculationArgument,
        ve: CalculationArgument,
        kezek: [CalcFegyver?, CalcFegyver?]
    },
    kepzettsegek: SzintInfo['kepzettsegek']
};


const szintCalc = (karakter: Karakter, fn: (szint: SzintInfo) => number): Array<CalculationValue> =>
    karakter.szint.map((sz, i) => Calculation.value(`${sz.kaszt.name} ${i}. szint`, fn(sz)));

export const KarakterCalculator = {
    calc: (karakter: Karakter): KarakterCalcResult => {
        const kepessegek = transformRecord(karakter.kepessegek, (k, v) => v + (karakter.faj.kepessegek[k] ?? 0));
        const harcertek: KarakterCalcResult['harcertek'] = {
            ke: Calculation.plusz(Calculation.tizFolottiResz(kepessegek, 'reflex'), Calculation.tizFolottiResz(kepessegek, 'osszpontositas'), ...szintCalc(karakter, sz => sz.harcertek.ke ?? 0)),
            te: Calculation.plusz(Calculation.tizFolottiResz(kepessegek, 'reflex'), Calculation.tizFolottiResz(kepessegek, 'izom'), Calculation.tizFolottiResz(kepessegek, 'mozgaskoordinacio'), ...szintCalc(karakter, sz => sz.harcertek.te ?? 0)),
            ve: Calculation.plusz(Calculation.tizFolottiResz(kepessegek, 'reflex'), Calculation.tizFolottiResz(kepessegek, 'mozgaskoordinacio'), ...szintCalc(karakter, sz => sz.harcertek.ve ?? 0)),
            ce: Calculation.plusz(Calculation.tizFolottiResz(kepessegek, 'mozgaskoordinacio'), Calculation.tizFolottiResz(kepessegek, 'osszpontositas'), ...szintCalc(karakter, sz => sz.harcertek.ce ?? 0)),
            sebzes: Calculation.plusz(...szintCalc(karakter, sz => sz.harcertek.sebzes ?? 0))
        };

        const normalKepzettsegek = karakter.szint.reduce((acc, curr) => {
            curr.kepzettsegek.normal.forEach(kepz => mergeToArray(acc, kepz, i => i.kepzettseg.id));
            return acc;
        }, [] as SzintInfo['kepzettsegek']['normal']);

        const harcmodor = HARCMODOR_EFFEKTEK.find(e => e.isAvailable(karakter.kezek));
        const harcmodorKepzettseg = normalKepzettsegek.find(k => k.kepzettseg.id === `harcmodor:${harcmodor?.id}`);
        const harcmodorHatasok = convertHarcmodorEffect(harcmodor?.szintek[harcmodorKepzettseg?.fok ?? 0] ?? []);

        const fegyverCalc = (idx: 0 | 1): CalcFegyver & { ke: CalculationArgument, ve: CalculationArgument } | undefined => {
            const fegyver = karakter.kezek[idx];
            if (!fegyver) {
                return undefined;
            } else {
                let fokMinusz = 0;
                if ((idx === 0 && harcmodorHatasok.kez0minusz3) || (idx === 1 && harcmodorHatasok.kez1minusz3)) {
                    fokMinusz = 3;
                }
                if ((idx === 0 && harcmodorHatasok.kez0minusz2) || (idx === 1 && harcmodorHatasok.kez1minusz2)) {
                    fokMinusz = 2;
                }
                if ((idx === 0 && harcmodorHatasok.kez0minusz1) || (idx === 1 && harcmodorHatasok.kez1minusz1)) {
                    fokMinusz = 1;
                }
                const kepzettseg = (idx === 1 && harcmodorHatasok.kez1pont2)
                    ? FEGYVER_KEPZETTSEG_HARCERTEKEK[2]
                    : Fegyver.kepzettseg(normalKepzettsegek, fegyver, fokMinusz);
                const ke = Calculation.plusz(Calculation.value('Fegyver nélkül', Calculation.calculate(harcertek.ke)), Calculation.value(fegyver.nev, fegyver.ke), Calculation.value('Képzettség', kepzettseg.ke));
                const te = Calculation.plusz(Calculation.value('Fegyver nélkül', Calculation.calculate(harcertek.te)), Calculation.value(fegyver.nev, fegyver.te), Calculation.value('Képzettség', kepzettseg.te));
                const ve = Calculation.plusz(Calculation.value('Fegyver nélkül', Calculation.calculate(harcertek.ve)), Calculation.value(fegyver.nev, fegyver.ve), Calculation.value('Képzettség', kepzettseg.ve));
                //TODO: erobonusz
                const sebzes: KockaDobas = {
                    ...fegyver.sebzes,
                    plusz: fegyver.sebzes.plusz + Calculation.calculate(harcertek.sebzes)
                }
                return { ke, te, ve, sebzes };
            }
        };

        return {
            kepessegek,
            fp: Calculation.plusz(Calculation.tizFolottiResz(kepessegek, 'allokepesseg'), Calculation.tizFolottiResz(kepessegek, 'onuralom'), ...szintCalc(karakter, sz => sz.fp)),
            ep: Calculation.plusz(Calculation.tizFolottiResz(kepessegek, 'egeszseg'), Calculation.value('Alap ÉP', karakter.ep)),
            harcertek,
            harcmodor,
            fegyverrel: calculateFegyverrel(harcertek, [fegyverCalc(0), fegyverCalc(1)], harcmodorHatasok),
            kepzettsegek: {
                normal: normalKepzettsegek,
                szazalekos: []
            }
        }
    }
}

const calculateFegyverrel = (
    harcertek: KarakterCalcResult['harcertek'],
    kezek: [((CalcFegyver & { ke: CalculationArgument; ve: CalculationArgument; }) | undefined), ((CalcFegyver & { ke: CalculationArgument; ve: CalculationArgument; }) | undefined)],
    harcmodorHatasok: Record<HarcmodorEffect, boolean>
): KarakterCalcResult['fegyverrel'] => {
    let ke = undefined;
    let ve = undefined;
    if (kezek[0] && kezek[1]) {
        if (harcmodorHatasok.kez1NoAttack) {
            ke = kezek[0].ke;
        } else {
            ke = Calculation.min(kezek[0].ke, kezek[1].ke);
        }
        if (harcmodorHatasok.mindketVE) {
            ve = Calculation.plusz(kezek[0].ve, Calculation.remove(kezek[1].ve as CalculationBinary, 'Fegyver nélkül', 'Képzettség'));
        } else {
            ve = Calculation.max(kezek[0].ve, kezek[1].ve);
        }
        if (harcmodorHatasok.mindketTE) {
            kezek[0].te = Calculation.plusz(kezek[0].te, Calculation.remove(kezek[1].te as CalculationBinary, 'Fegyver nélkül', 'Képzettség'));
            kezek[1].te = Calculation.plusz(kezek[1].te, Calculation.remove(kezek[0].te as CalculationBinary, 'Fegyver nélkül', 'Képzettség'));
        }
    } else if (kezek[0]) {
        ke = kezek[0].ke;
        ve = kezek[0].ve;
    } else {
        ke = harcertek.ke;
        ve = harcertek.ve;
    }

    return {
        kezek,
        ke,
        ve
    };
}
