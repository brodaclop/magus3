import { Calculation, CalculationArgument } from "./Calculation";
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

export interface Karakter {
    readonly faj: Faj;
    kaszt: KasztInfo;
    szint: number;
    kepessegek: Record<string, number>;
    fp: number;
    ep: number;
    harcertek: Harcertek;
    hm: number;
}

export interface KarakterCalcResult {
    fp: CalculationArgument;
    ep: CalculationArgument;
    kepessegek: Record<string, number>;
    harcertek: Record<keyof Harcertek, CalculationArgument>;
}

const levelUp = (karakter: Karakter, szintek: number = 1): Karakter => {
    for (let i = 0; i < szintek; i++) {
        karakter.szint++;
        const dobas = karakter.szint === 1 ? 6 : kockaDobas({ darab: 1, kocka: 6 }).osszeg;
        karakter.fp += dobas + karakter.kaszt.fp;
        karakter.hm += karakter.kaszt.hm;
        karakter.harcertek = Harcertek.add(karakter.harcertek, karakter.kaszt.harcertek);
        karakter.hm += karakter.kaszt.hm;
    }
    return karakter;
};

export const Karakter = {
    createTemplate: (options?: { faj?: Faj, kaszt?: KasztInfo }): KarakterTemplate => ({ faj: options?.faj ?? Fajok.lista[0], kaszt: options?.kaszt ?? Kasztok.lista[0], szint: 1, kepessegKategoriak: { Fizikum: 0, Ügyesség: 0, Mentál: 0, Asztrál: 0 } }),
    create: (template: KarakterTemplate): Karakter => {
        const ret: Karakter = {
            faj: template.faj,
            kaszt: template.kaszt,
            szint: 0,
            kepessegek: Kepessegek.newErtekRecord(),
            fp: template.kaszt.fpAlap,
            ep: template.kaszt.ep,
            harcertek: Harcertek.add(template.kaszt.harcertekAlap, template.faj.harcertekAlap),
            hm: 0
        };
        levelUp(ret, template.szint);
        return ret;
    },
    levelUp,
    calc: (karakter: Karakter): KarakterCalcResult => {
        const kepessegek = transformRecord(karakter.kepessegek, (k, v) => v + (karakter.faj.kepessegek[k] ?? 0));
        return {
            kepessegek,
            fp: Calculation.plusz(Calculation.value('Alap FP', karakter.fp), Calculation.tizFolottiResz(kepessegek, 'allokepesseg'), Calculation.tizFolottiResz(kepessegek, 'onuralom')),
            ep: Calculation.plusz(Calculation.value('Alap ÉP', karakter.fp), Calculation.tizFolottiResz(kepessegek, 'egeszseg')),
            harcertek: transformRecord(karakter.harcertek, (name, he) => {
                switch (name) {
                    case 'ke': return Calculation.plusz(Calculation.value('Alap', he), Calculation.tizFolottiResz(kepessegek, 'reflex'), Calculation.tizFolottiResz(kepessegek, 'osszpontositas'));
                    case 'te': return Calculation.plusz(Calculation.value('Alap', he), Calculation.tizFolottiResz(kepessegek, 'reflex'), Calculation.tizFolottiResz(kepessegek, 'izom'), Calculation.tizFolottiResz(kepessegek, 'mozgaskoordinacio'));
                    case 've': return Calculation.plusz(Calculation.value('Alap', he), Calculation.tizFolottiResz(kepessegek, 'reflex'), Calculation.tizFolottiResz(kepessegek, 'mozgaskoordinacio'));
                    case 'ce': return Calculation.plusz(Calculation.value('Alap', he), Calculation.tizFolottiResz(kepessegek, 'mozgaskoordinacio'), Calculation.tizFolottiResz(kepessegek, 'osszpontositas'));
                }
            })
        }
    }
}