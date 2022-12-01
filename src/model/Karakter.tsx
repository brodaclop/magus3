import { Faj, Fajok } from "./Fajok";
import { KozelharcFegyver } from "./Fegyver";
import { Harcertek } from "./Harcertek";
import { KasztInfo, Kasztok } from "./Kasztok";
import { Kepessegek, KepessegKategoria } from "./Kepessegek";
import { kockaDobas, parseKocka } from "./Kocka";

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
}

export interface SzintInfo {
    kaszt: KasztInfo,
    harcertek: Harcertek,
    fp: number,
};

const levelUp = (karakter: Karakter, kaszt?: KasztInfo): Karakter => {
    const kasztId = kaszt ?? karakter.szint[karakter.szint.length - 1].kaszt;
    const szintKaszt = Kasztok.kasztInfo(kasztId.id, karakter.szint.length);
    const dobas = karakter.szint.length === 1 ? 6 : kockaDobas({ darab: 1, kocka: 6 }).osszeg;
    karakter.szint.push({
        kaszt: szintKaszt,
        fp: dobas + szintKaszt.fpPerSzint,
        harcertek: Harcertek.add(szintKaszt.harcertek)
    });
    karakter.hm += szintKaszt.hm;
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
                }
            ],
            kepessegek: Kepessegek.newErtekRecord(),
            ep: template.kaszt.epAlap,
            hm: 0,
            kezek: [{
                nev: 'Kard, Slan',
                kepesseg: 'osszpontositas',
                kez: 1.5,
                sebesseg: 'atlagos',
                ke: 8,
                te: 20,
                ve: 12,
                flags: 'slan-kard',
                sebzes: parseKocka('1k10+2'),
                sebzestipus: ['vago', 'szuro']
            }, undefined]
        };
        levelUp(ret, template.kaszt);
        return ret;
    },
    levelUp
}