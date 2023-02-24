import { Karakter } from "./Karakter";
import { NamedEntity, namedEntityArray } from "./util";


export type KepessegKategoria = 'Fizikum' | 'Ügyesség' | 'Mentál' | 'Asztrál';

export const KepessegKategoriaSorrend: Record<KepessegKategoria, number> = {
    Fizikum: 0,
    Ügyesség: 1,
    Mentál: 2,
    Asztrál: 3,
};


export interface Kepesseg extends NamedEntity {
    kategoria: KepessegKategoria;
}

export interface KepessegErtek extends Kepesseg {
    ertek: number;
}

export const KEPESSEGEK: Array<Kepesseg> = [
    {
        id: 'izom',
        name: 'Izom',
        kategoria: 'Fizikum'
    },
    {
        id: 'allokepesseg',
        name: 'Állóképesség',
        kategoria: 'Fizikum'
    },
    {
        id: 'egeszseg',
        name: 'Egészség',
        kategoria: 'Fizikum'
    },
    {
        id: 'mozgaskoordinacio',
        name: 'Mozgáskoordináció',
        kategoria: 'Ügyesség'
    },
    {
        id: 'reflex',
        name: 'Reflex',
        kategoria: 'Ügyesség'
    },
    {
        id: 'erzekeles',
        name: 'Érzékelés',
        kategoria: 'Ügyesség'
    },
    {
        id: 'osszpontositas',
        name: 'Összpontosítás',
        kategoria: 'Mentál'
    },
    {
        id: 'emlekezet',
        name: 'Emlékezet',
        kategoria: 'Mentál'
    },
    {
        id: 'gondolkodas',
        name: 'Gondolkodás',
        kategoria: 'Mentál'
    },
    {
        id: 'onuralom',
        name: 'Önuralom',
        kategoria: 'Asztrál'
    },
    {
        id: 'hit',
        name: 'Hit',
        kategoria: 'Asztrál'
    },
    {
        id: 'empatia',
        name: 'Empátia',
        kategoria: 'Asztrál'
    },
];

const nea = namedEntityArray(KEPESSEGEK);

export const Kepessegek = {
    ...nea,
    newErtekRecord: () => Object.fromEntries(nea.keys.map(k => [k, 0])),
    plusz: (karakter: Karakter, k: Kepesseg, dmMode: boolean): boolean => {
        const kategoria = k.kategoria;
        if ((dmMode || karakter.kepessegKategoriak[kategoria] > 0) && karakter.kepessegek[k.id] < 20) {
            karakter.kepessegek[k.id]++;
            if (!dmMode) {
                karakter.kepessegKategoriak[kategoria]--;
            }
            return true;
        }
        return false;
    },
    minusz: (karakter: Karakter, k: Kepesseg, dmMode: boolean): boolean => {
        const kategoria = k.kategoria;
        if (karakter.kepessegek[k.id] > 0) {
            karakter.kepessegek[k.id]--;
            if (!dmMode) {
                karakter.kepessegKategoriak[kategoria]++;
            }
            return true;
        }
        return false;
    },
    eloszt: (karakter: Karakter, kategoria: KepessegKategoria) => {
        const kepessegek = Kepessegek.lista.filter(k => k.kategoria === kategoria);
        let end = false;
        while (!end) {
            end = kepessegek.map(k => Kepessegek.plusz(karakter, k, false)).every(b => !b);
        }
    }

};