import { v4 } from "uuid";
import { Faj, Fajok } from "./Fajok";
import { Fegyver, KozelharcFegyver } from "./Fegyver";
import { Harcertek } from "./Harcertek";
import { HarciHelyzetek } from "./HarciHelyzet";
import { InventoryFegyver, InventoryItem, InventoryLofegyver, InventoryPancel } from "./Inventory";
import { KarakterCalculator } from "./KarakterCalculator";
import { KapottKepzettseg, KasztInfo, Kasztok } from "./Kasztok";
import { Kepessegek, KepessegKategoria } from "./Kepessegek";
import { Kepzettseg, NormalKepzettseg, SzazalekosKepzettseg } from "./Kepzettseg";
import { kockaDobas } from "./Kocka";
import { constructArray, NamedEntity } from "./util";

export interface KarakterTemplate {
    name: string,
    faj: Faj,
    kaszt: string,
    jellem: string,
    szint: number,
    kepessegKategoriak: Record<KepessegKategoria, number>;
}

export type MegfogottFegyver = { tipus: 'pusztakez', ob: KozelharcFegyver, id: string } | InventoryFegyver;


export interface Karakter extends NamedEntity {
    jellem: string;
    readonly faj: Faj;
    szint: Array<SzintInfo>;
    kepessegek: Record<string, number>;
    ep: number;
    hm: number;
    kezek: [MegfogottFegyver?, MegfogottFegyver?];
    pancel?: InventoryPancel;
    lofegyver?: InventoryLofegyver;
    kp: number;
    kasztKp: number;
    kepessegKategoriak: Record<KepessegKategoria, number>;
    inventory: Array<InventoryItem>;
    elosztva?: boolean;
    szazalek: number;
    temporary: {
        harciHelyzet: Array<typeof HarciHelyzetek[number]['id']>;
    };
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
    mana: number;
    pszi: number;
};

