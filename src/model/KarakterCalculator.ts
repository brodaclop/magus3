import { Calculation, CalculationArgument, CalculationBinary, CalculationValue } from "./Calculation";
import { Fegyver, FEGYVER_KEPZETTSEG_HARCERTEKEK, SebzesTipus } from "./Fegyver";
import { Harcertek } from "./Harcertek";
import { convertHarcmodorEffect, HarcmodorCalculation, HarcmodorEffect, HARCMODOR_EFFEKTEK } from "./Harcmodor";
import { Karakter, SzintInfo } from "./Karakter";
import { KockaDobas } from "./Kocka";
import { Lofegyver } from "./Lofegyver";
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
    pillanatnyiKepessegek: Record<string, CalculationArgument>;
    harcertek: Record<keyof Harcertek, CalculationArgument>;
    harcmodor?: HarcmodorCalculation;
    fegyverrel: {
        ke: CalculationArgument,
        ve: CalculationArgument,
        kezek: [CalcFegyver?, CalcFegyver?]
    },
    lofegyverrel?: {
        ke: CalculationArgument,
        ce: CalculationArgument,
        sebzes: KockaDobas,
        lotav: number,
    },
    kepzettsegek: SzintInfo['kepzettsegek'],
    sfe: Record<SebzesTipus, number>;
    mgt: CalculationArgument;
    findNormalKepzettseg: (id: string) => SzintInfo['kepzettsegek']['normal'][0] | undefined;
    pendingKepzettsegekCount: number;
};


const szintCalc = (karakter: Karakter, fn: (szint: SzintInfo) => number): Array<CalculationValue> =>
    karakter.szint.map((sz, i) => Calculation.value(`${sz.kaszt.name} ${i}. szint`, fn(sz)));

