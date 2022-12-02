import { KockaDobas, parseKocka } from "./Kocka";

export type SebzesTipus = 'szuro' | 'vago' | 'zuzo';
export type Sebesseg = 'gyors' | 'atlagos' | 'lassu' | 3 | 4 | 5;

export interface FegyverKategoria {
    id: string;
    nev: string;
    kepesseg: string;
}

export interface FegyverBase {
    nev: string;
    sebesseg: Sebesseg;
    sebzes: KockaDobas;
    sebzestipus: SebzesTipus | Array<SebzesTipus>;
    alapFegyver?: string;
    flags?: undefined | 'buckler' | 'nagy-pajzs' | 'slan-kard' | 'slan-tor' | 'pusztakez';
    mgt?: number;
    kez: 0.5 | 1 | 1.5 | 2;
}

export interface Kategorizalt {
    kategoria: FegyverKategoria;
    kepesseg?: undefined;
}

export interface NemKategorizalt {
    kategoria?: undefined;
    kepesseg: string;
}

export interface KozelharcHarcertekek {
    ke: number;
    te: number;
    ve: number;
}

export type KozelharcFegyver = (Kategorizalt | NemKategorizalt) & FegyverBase & KozelharcHarcertekek;

export const getFegyver = (nev: string): KozelharcFegyver => KOZELHARCI_FEGYVEREK.find(f => f.nev === nev) as KozelharcFegyver;


