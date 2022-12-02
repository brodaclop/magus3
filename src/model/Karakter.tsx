import { Faj, Fajok } from "./Fajok";
import { KozelharcFegyver, KOZELHARCI_FEGYVEREK } from "./Fegyver";
import { Harcertek } from "./Harcertek";
import { KasztInfo, Kasztok } from "./Kasztok";
import { Kepessegek, KepessegKategoria } from "./Kepessegek";
import { NormalKepzettseg, SzazalekosKepzettseg } from "./Kepzettseg";
import { kockaDobas } from "./Kocka";

export interface KarakterTemplate {
    faj: Faj,
    kaszt: KasztInfo,
    szint: number,
    kepessegKategoriak: Record<KepessegKategoria, number>;
}


export interface Karakter {
    readonly faj: Faj;
    szint: Array<SzintInfo>;
    kepessegek: Record<string, number>;
    ep: number;
    hm: number;
    kezek: [KozelharcFegyver?, KozelharcFegyver?];
    kp: number;
    szazalek: number;
}

export interface SzintInfo {
    kaszt: KasztInfo,
    harcertek: Harcertek,
    fp: number,
    kepzettsegek: {
        normal: Array<{
            kepzettseg: NormalKepzettseg;
            fok: number;
        }>,
        szazalekos: Array<{
            kepzettseg: SzazalekosKepzettseg;
            szazalek: number;
        }>
    }
};

const levelUp = (karakter: Karakter, kaszt?: KasztInfo): Karakter => {
    const kasztId = kaszt ?? karakter.szint[karakter.szint.length - 1].kaszt;
    const szintKaszt = Kasztok.kasztInfo(kasztId.id, karakter.szint.length);
    const dobas = karakter.szint.length === 1 ? 6 : kockaDobas({ darab: 1, kocka: 6 }).osszeg;
    karakter.szint.push({
        kaszt: szintKaszt,
        fp: dobas + szintKaszt.fpPerSzint,
        harcertek: Harcertek.add(szintKaszt.harcertek),
        kepzettsegek: {
            normal: [],
            szazalekos: []
        }
    });
    karakter.hm += szintKaszt.hm;
    karakter.kp += szintKaszt.kpPerSzint;
    karakter.szazalek += szintKaszt.szazalekPerSzint;
    return karakter;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
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
                    kepzettsegek: {
                        normal: [],
                        szazalekos: []
                    }
                }
            ],
            kepessegek: Kepessegek.newErtekRecord(),
            ep: template.kaszt.epAlap,
            hm: 0,
            kezek: [KOZELHARCI_FEGYVEREK.find(f => f.flags?.includes('pusztakez')), undefined],
            kp: template.kaszt.kpAlap,
            szazalek: 0
        };
        levelUp(ret, template.kaszt);
        return ret;
    },
    megfoghato: (karakter: Karakter, kez: 0 | 1, fegyver?: KozelharcFegyver): boolean => {
        if (kez === 0) {
            if (!fegyver) {
                return !karakter.kezek[1];
            } else {
                return (karakter.kezek[1]?.kez ?? 0) + fegyver.kez <= 2;
            }
        } else {
            return !fegyver || (karakter.kezek[0]?.kez ?? 0) + fegyver.kez <= 2;
        }
    },
    megfog: (karakter: Karakter, kez: 0 | 1, fegyver?: KozelharcFegyver): boolean => {
        if (Karakter.megfoghato(karakter, kez, fegyver)) {
            karakter.kezek[kez] = fegyver;
            return true;
        }
        return false;
    },
    levelUp
}