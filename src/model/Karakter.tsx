import { v4 } from "uuid";
import { Faj, Fajok } from "./Fajok";
import { KozelharcFegyver, KOZELHARCI_FEGYVEREK } from "./Fegyver";
import { Harcertek } from "./Harcertek";
import { KarakterCalculator } from "./KarakterCalculator";
import { KapottKepzettseg, KasztInfo, Kasztok } from "./Kasztok";
import { Kepessegek, KepessegKategoria } from "./Kepessegek";
import { Kepzettseg, NormalKepzettseg, SzazalekosKepzettseg } from "./Kepzettseg";
import { kockaDobas } from "./Kocka";
import { Lofegyver } from "./Lofegyver";
import { Pancel } from "./Pancel";
import { PancelBuilder } from "./PancelBuilder";
import { NamedEntity } from "./util";

export interface KarakterTemplate {
    name: string,
    faj: Faj,
    kaszt: KasztInfo,
    szint: number,
    kepessegKategoriak: Record<KepessegKategoria, number>;
}


export interface Karakter extends NamedEntity {
    readonly faj: Faj;
    szint: Array<SzintInfo>;
    kepessegek: Record<string, number>;
    ep: number;
    hm: number;
    kezek: [KozelharcFegyver?, KozelharcFegyver?];
    pancel?: Pancel;
    lofegyver?: Lofegyver;
    kp: number;
    kepessegKategoriak: Record<KepessegKategoria, number>;
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
            kp: number;
        }>,
        szazalekos: Array<{
            kepzettseg: SzazalekosKepzettseg;
            szazalek: number;
        }>
    },
    pendingKepzettsegek: Array<KapottKepzettseg>;
};

const updateKepzettsegekForLevel = (karakter: Karakter, kaszt: KasztInfo, szint: number, szintInfo: SzintInfo) => {
    const calc = KarakterCalculator.calc(karakter);
    kaszt.kepzettsegek?.[szint]?.forEach(k => {
        const kepzettsegek = Kepzettseg.keres(k.kepzettsegId);
        if (kepzettsegek.length === 1) {
            const kepzettseg = kepzettsegek[0];
            if (kepzettseg.fajta === 'normal') {
                const current = calc.kepzettsegek.normal.find(k => k.kepzettseg.id === kepzettseg.id)?.fok ?? 0;
                if (current >= (k.honnan ?? 0) && current < k.fok) {
                    szintInfo.kepzettsegek.normal.push({
                        kepzettseg,
                        fok: k.fok,
                        kp: 0
                    });
                }
            } else {
                const current = calc.kepzettsegek.szazalekos.find(k => k.kepzettseg.id === kepzettseg.id)?.szazalek ?? 0;
                if (current < k.fok) {
                    szintInfo.kepzettsegek.szazalekos.push({
                        kepzettseg,
                        szazalek: k.fok,
                    });
                }
            }
        } else if (kepzettsegek.length > 1) {
            szintInfo.pendingKepzettsegek.push({ ...k, id: String(Math.random()) });
        }
    });
};

const levelUp = (karakter: Karakter, kaszt?: KasztInfo): Karakter => {
    const kasztId = kaszt ?? karakter.szint[karakter.szint.length - 1].kaszt;
    const szintKaszt = Kasztok.kasztInfo(kasztId.id, karakter.szint.length);
    const szint = karakter.szint.slice(1).filter(k => k.kaszt.id === szintKaszt.id).length + 1;
    const dobas = karakter.szint.length === 1 ? 6 : kockaDobas({ darab: 1, kocka: 6 }).osszeg;
    const szintInfo: SzintInfo = {
        kaszt: szintKaszt,
        fp: dobas + szintKaszt.fpPerSzint,
        harcertek: Harcertek.add(szintKaszt.harcertek),
        kepzettsegek: {
            normal: [],
            szazalekos: []
        },
        pendingKepzettsegek: []
    };
    updateKepzettsegekForLevel(karakter, szintKaszt, szint, szintInfo);

    karakter.szint.push(szintInfo);
    karakter.hm += szintKaszt.hm;
    karakter.kp += szintKaszt.kpPerSzint;
    karakter.szazalek += szintKaszt.szazalekPerSzint;
    return karakter;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Karakter = {
    createTemplate: (options?: { faj?: Faj, kaszt?: KasztInfo, name: string }): KarakterTemplate => ({ faj: options?.faj ?? Fajok.lista[0], kaszt: options?.kaszt ?? Kasztok.lista[0], szint: 1, kepessegKategoriak: { Fizikum: 0, Ügyesség: 0, Mentál: 0, Asztrál: 0 }, name: options?.name ?? '' }),
    create: (template: KarakterTemplate): Karakter => {
        const ret: Karakter = {
            id: v4(),
            name: template.name,
            faj: template.faj,
            kepessegKategoriak: template.kepessegKategoriak,
            szint: [
                {
                    kaszt: template.kaszt,
                    harcertek: Harcertek.add(template.kaszt.harcertekAlap),
                    fp: template.kaszt.fpAlap,
                    kepzettsegek: {
                        normal: [],
                        szazalekos: []
                    },
                    pendingKepzettsegek: [],
                }
            ],
            pancel: {
                id: 'pelda',
                name: 'Példa páncél',
                mgt: 4,
                sfe: {
                    zuzo: 3,
                    vago: 6,
                    szuro: 5
                },
                igazitas: PancelBuilder.igazitas[3]
            },
            kepessegek: Kepessegek.newErtekRecord(),
            ep: template.kaszt.epAlap,
            hm: 0,
            kezek: [KOZELHARCI_FEGYVEREK.find(f => f.flags?.includes('pusztakez')), undefined],
            kp: template.kaszt.kpAlap,
            szazalek: 0
        };
        levelUp(ret, template.kaszt);
        updateKepzettsegekForLevel(ret, template.kaszt, 0, ret.szint[0]);
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
    szintek: (karakter: Karakter): Record<string, { name: string, szint: number }> => karakter.szint.slice(1).reduce((acc, curr) => {
        if (!acc[curr.kaszt.id]) {
            acc[curr.kaszt.id] = { name: curr.kaszt.name, szint: 0 };
        }
        acc[curr.kaszt.id].szint++;
        return acc;
    }, {} as Record<string, { name: string, szint: number }>),
    levelUp
}