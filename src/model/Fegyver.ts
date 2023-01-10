import { Harcertek } from "./Harcertek";
import { SzintInfo } from "./Karakter";
import { KockaDobas } from "./Kocka";
import { Lofegyver } from "./Lofegyver";
import { NamedEntity, namedEntityArray } from "./util";
import fegyverek from '../data/fegyverek.json';
import { Harcmuveszet } from "./Harcmuveszet";

export const SebzesTipus = [
    { id: 'szuro', name: 'Szúró' },
    { id: 'vago', name: 'Vágó' },
    { id: 'zuzo', name: 'Zúzó' }
] as const;

export const FegyverSebesseg = ['gyors', 'atlagos', 'lassu', '3', '4', '5'] as const;

export const MASODIK_TAMADAS_KE: Record<typeof FegyverSebesseg[number], number> = {
    gyors: 25,
    atlagos: 50,
    lassu: 75,
    '3': 0,
    '4': 0,
    '5': 0
};

export const FegyverFlags = ['buckler', 'nagy-pajzs', 'slan-kard', 'slan-tor', 'pusztakez', 'kes'] as const;

export interface FegyverKategoria {
    id: string;
    nev: string;
    kepesseg: string;
    erobonusz: number;
}

export interface FegyverBase extends NamedEntity {
    sebesseg: typeof FegyverSebesseg[number];
    sebzes: KockaDobas;
    sebzestipus: typeof SebzesTipus[number]['id'] | Array<typeof SebzesTipus[number]['id']>;
    alternativKepzettseg?: string;
    flags?: typeof FegyverFlags[number];
    mgt?: number;
    kez: 0.5 | 1 | 1.5 | 2;
}

export interface Kategorizalt {
    kategoria: FegyverKategoria;
    kepesseg?: undefined;
    erobonusz?: undefined;
}

export interface NemKategorizalt {
    kategoria?: undefined;
    kepesseg: string;
    erobonusz: number;
}

export interface KozelharcHarcertekek {
    ke: number;
    te: number;
    ve: number;
}

export type KozelharcFegyver = (Kategorizalt | NemKategorizalt) & FegyverBase & KozelharcHarcertekek;

export const NYILPUSKA_KATEGORIA: FegyverKategoria = {
    id: 'nyilpuska',
    nev: 'Nyílpuska',
    erobonusz: 0,
    kepesseg: 'erzekeles'
};

export const FEGYVER_KATEGORIAK: Record<string, FegyverKategoria> = {
    szalfegyver: {
        id: 'szalfegyver',
        erobonusz: 16,
        nev: 'Szál',
        kepesseg: 'izom'
    },
    egykezes_vago: {
        id: 'egykezes_vago',
        nev: 'Egykezes vágó',
        erobonusz: 16,
        kepesseg: 'mozgaskoordinacio'
    },
    egykezes_szuro: {
        id: 'egykezes_szuro',
        nev: 'Egykezes szúró',
        erobonusz: 16,
        kepesseg: 'reflex'
    },
    zuzo: {
        id: 'zuzo',
        nev: 'Zúzó',
        erobonusz: 14,
        kepesseg: 'izom'
    },
    dobo: {
        id: 'dobo',
        nev: 'Dobó',
        erobonusz: 16,
        kepesseg: 'mozgaskoordinacio'
    },
    csatabard: {
        id: 'csatabard',
        erobonusz: 14,
        nev: 'Csatabárd',
        kepesseg: 'izom'
    }
};

export const FEGYVER_KEPZETTSEG_HARCERTEKEK: Array<Harcertek> = [
    {
        ke: -10,
        te: -25,
        ve: -20,
        ce: -30,
        sebzes: 0
    },
    {
        ke: -5,
        te: -5,
        ve: -10,
        ce: -15,
        sebzes: 0
    },
    {
        ke: 0,
        te: 0,
        ve: 0,
        ce: 0,
        sebzes: 0
    },
    {
        ke: 2,
        te: 5,
        ve: 5,
        ce: 5,
        sebzes: 0
    },
    {
        ke: 5,
        te: 10,
        ve: 10,
        ce: 10,
        sebzes: 0
    },
    {
        ke: 10,
        te: 20,
        ve: 20,
        ce: 20,
        sebzes: 0
    },
];

export const Fegyver = {
    ...namedEntityArray([...fegyverek as Array<KozelharcFegyver>, ...Harcmuveszet.fegyverek]),
    kepzettseg: (kepzettsegek: SzintInfo['kepzettsegek']['normal'], fegyver: KozelharcFegyver | Lofegyver, minusz = 0): [Harcertek, number] => {
        const kepzettseg = kepzettsegek.find(k => k.kepzettseg.id === (fegyver.alternativKepzettseg ?? `fegyver:${fegyver.id}`));
        const kategoriaKepzettseg = kepzettsegek.find(k => k.kepzettseg.id === `fegyverkat:${fegyver.kategoria?.id}`);

        const fok = Math.max(kepzettseg?.fok ?? 0, kategoriaKepzettseg?.fok ?? 0);
        return [FEGYVER_KEPZETTSEG_HARCERTEKEK[Math.max(fok - minusz, 0)], fok];
    }
}