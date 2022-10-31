import { NamedEntity, namedEntityArray } from "./util";


export type KepessegKategoria = 'Fizikum' | 'Ügyesség' | 'Mentál' | 'Asztrál';

export interface Kepesseg extends NamedEntity {
    kategoria: KepessegKategoria;
}

export interface KepessegErtek extends Kepesseg {
    ertek: number;
}

const KEPESSEGEK: Array<Kepesseg> = [
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
};