const updateKepzettsegekForLevel = (karakter: Karakter, kaszt: KasztInfo, szint: number, szintInfo: SzintInfo) => {
    const calc = KarakterCalculator.calc(karakter);
    kaszt.kepzettsegek?.[szint]?.forEach(k => {
        const kepzettsegek = Kepzettseg.find(k.kepzettsegId, true) ? [Kepzettseg.find(k.kepzettsegId)] : Kepzettseg.keres(k.kepzettsegId);
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

const levelUp = (karakter: Karakter, kasztId: string): Karakter => {
    const szintek = Karakter.szintek(karakter);
    const szintKaszt = Kasztok.kasztInfo(kasztId, (szintek[kasztId]?.szint ?? 0) + 1);
    const szint = karakter.szint.slice(1).filter(k => k.kaszt.id === szintKaszt.id).length + 1;
    const dobas = karakter.szint.length === 1 ? 6 : kockaDobas({ darab: 1, kocka: 6 }).osszeg;
    let mana = szintKaszt.mana ? ((szintKaszt.mana.mennyiseg === 'sok' || karakter.szint.length === 1) ? 6 : kockaDobas({ darab: 1, kocka: 6 }).osszeg) : 0;

    const szintInfo: SzintInfo = {
        kaszt: szintKaszt,
        fp: dobas + szintKaszt.fpPerSzint,
        harcertek: Harcertek.add(szintKaszt.harcertek),
        kepzettsegek: {
            normal: [],
            szazalekos: []
        },
        mana,
        pszi: 0,
        pendingKepzettsegek: []
    };
    updateKepzettsegekForLevel(karakter, szintKaszt, szint, szintInfo);

    karakter.szint.push(szintInfo);
    karakter.hm += szintKaszt.hm;
    karakter.kp += szintKaszt.kpPerSzint;
    karakter.kasztKp += szintKaszt.kasztKpPerSzint;
    karakter.szazalek += szintKaszt.szazalekPerSzint;
    return karakter;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Karakter = {
    createTemplate: (options?: { faj?: Faj, kaszt?: string, name: string, jellem: string }): KarakterTemplate => ({ faj: options?.faj ?? Fajok.lista[0], kaszt: options?.kaszt ?? Kasztok.lista[0].id, szint: 1, kepessegKategoriak: { Fizikum: 0, Ügyesség: 0, Mentál: 0, Asztrál: 0 }, name: options?.name ?? '', jellem: options?.jellem ?? '' }),
    create: (template: KarakterTemplate): Karakter => {
        const kasztInfo = Kasztok.kasztInfo(template.kaszt, 0);
        const ret: Karakter = {
            id: v4(),
            name: template.name,
            jellem: template.jellem,
            faj: template.faj,
            kepessegKategoriak: template.kepessegKategoriak,
            inventory: [],
            szint: [
                {
                    kaszt: kasztInfo,
                    harcertek: Harcertek.add(kasztInfo.harcertekAlap),
                    fp: kasztInfo.fpAlap,
                    kepzettsegek: {
                        normal: template.faj.kepzettsegek?.filter(k => k.name === undefined && Kepzettseg.find(k.kepzettsegId).fajta === 'normal').map(k => ({ kepzettseg: Kepzettseg.find(k.kepzettsegId) as NormalKepzettseg, fok: k.fok, kp: 0 })) ?? [],
                        szazalekos: Kepzettseg.lista.filter(k => k.fajta === 'szazalekos').map(k => ({ kepzettseg: k as SzazalekosKepzettseg, szazalek: 0 }))
                    },
                    mana: 0,
                    pszi: 0,
                    pendingKepzettsegek: [],
                }
            ],
            pancel: undefined,
            kepessegek: Kepessegek.newErtekRecord(),
            ep: kasztInfo.epAlap,
            hm: 0,
            kezek: [Karakter.okolharc(), undefined],
            kp: kasztInfo.kpAlap,
            kasztKp: 0,
            szazalek: 0,
            temporary: {
                harciHelyzet: []
            }
        };
        levelUp(ret, kasztInfo.id);
        // fajokból adódó választható képzettségeket később kell hozzáadni, mert különben a szintlépés törli őket
        ret.szint[0].pendingKepzettsegek.push(
            {
                id: 'nyelv:',
                fok: 4,
                kepzettsegId: 'nyelv:',
                name: 'Anyanyelv'
            },
            ...(template.faj.kepzettsegek?.filter(k => k.name !== undefined).map(k => ({ ...k, id: k.kepzettsegId })) ?? [])
        );
        updateKepzettsegekForLevel(ret, kasztInfo, 0, ret.szint[0]);
        return ret;
    },
    megfoghato: (karakter: Karakter, kez: 0 | 1, fegyver?: MegfogottFegyver): boolean => {
        if (kez === 0) {
            if (!fegyver) {
                return false;
            } else if (fegyver.tipus === 'pusztakez') {
                return !karakter.kezek[1];
            } else {
                const available = fegyver.quantity - ((karakter.kezek[1] as InventoryFegyver)?.id === fegyver.id ? 1 : 0);
                return (karakter.kezek[1]?.ob.kez ?? 0) + fegyver.ob.kez <= 2 && available > 0;
            }
        } else {
            if (!fegyver) {
                return true;
            } else if (fegyver.tipus === 'pusztakez') {
                return false;
            } else {
                const available = fegyver.quantity - ((karakter.kezek[0] as InventoryFegyver)?.id === fegyver.id ? 1 : 0);
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
    kasztKepzettsegek: (karakter: Karakter): Array<string> => {
        const kasztSzintek = Karakter.szintek(karakter);
        const kepzettsegek = Object.entries(kasztSzintek).flatMap(([kasztId, { szint }]) => {
            const kaszt = Kasztok.kasztInfo(kasztId, szint);
            return constructArray(szint, i => kaszt.kepzettsegek?.[i] ?? []).flatMap(a => a);
        });
        return [...new Set(kepzettsegek.map(k => k.kepzettsegId))];
    },
    levelUp
}