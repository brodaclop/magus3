import { Calculation, CalculationArgument, CalculationValue } from "./Calculation";
import { Faj, Fajok } from "./Fajok";
import { Harcertek } from "./Harcertek";
import { KasztInfo, Kasztok } from "./Kasztok";
import { Kepessegek, KepessegKategoria } from "./Kepessegek";
import { kockaDobas } from "./Kocka";
import { transformRecord } from "./util";

export interface KarakterTemplate {
    faj: Faj,
    kaszt: KasztInfo,
    szint: number,
    kepessegKategoriak: Record<KepessegKategoria, number>;
}

interface SzintInfo {
    kaszt: KasztInfo,
    harcertek: Harcertek,
    fp: number,
};

export interface Karakter {
    readonly faj: Faj;
    szint: Array<SzintInfo>;
    kepessegek: Record<string, number>;
    ep: number;
    hm: number;
}

export interface KarakterCalcResult {
    fp: CalculationArgument;
    ep: CalculationArgument;
    kepessegek: Record<string, number>;
    harcertek: Record<keyof Harcertek, CalculationArgument>;
}

const levelUp = (karakter: Karakter, kaszt?: KasztInfo): Karakter => {
    const szintKaszt = kaszt ?? karakter.szint[karakter.szint.length - 1].kaszt;
    const dobas = karakter.szint.length === 1 ? 6 : kockaDobas({ darab: 1, kocka: 6 }).osszeg;
    karakter.szint.push({
        kaszt: szintKaszt,
        fp: dobas + szintKaszt.fpPerSzint,
        harcertek: Harcertek.add(szintKaszt.harcertek)
    });
    karakter.hm += szintKaszt.hm;
    return karakter;
};

const szintCalc = (karakter: Karakter, fn: (szint: SzintInfo) => number): Array<CalculationValue> =>
    karakter.szint.map((sz, i) => Calculation.value(`${sz.kaszt.name} ${i}. szint`, fn(sz)));

export const Karakter = {
    createTemplate: (options?: { faj?: Faj, kaszt?: KasztInfo }): KarakterTemplate => ({ faj: options?.faj ?? Fajok.lista[0], kaszt: options?.kaszt ?? Kasztok.lista[0], szint: 1, kepessegKategoriak: { Fizikum: 0, Ügyesség: 0, Mentál: 0, Asztrál: 0 } }),
    create: (template: KarakterTemplate): Karakter => {
        const ret: Karakter = {
            faj: template.faj,
            szint: [
                {
                    kaszt: template.kaszt,
                    harcertek: Harcertek.add(template.kaszt.harcertekAlap),
                    fp: template.kaszt.fpAlap,
                }
            ],
            kepessegek: Kepessegek.newErtekRecord(),
            ep: template.kaszt.epAlap,
            hm: 0
        };
        levelUp(ret, template.kaszt);
        return ret;
    },
    levelUp,
    calc: (karakter: Karakter): KarakterCalcResult => {
        const kepessegek = transformRecord(karakter.kepessegek, (k, v) => v + (karakter.faj.kepessegek[k] ?? 0));
        return {
            kepessegek,
            fp: Calculation.plusz(...szintCalc(karakter, sz => sz.fp), Calculation.tizFolottiResz(kepessegek, 'allokepesseg'), Calculation.tizFolottiResz(kepessegek, 'onuralom')),
            ep: Calculation.plusz(Calculation.value('Alap ÉP', karakter.ep), Calculation.tizFolottiResz(kepessegek, 'egeszseg')),
            harcertek: {
                ke: Calculation.plusz(...szintCalc(karakter, sz => sz.harcertek.ke ?? 0), Calculation.tizFolottiResz(kepessegek, 'reflex'), Calculation.tizFolottiResz(kepessegek, 'osszpontositas')),
                te: Calculation.plusz(...szintCalc(karakter, sz => sz.harcertek.te ?? 0), Calculation.tizFolottiResz(kepessegek, 'reflex'), Calculation.tizFolottiResz(kepessegek, 'izom'), Calculation.tizFolottiResz(kepessegek, 'mozgaskoordinacio')),
                ve: Calculation.plusz(...szintCalc(karakter, sz => sz.harcertek.ve ?? 0), Calculation.tizFolottiResz(kepessegek, 'reflex'), Calculation.tizFolottiResz(kepessegek, 'mozgaskoordinacio')),
                ce: Calculation.plusz(...szintCalc(karakter, sz => sz.harcertek.ce ?? 0), Calculation.tizFolottiResz(kepessegek, 'mozgaskoordinacio'), Calculation.tizFolottiResz(kepessegek, 'osszpontositas')),
                sebzes: Calculation.plusz(...szintCalc(karakter, sz => sz.harcertek.sebzes ?? 0))

            }
        }
    }
}