export const FEGYVER_KATEGORIAK: Record<string, FegyverKategoria> = {
    szalfegyver: {
        id: 'szalfegyver',
        nev: 'Szál',
        kepesseg: 'izom'
    },
    egykezes_vago: {
        id: 'egykezes_vago',
        nev: 'Egykezes vágó',
        kepesseg: 'mozgaskoordinacio'
    },
    egykezes_szuro: {
        id: 'egykezes_szuro',
        nev: 'Egykezes szúró',
        kepesseg: 'reflex'
    },
    zuzo: {
        id: 'zuzo',
        nev: 'Zúzó',
        kepesseg: 'izom'
    },
    dobo: {
        id: 'dobo',
        nev: 'Dobó',
        kepesseg: 'mozgaskoordinacio'
    },
    csatabard: {
        id: 'csatabard',
        nev: 'Csatabárd',
        kepesseg: 'izom'
    }
};
export const KOZELHARCI_FEGYVEREK: Array<KozelharcFegyver> = [
    {
        nev: 'Ökölharc',
        kez: 2,
        kepesseg: 'izom',
        sebesseg: 'gyors',
        ke: 10,
        te: 6,
        ve: 5,
        flags: 'pusztakez',
        sebzes: parseKocka('1k2'),
        sebzestipus: 'zuzo'
    },
    {
        nev: 'Alabárd',
        kategoria: FEGYVER_KATEGORIAK.szalfegyver,
        kez: 2,
        sebesseg: 'lassu',
        ke: 1,
        te: 14,
        ve: 15,
        sebzes: parseKocka('2k6+2'),
        sebzestipus: 'vago'
    },
    {
        nev: 'Alabárd +1',
        kategoria: FEGYVER_KATEGORIAK.szalfegyver,
        kez: 2,
        sebesseg: 'lassu',
        ke: 3,
        te: 19,
        ve: 20,
        sebzes: parseKocka('2k6+3'),
        sebzestipus: 'vago',
        alapFegyver: 'Alabárd',
    },
    {
        nev: 'Béltépő',
        kategoria: FEGYVER_KATEGORIAK.egykezes_szuro,
        kez: 1,
        sebesseg: 'gyors',
        ke: 10,
        te: 8,
        ve: 2,
        sebzes: parseKocka('1k6+2'),
        sebzestipus: 'szuro'
    },
    {
        nev: 'Bola',
        kepesseg: 'mozgaskoordinacio',
        kez: 1,
        sebesseg: 'atlagos',
        ke: 2,
        te: 10,
        ve: 2,
        sebzes: parseKocka('1k5'),
        sebzestipus: 'zuzo'
    },
    {
        nev: 'Bot, furkós',
        kategoria: FEGYVER_KATEGORIAK.zuzo,
        kez: 1,
        sebesseg: 'atlagos',
        ke: 2,
        te: 7,
        ve: 14,
        sebzes: parseKocka('1k6'),
        sebzestipus: 'zuzo'
    },
    {
        nev: 'Bot, hosszú',
        kategoria: FEGYVER_KATEGORIAK.zuzo,
        kez: 1.5,
        sebesseg: 'atlagos',
        ke: 4,
        te: 10,
        ve: 16,
        sebzes: parseKocka('1k5'),
        sebzestipus: 'zuzo'
    },
    {
        nev: 'Bot, rövid',
        kategoria: FEGYVER_KATEGORIAK.zuzo,
        kez: 1,
        sebesseg: 'atlagos',
        ke: 9,
        te: 9,
        ve: 17,
        sebzes: parseKocka('1k3'),
        sebzestipus: 'zuzo'
    },
    {
        nev: 'Buzogány, egykezes',
        kategoria: FEGYVER_KATEGORIAK.zuzo,
        kez: 1,
        sebesseg: 'atlagos',
        ke: 7,
        te: 11,
        ve: 12,
        sebzes: parseKocka('1k6'),
        sebzestipus: 'zuzo'
    },
    {
        nev: 'Buzogány, kétkezes',
        kategoria: FEGYVER_KATEGORIAK.zuzo,
        kez: 2,
        sebesseg: 'lassu',
        ke: 0,
        te: 7,
        ve: 6,
        sebzes: parseKocka('3k6'),
        sebzestipus: 'zuzo'
    },
    {
        nev: 'Buzogány, láncos',
        kez: 1,
        kategoria: FEGYVER_KATEGORIAK.zuzo,
        sebesseg: 'atlagos',
        ke: 4,
        te: 13,
        ve: 11,
        sebzes: parseKocka('1k6+3'),
        sebzestipus: 'zuzo'
    },
    {
        nev: 'Buzogány, shadleki',
        kez: 1,
        kategoria: FEGYVER_KATEGORIAK.zuzo,
        sebesseg: 'atlagos',
        ke: 8,
        te: 13,
        ve: 14,
        sebzes: parseKocka('1k6+1'),
        sebzestipus: 'vago'
    },
    {
        nev: 'Buzogány, tollas',
        kategoria: FEGYVER_KATEGORIAK.zuzo,
        kez: 1,
        sebesseg: 'atlagos',
        ke: 7,
        te: 12,
        ve: 13,
        sebzes: parseKocka('1k6+1'),
        sebzestipus: 'zuzo'
    },
    {
        nev: 'Buzogány, tüskés',
        kategoria: FEGYVER_KATEGORIAK.zuzo,
        kez: 1,
        sebesseg: 'atlagos',
        ke: 7,
        te: 12,
        ve: 13,
        sebzes: parseKocka('1k6+2'),
        sebzestipus: 'szuro'
    },
    {
        nev: 'Csatabárd, egykezes',
        kategoria: FEGYVER_KATEGORIAK.csatabard,
        kez: 1,
        sebesseg: 'atlagos',
        ke: 5,
        te: 12,
        ve: 11,
        sebzes: parseKocka('1k10'),
        sebzestipus: 'vago'
    },
    {
        nev: 'Csatabárd, kétkezes',
        kategoria: FEGYVER_KATEGORIAK.csatabard,
        kez: 2,
        sebesseg: 'lassu',
        ke: 0,
        te: 8,
        ve: 6,
        sebzes: parseKocka('3k6'),
        sebzestipus: 'vago'
    },
    {
        nev: 'Csatacsákány',
        kategoria: FEGYVER_KATEGORIAK.zuzo,
        kez: 1,
        sebesseg: 'lassu',
        ke: 5,
        te: 11,
        ve: 8,
        sebzes: parseKocka('1k10'),
        sebzestipus: 'szuro'
    },
    {
        nev: 'Cséphadaró',
        kategoria: FEGYVER_KATEGORIAK.zuzo,
        kez: 1,
        sebesseg: 'atlagos',
        ke: 1,
        te: 6,
        ve: 5,
        sebzes: parseKocka('1k6+1'),
        sebzestipus: 'zuzo'
    },
    {
        nev: 'Dárda',
        kategoria: FEGYVER_KATEGORIAK.szalfegyver,
        kez: 1.5,
        sebesseg: 'atlagos',
        ke: 8,
        te: 13,
        ve: 5,
        sebzes: parseKocka('1k6+1'),
        sebzestipus: 'szuro'
    },
    {
        nev: 'Dobóháló',
        kepesseg: 'mozgaskoordinacio',
        kez: 1,
        sebesseg: 3,
        ke: 1,
        te: 8,
        ve: 4,
        sebzes: parseKocka('0'),
        sebzestipus: 'zuzo'
    },
    {
        nev: 'Domvik hadijogar',
        kategoria: FEGYVER_KATEGORIAK.zuzo,
        kez: 1,
        sebesseg: 'atlagos',
        ke: 8,
        te: 11,
        ve: 12,
        sebzes: parseKocka('1k6'),
        sebzestipus: 'zuzo'
    },
    {
        nev: 'Dzsambia',
        kategoria: FEGYVER_KATEGORIAK.egykezes_szuro,
        kez: 1,
        sebesseg: 'gyors',
        ke: 10,
        te: 8,
        ve: 4,
        sebzes: parseKocka('1k6'),
        sebzestipus: ['szuro', 'vago']
    },
    {
        nev: 'Garott',
        kepesseg: 'reflex',
        kez: 2,
        sebesseg: 'atlagos',
        ke: 0,
        te: 5,
        ve: -20,
        sebzes: parseKocka('1k10'),
        sebzestipus: 'vago'
    },
    {
        nev: 'Hajitóbárd',
        kategoria: FEGYVER_KATEGORIAK.dobo,
        kez: 1,
        sebesseg: 'gyors',
        ke: 9,
        te: 10,
        ve: 4,
        sebzes: parseKocka('1k6'),
        sebzestipus: 'vago'
    },
    {
        nev: 'Harcikalapács',
        kategoria: FEGYVER_KATEGORIAK.zuzo,
        kez: 1,
        sebesseg: 'atlagos',
        ke: 5,
        te: 8,
        ve: 10,
        sebzes: parseKocka('1k6+2'),
        sebzestipus: 'zuzo'
    },
    {
        nev: 'Kard, dzsenn szablya',
        kepesseg: 'osszpontositas',
        kez: 1,
        sebesseg: 'atlagos',
        ke: 9,
        te: 20,
        ve: 17,
        sebzes: parseKocka('1k6+3'),
        sebzestipus: 'vago'
    },
    {
        nev: 'Kard, fejvadász',
        kepesseg: 'mozgaskoordinacio',
        kez: 1,
        sebesseg: 'atlagos',
        ke: 8,
        te: 16,
        ve: 16,
        sebzes: parseKocka('1k6+2'),
        sebzestipus: ['vago', 'szuro']
    },
    {
        nev: 'Kard, handzsár',
        kategoria: FEGYVER_KATEGORIAK.egykezes_vago,
        kez: 1.5,
        sebesseg: 'atlagos',
        ke: 8,
        te: 14,
        ve: 15,
        sebzes: parseKocka('1k6+3'),
        sebzestipus: ['vago', 'szuro']
    },
    {
        nev: 'Kard, hosszú',
        kategoria: FEGYVER_KATEGORIAK.egykezes_vago,
        kez: 1,
        sebesseg: 'atlagos',
        ke: 6,
        te: 14,
        ve: 16,
        sebzes: parseKocka('1k10'),
        sebzestipus: ['vago', 'szuro']
    },
    {
        nev: 'Kard, jatagán',
        kategoria: FEGYVER_KATEGORIAK.egykezes_vago,
        kez: 1,
        sebesseg: 'atlagos',
        ke: 7,
        te: 14,
        ve: 14,
        sebzes: parseKocka('1k6+2'),
        sebzestipus: ['vago']
    },
    {
        nev: 'Kard, kígyó',
        kategoria: FEGYVER_KATEGORIAK.egykezes_vago,
        kez: 1,
        sebesseg: 'atlagos',
        ke: 6,
        te: 14,
        ve: 15,
        sebzes: parseKocka('1k10'),
        sebzestipus: ['vago']
    },
    {
        nev: 'Kard, lovagi',
        kategoria: FEGYVER_KATEGORIAK.egykezes_vago,
        kez: 1,
        sebesseg: 'atlagos',
        ke: 2,
        te: 10,
        ve: 7,
        sebzes: parseKocka('2k6+2'),
        sebzestipus: ['vago']
    },
    {
        nev: 'Kard, másfélkezes',
        kategoria: FEGYVER_KATEGORIAK.egykezes_vago,
        kez: 1.5,
        sebesseg: 'atlagos',
        ke: 4,
        te: 13,
        ve: 12,
        sebzes: parseKocka('2k6'),
        sebzestipus: ['vago', 'szuro']
    },
    {
        nev: 'Kard, pallos',
        kepesseg: 'izom',
        kez: 2,
        sebesseg: 'lassu',
        ke: 0,
        te: 8,
        ve: 2,
        sebzes: parseKocka('3k6+2'),
        sebzestipus: ['vago', 'szuro', 'zuzo']
    },
    {
        nev: 'Kard, rövid',
        kategoria: FEGYVER_KATEGORIAK.egykezes_szuro,
        kez: 1,
        sebesseg: 'atlagos',
        ke: 9,
        te: 12,
        ve: 14,
        sebzes: parseKocka('1k6+1'),
        sebzestipus: ['vago', 'szuro']
    },
    {
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
    },
    {
        nev: 'Kard, szablya',
        kategoria: FEGYVER_KATEGORIAK.egykezes_vago,
        kez: 1,
        sebesseg: 'atlagos',
        ke: 7,
        te: 15,
        ve: 17,
        sebzes: parseKocka('1k6+2'),
        sebzestipus: ['vago']
    },
    {
        nev: 'Kés',
        kategoria: FEGYVER_KATEGORIAK.egykezes_szuro,
        kez: 1,
        sebesseg: 'atlagos',
        ke: 10,
        te: 4,
        ve: 0,
        sebzes: parseKocka('1k5'),
        sebzestipus: ['szuro', 'vago']
    },
    {
        nev: 'Kopja, könnyű',
        kategoria: FEGYVER_KATEGORIAK.szalfegyver,
        kez: 2,
        sebesseg: 'atlagos',
        ke: 2,
        te: 11,
        ve: 12,
        sebzes: parseKocka('1k10'),
        sebzestipus: ['szuro']
    },
    {
        nev: 'Kopja, lovas',
        kategoria: FEGYVER_KATEGORIAK.szalfegyver,
        kez: 2,
        sebesseg: 'lassu',
        ke: 1,
        te: 15,
        ve: 0,
        sebzes: parseKocka('1k6'),
        sebzestipus: ['szuro']
    },
    {
        nev: 'Kopja, nehézlovas',
        kategoria: FEGYVER_KATEGORIAK.szalfegyver,
        kez: 2,
        sebesseg: 3,
        ke: 0,
        te: 15,
        ve: 0,
        sebzes: parseKocka('2k10'),
        sebzestipus: ['szuro']
    },
    {
        nev: 'Korbács',
        kepesseg: 'mozgaskoordinacio',
        kez: 1,
        sebesseg: 'lassu',
        ke: 4,
        te: 6,
        ve: 0,
        sebzes: parseKocka('1k3'),
        sebzestipus: ['zuzo']
    },
    {
        nev: 'Lagoss',
        kepesseg: 'reflex',
        kez: 1,
        sebesseg: 'gyors',
        ke: 8,
        te: 14,
        ve: 14,
        sebzes: parseKocka('1k6+4'),
        sebzestipus: ['szuro', 'vago']
    },
    {
        nev: 'Lándzsa',
        kategoria: FEGYVER_KATEGORIAK.szalfegyver,
        kez: 1.5,
        sebesseg: 'atlagos',
        ke: 4,
        te: 12,
        ve: 12,
        sebzes: parseKocka('1k10'),
        sebzestipus: ['szuro']
    },
    {
        nev: 'Lasszó',
        kepesseg: 'mozgaskoordinacio',
        kez: 2,
        sebesseg: 3,
        ke: 0,
        te: 1,
        ve: 0,
        sebzes: parseKocka('0'),
        sebzestipus: ['zuzo']
    },
    {
        nev: 'Mara-sequor',
        kepesseg: 'mozgaskoordinacio',
        kez: 1.5,
        sebesseg: 'atlagos',
        ke: 7,
        te: 16,
        ve: 14,
        sebzes: parseKocka('2k6+2'),
        sebzestipus: ['szuro', 'vago']
    },
    {
        nev: 'Mesterkard',
        kategoria: FEGYVER_KATEGORIAK.egykezes_vago,
        kez: 1,
        sebesseg: 'atlagos',
        ke: 7,
        te: 16,
        ve: 14,
        sebzes: parseKocka('1k10'),
        sebzestipus: ['szuro', 'vago']
    },
    {
        nev: 'Ostor',
        kepesseg: 'mozgaskoordinacio',
        kez: 1,
        sebesseg: 'gyors',
        ke: 3,
        te: 6,
        ve: 0,
        sebzes: parseKocka('1k2'),
        sebzestipus: ['zuzo']
    },
    {
        nev: 'Predoci egyeneskard',
        kategoria: FEGYVER_KATEGORIAK.egykezes_vago,
        kez: 1,
        sebesseg: 'atlagos',
        ke: 7,
        te: 16,
        ve: 15,
        sebzes: parseKocka('1k10'),
        sebzestipus: ['szuro', 'vago']
    },
    {
        nev: 'Pugoss',
        kepesseg: 'reflex',
        kez: 1,
        sebesseg: 'gyors',
        ke: 4,
        te: 6,
        ve: 12,
        sebzes: parseKocka('1k6'),
        sebzestipus: ['szuro', 'vago']
    },
    {
        nev: 'Ramiera',
        kategoria: FEGYVER_KATEGORIAK.egykezes_szuro,
        kez: 1,
        sebesseg: 'atlagos',
        ke: 8,
        te: 17,
        ve: 14,
        sebzes: parseKocka('1k6+1'),
        sebzestipus: ['szuro']
    },
    {
        nev: 'Sequor',
        kepesseg: 'mozgaskoordinacio',
        kez: 0.5,
        sebesseg: 'gyors',
        ke: 8,
        te: 16,
        ve: 13,
        sebzes: parseKocka('1k6+2'),
        sebzestipus: ['szuro', 'vago']
    },
    {
        nev: 'Slan csillag',
        kategoria: FEGYVER_KATEGORIAK.dobo,
        kez: 1,
        sebesseg: 'gyors',
        ke: 10,
        te: 4,
        ve: 0,
        sebzes: parseKocka('1k3'),
        sebzestipus: ['szuro']
    },
    {
        nev: 'Szigony',
        kategoria: FEGYVER_KATEGORIAK.szalfegyver,
        kez: 1.5,
        sebesseg: 'atlagos',
        ke: 4,
        te: 15,
        ve: 10,
        sebzes: parseKocka('1k10+1'),
        sebzestipus: ['szuro']
    },
    {
        nev: 'Tahdzsi',
        kategoria: FEGYVER_KATEGORIAK.egykezes_szuro,
        kez: 1,
        sebesseg: 'atlagos',
        ke: 9,
        te: 11,
        ve: 14,
        sebzes: parseKocka('1k6+1'),
        sebzestipus: ['szuro', 'vago']
    },
    {
        nev: 'Tőr',
        kategoria: FEGYVER_KATEGORIAK.egykezes_szuro,
        kez: 1,
        sebesseg: 'gyors',
        ke: 10,
        te: 8,
        ve: 2,
        sebzes: parseKocka('1k6'),
        sebzestipus: ['szuro']
    },
    {
        nev: 'Tőr, dobó',
        kategoria: FEGYVER_KATEGORIAK.dobo,
        kez: 1,
        sebesseg: 'gyors',
        ke: 10,
        te: 11,
        ve: 2,
        sebzes: parseKocka('1k6'),
        sebzestipus: ['szuro']
    },
    {
        nev: 'Tőr, Slan',
        kepesseg: 'osszpontositas',
        kez: 0.5,
        sebesseg: 'gyors',
        ke: 9,
        te: 14,
        ve: 6,
        flags: 'slan-tor',
        sebzes: parseKocka('1k6+2'),
        sebzestipus: ['szuro', 'vago']
    },
    {
        nev: 'Tőrkard',
        kategoria: FEGYVER_KATEGORIAK.egykezes_szuro,
        kez: 1,
        sebesseg: 'gyors',
        ke: 9,
        te: 12,
        ve: 14,
        sebzes: parseKocka('1k6+2'),
        sebzestipus: ['szuro']
    },
    {
        nev: 'Pajzs, közepes',
        kepesseg: 'izom',
        flags: 'nagy-pajzs',
        kez: 1,
        sebesseg: 'atlagos',
        mgt: 1,
        ke: 0,
        te: 0,
        ve: 35,
        sebzes: parseKocka('1k6'),
        sebzestipus: ['zuzo']
    },
    {
        nev: 'Pajzs, nagy',
        flags: 'nagy-pajzs',
        kepesseg: 'izom',
        kez: 1,
        mgt: 5,
        sebesseg: 'lassu',
        ke: 0,
        te: 0,
        ve: 50,
        sebzes: parseKocka('1k6'),
        sebzestipus: ['zuzo']
    },
    {
        nev: 'Pajzs, kicsi',
        kepesseg: 'mozgaskoordinacio',
        flags: 'buckler',
        kez: 0.5,
        sebesseg: 'atlagos',
        mgt: 0,
        ke: 4,
        te: 4,
        ve: 20,
        sebzes: parseKocka('1k6'),
        sebzestipus: ['szuro']
    },
    {
        nev: 'Alkarvédő',
        kepesseg: 'reflex',
        flags: 'buckler',
        kez: 0.5,
        sebesseg: 'gyors',
        mgt: 0,
        ke: 7,
        te: 7,
        ve: 18,
        sebzes: parseKocka('1k6'),
        sebzestipus: ['szuro']
    },
];

