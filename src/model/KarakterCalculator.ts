import { Calculation, CalculationArgument, CalculationValue } from "./Calculation";
import { Harcertek } from "./Harcertek";
import { Karakter, SzintInfo } from "./Karakter";
import { KockaDobas } from "./Kocka";
import { transformRecord } from "./util";

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
    fegyverrel: {
        ke: CalculationArgument,
        ve: CalculationArgument,
        kezek: [CalcFegyver?, CalcFegyver?]
    }
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
        const fegyverCalc = (idx: 0 | 1): CalcFegyver & { ke: CalculationArgument, ve: CalculationArgument } | undefined => {
            const fegyver = karakter.kezek[idx];
            if (!fegyver) {
                return undefined;
            } else {
                const ke = Calculation.plusz(Calculation.value('Alap KÉ', Calculation.calculate(harcertek.ke)), Calculation.value(fegyver.nev, fegyver.ke));
                const te = Calculation.plusz(Calculation.value('Alap TÉ', Calculation.calculate(harcertek.te)), Calculation.value(fegyver.nev, fegyver.te));
                const ve = Calculation.plusz(Calculation.value('Alap VÉ', Calculation.calculate(harcertek.ve)), Calculation.value(fegyver.nev, fegyver.ve));
                //TODO: kockadobas calculation
                //TODO: erobonusz
                const sebzes: KockaDobas = {
                    ...fegyver.sebzes,
                    plusz: fegyver.sebzes.plusz + Calculation.calculate(harcertek.sebzes)
                }
                return { ke, te, ve, sebzes };
            }
        }
        return {
            kepessegek,
            fp: Calculation.plusz(Calculation.tizFolottiResz(kepessegek, 'allokepesseg'), Calculation.tizFolottiResz(kepessegek, 'onuralom'), ...szintCalc(karakter, sz => sz.fp)),
            ep: Calculation.plusz(Calculation.tizFolottiResz(kepessegek, 'egeszseg'), Calculation.value('Alap ÉP', karakter.ep)),
            harcertek,
            fegyverrel: calculateFegyverrel(harcertek, [fegyverCalc(0), fegyverCalc(1)])
        }
    }
}

const optionalCalculation = (c: CalculationArgument | undefined): number => c ? Calculation.calculate(c) : -100000;

const calculateFegyverrel = (harcertek: KarakterCalcResult['harcertek'], kezek: [((CalcFegyver & { ke: CalculationArgument; ve: CalculationArgument; }) | undefined), ((CalcFegyver & { ke: CalculationArgument; ve: CalculationArgument; }) | undefined)]): KarakterCalcResult['fegyverrel'] => {
    let ke = undefined;
    let ve = undefined;
    if (kezek[0] && kezek[1]) {
        ke = optionalCalculation(kezek[0].ke) < optionalCalculation(kezek[1].ke) ? kezek[0].ke : kezek[1].ke;
        ve = optionalCalculation(kezek[0].ve) < optionalCalculation(kezek[1].ve) ? kezek[1].ve : kezek[0].ve;
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
