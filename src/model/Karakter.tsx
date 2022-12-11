import { v4 } from "uuid";
import { Faj, Fajok } from "./Fajok";
import { Fegyver, KozelharcFegyver } from "./Fegyver";
import { Harcertek } from "./Harcertek";
import { InventoryFegyver, InventoryItem, InventoryLofegyver, InventoryPancel } from "./Inventory";
import { KarakterCalculator } from "./KarakterCalculator";
import { KapottKepzettseg, KasztInfo, Kasztok } from "./Kasztok";
import { Kepessegek, KepessegKategoria } from "./Kepessegek";
import { Kepzettseg, NormalKepzettseg, SzazalekosKepzettseg } from "./Kepzettseg";
import { kockaDobas } from "./Kocka";
import { Lofegyver } from "./Lofegyver";
import { NamedEntity } from "./util";

export interface KarakterTemplate {
    name: string,
    faj: Faj,
    kaszt: KasztInfo,
    szint: number,
    kepessegKategoriak: Record<KepessegKategoria, number>;
}

export type MegfogottFegyver = { tipus: 'pusztakez', ob: KozelharcFegyver, id: 'okolharc' } | InventoryFegyver;

export interface Karakter extends NamedEntity {
    readonly faj: Faj;
    szint: Array<SzintInfo>;
    kepessegek: Record<string, number>;
    ep: number;
    hm: number;
    kezek: [MegfogottFegyver?, MegfogottFegyver?];
    pancel?: InventoryPancel;
    lofegyver?: InventoryLofegyver;
    kp: number;
    kepessegKategoriak: Record<KepessegKategoria, number>;
    inventory: Array<InventoryItem>;
    elosztva?: boolean;
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
            inventory: [
                {
                    tipus: 'fegyver',
                    id: v4(),
                    quantity: 1,
                    ob: Fegyver.find('kard_rovid')
                },
                {
                    tipus: 'lofegyver',
                    id: v4(),
                    quantity: 1,
                    ob: Lofegyver.find('nyilpuska_kezi')
                },
                {
                    tipus: 'lofegyver',
                    id: v4(),
                    quantity: 1,
                    ob: {
                        tipus: 'ij',
                        id: 'xij',
                        name: 'Visszacsapó íj',
                        kepesseg: 'mozgaskoordinacio',
                        ke: 5,
                        ce: 8,
                        minimumEro: 10,
                        maximumEro: 25,
                        alternativKepzettseg: 'ij',
                        sebesseg: 'atlagos',
                        eroPlusz: 0,
                        sebzestipus: 'szuro'
                    }
                },
            ],
            szint: [
                {
                    kaszt: template.kaszt,
                    harcertek: Harcertek.add(template.kaszt.harcertekAlap),
                    fp: template.kaszt.fpAlap,
                    kepzettsegek: {
                        normal: [],
                        szazalekos: Kepzettseg.lista.filter(k => k.fajta === 'szazalekos').map(k => ({ kepzettseg: k as SzazalekosKepzettseg, szazalek: 0 }))
                    },
                    pendingKepzettsegek: [],
                }
            ],
            pancel: undefined,
            kepessegek: Kepessegek.newErtekRecord(),
            ep: template.kaszt.epAlap,
            hm: 0,
            kezek: [Karakter.okolharc(), undefined],
            kp: template.kaszt.kpAlap,
            szazalek: 0
        };
        levelUp(ret, template.kaszt);
        updateKepzettsegekForLevel(ret, template.kaszt, 0, ret.szint[0]);
        return ret;
    },
    megfoghato: (karakter: Karakter, kez: 0 | 1, fegyver?: MegfogottFegyver): boolean => {
        if (kez === 0) {
            if (!fegyver) {
                return false;
            } else if (fegyver.tipus === 'pusztakez') {
                return !karakter.kezek[1];
            } else {
                const available = fegyver.quantity - (karakter.kezek[1]?.id === fegyver.id ? 1 : 0);
                return (karakter.kezek[1]?.ob.kez ?? 0) + fegyver.ob.kez <= 2 && available > 0;
            }
        } else {
            if (!fegyver) {
                return true;
            } else if (fegyver.tipus === 'pusztakez') {
                return false;
            } else {
                const available = fegyver.quantity - (karakter.kezek[0]?.id === fegyver.id ? 1 : 0);
                return (karakter.kezek[0]?.ob.kez ?? 0) + fegyver.ob.kez <= 2 && available > 0;

            }
        }
    },
    szintek: (karakter: Karakter): Record<string, { name: string, szint: number }> => karakter.szint.slice(1).reduce((acc, curr) => {
        if (!acc[curr.kaszt.id]) {
            acc[curr.kaszt.id] = { name: curr.kaszt.name, szint: 0 };
        }
        acc[curr.kaszt.id].szint++;
        return acc;
    }, {} as Record<string, { name: string, szint: number }>),
    okolharc: (): MegfogottFegyver => ({ id: 'okolharc', tipus: 'pusztakez', ob: Fegyver.find('okolharc') }),
    levelUp
}