export const KarakterCalculator = {
    calc: (karakter: Karakter): KarakterCalcResult => {
        const kepessegek = transformRecord(karakter.kepessegek, (k, v) => v + (karakter.faj.kepessegek[k] ?? 0));

        const normalKepzettsegek = karakter.szint.reduce((acc, curr) => {
            curr.kepzettsegek.normal.forEach(kepz => mergeToArray(acc, kepz, i => i.kepzettseg.id));
            return acc;
        }, [] as SzintInfo['kepzettsegek']['normal']);

        const szazalekosKepzettsegek = karakter.szint.reduce((acc, curr) => {
            curr.kepzettsegek.szazalekos.forEach(kepz => {
                const previous = acc.find(k => k.kepzettseg.id === kepz.kepzettseg.id);
                if (previous === undefined) {
                    acc.push(structuredClone(kepz));
                } else {
                    previous.szazalek += kepz.szazalek;
                }
            });
            return acc;
        }, [] as SzintInfo['kepzettsegek']['szazalekos']);

        const harcmodor = HARCMODOR_EFFEKTEK.find(e => e.isAvailable(karakter.kezek));
        const harcmodorKepzettseg = normalKepzettsegek.find(k => k.kepzettseg.id === `harcmodor:${harcmodor?.id}`);
        const harcmodorHatasok = convertHarcmodorEffect(harcmodor?.szintek[harcmodorKepzettseg?.fok ?? 0] ?? []);

        const pancelMgt = karakter.pancel?.mgt ?? 0;
        const pajzsMgt = karakter.kezek[1]?.mgt ?? 0;
        const vertviselet = normalKepzettsegek.find(k => k.kepzettseg.id === 'vertviselet')?.fok ?? 0;
        const mgtCalc: Array<CalculationValue> = [];
        if (pancelMgt) {
            mgtCalc.push(Calculation.value('Páncél', pancelMgt));
        }
        if (pajzsMgt) {
            mgtCalc.push(Calculation.value('Pajzs', pajzsMgt));
        }
        if (vertviselet > 0 && pancelMgt > 0) {
            mgtCalc.push(Calculation.value('Vértviselet', - Math.min(vertviselet, pancelMgt)));
        }
        if (harcmodorHatasok.noMGT) {
            mgtCalc.push(Calculation.value('Harcmodor', - pajzsMgt));
        }

        const mgt = Calculation.plusz(...mgtCalc);

        const pillanatnyiKepessegek = transformRecord(kepessegek, k => {
            if (k === 'mozgaskoordinacio' || k === 'reflex') {
                return Calculation.max(Calculation.value('Minimum', 10), Calculation.plusz(Calculation.value('Normál', kepessegek[k]), Calculation.value('MGT', -Calculation.calculate(mgt))));
            }
            return Calculation.value('Normál', kepessegek[k]);
        });

        const pillKep = transformRecord(pillanatnyiKepessegek, k => Calculation.calculate(pillanatnyiKepessegek[k]));

        const harcertek: KarakterCalcResult['harcertek'] = {
            ke: Calculation.plusz(Calculation.tizFolottiResz(pillKep, 'reflex'), Calculation.tizFolottiResz(pillKep, 'osszpontositas'), ...szintCalc(karakter, sz => sz.harcertek.ke ?? 0)),
            te: Calculation.plusz(Calculation.tizFolottiResz(pillKep, 'reflex'), Calculation.tizFolottiResz(pillKep, 'izom'), Calculation.tizFolottiResz(pillKep, 'mozgaskoordinacio'), ...szintCalc(karakter, sz => sz.harcertek.te ?? 0)),
            ve: Calculation.plusz(Calculation.tizFolottiResz(pillKep, 'reflex'), Calculation.tizFolottiResz(pillKep, 'mozgaskoordinacio'), ...szintCalc(karakter, sz => sz.harcertek.ve ?? 0)),
            ce: Calculation.plusz(Calculation.tizFolottiResz(pillKep, 'mozgaskoordinacio'), Calculation.tizFolottiResz(pillKep, 'osszpontositas'), ...szintCalc(karakter, sz => sz.harcertek.ce ?? 0)),
            sebzes: Calculation.plusz(...szintCalc(karakter, sz => sz.harcertek.sebzes ?? 0))
        };

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
                    : Fegyver.kepzettseg(normalKepzettsegek, fegyver, fokMinusz)[0];
                const ke = Calculation.plusz(Calculation.value('Fegyver nélkül', Calculation.calculate(harcertek.ke)), Calculation.value(fegyver.name, fegyver.ke), Calculation.value('Képzettség', kepzettseg.ke));
                const te = Calculation.plusz(Calculation.value('Fegyver nélkül', Calculation.calculate(harcertek.te)), Calculation.value(fegyver.name, fegyver.te), Calculation.value('Képzettség', kepzettseg.te));
                const ve = Calculation.plusz(Calculation.value('Fegyver nélkül', Calculation.calculate(harcertek.ve)), Calculation.value(fegyver.name, fegyver.ve), Calculation.value('Képzettség', kepzettseg.ve));

                const erobonuszHatar = fegyver.erobonusz ?? fegyver.kategoria.erobonusz;
                const erobonusz = erobonuszHatar === 0 ? 0 : Math.max(0, pillKep.izom - erobonuszHatar);

                const sebzes: KockaDobas = {
                    ...fegyver.sebzes,
                    plusz: fegyver.sebzes.plusz + Calculation.calculate(harcertek.sebzes) + erobonusz
                }
                return { ke, te, ve, sebzes };
            }
        };

        const lofegyverCalc = (): KarakterCalcResult['lofegyverrel'] | undefined => {
            if (!karakter.lofegyver) {
                return;
            }
            const fegyver = karakter.lofegyver;
            const kepzettseg = Fegyver.kepzettseg(normalKepzettsegek, karakter.lofegyver, 0);
            const ke = Calculation.plusz(Calculation.value('Fegyver nélkül', Calculation.calculate(harcertek.ke)), Calculation.value(fegyver.name, fegyver.ke), Calculation.value('Képzettség', kepzettseg[0].ke));
            const ce = Calculation.plusz(Calculation.value('Fegyver nélkül', Calculation.calculate(harcertek.ce)), Calculation.value(fegyver.name, fegyver.ce), Calculation.value('Képzettség', kepzettseg[0].ce));
            const sebzes = fegyver.tipus !== 'ij' ? fegyver.sebzes : Lofegyver.calculateIj(pillKep.izom, kepzettseg[1], fegyver).sebzes;
            const lotav = fegyver.tipus !== 'ij' ? fegyver.lotav : Lofegyver.calculateIj(pillKep.izom, kepzettseg[1], fegyver).lotav;
            return {
                ke, ce, sebzes, lotav
            }
        }

        return {
            kepessegek,
            fp: Calculation.plusz(Calculation.tizFolottiResz(kepessegek, 'allokepesseg'), Calculation.tizFolottiResz(kepessegek, 'onuralom'), ...szintCalc(karakter, sz => sz.fp)),
            ep: Calculation.plusz(Calculation.tizFolottiResz(kepessegek, 'egeszseg'), Calculation.value('Alap ÉP', karakter.ep)),
            harcertek,
            harcmodor,
            fegyverrel: calculateFegyverrel(harcertek, [fegyverCalc(0), fegyverCalc(1)], harcmodorHatasok),
            lofegyverrel: lofegyverCalc(),
            kepzettsegek: {
                normal: normalKepzettsegek,
                szazalekos: szazalekosKepzettsegek,
            },
            sfe: karakter.pancel?.sfe ?? { zuzo: 0, szuro: 0, vago: 0 },
            mgt,
            pillanatnyiKepessegek,
            findNormalKepzettseg: id => normalKepzettsegek.find(k => k.kepzettseg.id === id),
            pendingKepzettsegekCount: karakter.szint.map(sz => sz.pendingKepzettsegek.length).reduce((acc, curr) => acc + curr, 0),
        };
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
        } else if (harcmodorHatasok.shiensuTE) {
            kezek[0].te = Calculation.plusz(kezek[0].te, Calculation.remove(kezek[1].te as CalculationBinary, 'Fegyver nélkül'));
            kezek[1].te = Calculation.plusz(kezek[1].te, Calculation.remove(kezek[0].te as CalculationBinary, 'Fegyver nélkül'));
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
