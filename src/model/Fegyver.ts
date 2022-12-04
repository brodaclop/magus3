import { Harcertek } from "./Harcertek";
import { SzintInfo } from "./Karakter";
import { KockaDobas, parseKocka } from "./Kocka";
import { NamedEntity } from "./util";

export type SebzesTipus = 'szuro' | 'vago' | 'zuzo';

export const SEBZESTIPUS_LABEL: Record<SebzesTipus, string> = {
    szuro: 'Szúró',
    vago: 'Vágó',
    zuzo: 'Zúzó'
};
export type Sebesseg = 'gyors' | 'atlagos' | 'lassu' | 3 | 4 | 5;

export interface FegyverKategoria {
    id: string;
    nev: string;
    kepesseg: string;
    erobonusz: number;
}

export interface FegyverBase extends NamedEntity {
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

export const getFegyver = (nev: string): KozelharcFegyver => KOZELHARCI_FEGYVEREK.find(f => f.name === nev) as KozelharcFegyver;


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
export const KOZELHARCI_FEGYVEREK: Array<KozelharcFegyver> = [
    {
        id: 'okolharc',
        name: 'Ökölharc',
        kez: 2,
        kepesseg: 'izom',
        sebesseg: 'gyors',
        ke: 10,
        te: 6,
        ve: 5,
        flags: 'pusztakez',
        sebzes: parseKocka('1k2'),
        erobonusz: 16,
        sebzestipus: 'zuzo'
    },
    {
        id: 'alabard',
        name: 'Alabárd',
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
        id: 'beltepo',
        name: 'Béltépő',
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
        id: 'bola',
        name: 'Bola',
        kepesseg: 'mozgaskoordinacio',
        kez: 1,
        sebesseg: 'atlagos',
        ke: 2,
        te: 10,
        ve: 2,
        sebzes: parseKocka('1k5'),
        erobonusz: 0,
        sebzestipus: 'zuzo'
    },
    {
        id: 'bot_furkos',
        name: 'Bot, furkós',
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
        id: 'bot_hosszu',
        name: 'Bot, hosszú',
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
        id: 'bot_rovid',
        name: 'Bot, rövid',
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
        id: 'buzogany_egykezes',
        name: 'Buzogány, egykezes',
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
        id: 'buzogany_ketkezes',
        name: 'Buzogány, kétkezes',
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
        id: 'buzogany_lancos',
        name: 'Buzogány, láncos',
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
        id: 'buzogany_shadleki',
        name: 'Buzogány, shadleki',
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
        id: 'buzogany_tollas',
        name: 'Buzogány, tollas',
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
        id: 'buzogany_tuskes',
        name: 'Buzogány, tüskés',
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
        id: 'csatabard_egykezes',
        name: 'Csatabárd, egykezes',
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
        id: 'csatabard_ketkezes',
        name: 'Csatabárd, kétkezes',
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
        id: 'csatacsakany',
        name: 'Csatacsákány',
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
        id: 'csephadaro',
        name: 'Cséphadaró',
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
        id: 'darda',
        name: 'Dárda',
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
        id: 'dobohalo',
        name: 'Dobóháló',
        kepesseg: 'mozgaskoordinacio',
        kez: 1,
        sebesseg: 3,
        ke: 1,
        te: 8,
        ve: 4,
        sebzes: parseKocka('0'),
        erobonusz: 0,
        sebzestipus: 'zuzo'
    },
    {
        id: 'domvik_hadijogar',
        name: 'Domvik hadijogar',
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
        id: 'dzsambia',
        name: 'Dzsambia',
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
        id: 'garott',
        name: 'Garott',
        kepesseg: 'reflex',
        kez: 2,
        sebesseg: 'atlagos',
        ke: 0,
        te: 5,
        ve: -20,
        sebzes: parseKocka('1k10'),
        erobonusz: 0,
        sebzestipus: 'vago'
    },
    {
        id: 'hajitobard',
        name: 'Hajitóbárd',
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
        id: 'harcikalapacs',
        name: 'Harcikalapács',
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
        id: 'dzsenn_szablya',
        name: 'Kard, dzsenn szablya',
        kepesseg: 'osszpontositas',
        kez: 1,
        sebesseg: 'atlagos',
        ke: 9,
        te: 20,
        ve: 17,
        sebzes: parseKocka('1k6+3'),
        erobonusz: 0,
        sebzestipus: 'vago'
    },
    {
        id: 'kard_fejvadasz',
        name: 'Kard, fejvadász',
        kepesseg: 'mozgaskoordinacio',
        kez: 1,
        sebesseg: 'atlagos',
        ke: 8,
        te: 16,
        ve: 16,
        sebzes: parseKocka('1k6+2'),
        erobonusz: 16,
        sebzestipus: ['vago', 'szuro']
    },
    {
        id: 'handzsar',
        name: 'Kard, handzsár',
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
        id: 'kard_hosszu',
        name: 'Kard, hosszú',
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
        id: 'jatagan',
        name: 'Kard, jatagán',
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
        id: 'kard_kigyo',
        name: 'Kard, kígyó',
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
        id: 'kard_lovagi',
        name: 'Kard, lovagi',
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
        id: 'kard_masfelkezes',
        name: 'Kard, másfélkezes',
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
        id: 'pallos',
        name: 'Kard, pallos',
        kepesseg: 'izom',
        kez: 2,
        sebesseg: 'lassu',
        ke: 0,
        te: 8,
        ve: 2,
        sebzes: parseKocka('3k6+2'),
        erobonusz: 14,
        sebzestipus: ['vago', 'szuro', 'zuzo']
    },
    {
        id: 'kard_rovid',
        name: 'Kard, rövid',
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
        id: 'kard_slan',
        name: 'Kard, Slan',
        kepesseg: 'osszpontositas',
        kez: 1.5,
        sebesseg: 'atlagos',
        ke: 8,
        te: 20,
        ve: 12,
        flags: 'slan-kard',
        sebzes: parseKocka('1k10+2'),
        erobonusz: 16,
        sebzestipus: ['vago', 'szuro']
    },
    {
        id: 'szablya',
        name: 'Kard, szablya',
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
        id: 'kes',
        name: 'Kés',
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
        id: 'kopja_konnyu',
        name: 'Kopja, könnyű',
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
        id: 'kopja_lovas',
        name: 'Kopja, lovas',
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
        id: 'kopja_nehezlovas',
        name: 'Kopja, nehézlovas',
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
        id: 'korbacs',
        name: 'Korbács',
        kepesseg: 'mozgaskoordinacio',
        kez: 1,
        sebesseg: 'lassu',
        ke: 4,
        te: 6,
        ve: 0,
        sebzes: parseKocka('1k3'),
        erobonusz: 0,
        sebzestipus: ['zuzo']
    },
    {
        id: 'lagoss',
        name: 'Lagoss',
        kepesseg: 'reflex',
        kez: 1,
        sebesseg: 'gyors',
        ke: 8,
        te: 14,
        ve: 14,
        sebzes: parseKocka('1k6+4'),
        erobonusz: 16,
        sebzestipus: ['szuro', 'vago']
    },
    {
        id: 'landzsa',
        name: 'Lándzsa',
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
        id: 'lasszo',
        name: 'Lasszó',
        kepesseg: 'mozgaskoordinacio',
        kez: 2,
        sebesseg: 3,
        ke: 0,
        te: 1,
        ve: 0,
        sebzes: parseKocka('0'),
        erobonusz: 0,
        sebzestipus: ['zuzo']
    },
    {
        id: 'mara_sequor',
        name: 'Mara-sequor',
        kepesseg: 'mozgaskoordinacio',
        kez: 1.5,
        sebesseg: 'atlagos',
        ke: 7,
        te: 16,
        ve: 14,
        sebzes: parseKocka('2k6+2'),
        erobonusz: 16,
        sebzestipus: ['szuro', 'vago']
    },
    {
        id: 'mesterkard',
        name: 'Mesterkard',
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
        id: 'ostor',
        name: 'Ostor',
        kepesseg: 'mozgaskoordinacio',
        kez: 1,
        sebesseg: 'gyors',
        ke: 3,
        te: 6,
        ve: 0,
        sebzes: parseKocka('1k2'),
        erobonusz: 0,
        sebzestipus: ['zuzo']
    },
    {
        id: 'predoci_egyeneskard',
        name: 'Predoci egyeneskard',
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
        id: 'pugoss',
        name: 'Pugoss',
        kepesseg: 'reflex',
        kez: 1,
        sebesseg: 'gyors',
        ke: 4,
        te: 6,
        ve: 12,
        sebzes: parseKocka('1k6'),
        erobonusz: 16,
        sebzestipus: ['szuro', 'vago']
    },
    {
        id: 'ramiera',
        name: 'Ramiera',
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
        id: 'sequor',
        name: 'Sequor',
        kepesseg: 'mozgaskoordinacio',
        kez: 0.5,
        sebesseg: 'gyors',
        ke: 8,
        te: 16,
        ve: 13,
        sebzes: parseKocka('1k6+2'),
        erobonusz: 16,
        sebzestipus: ['szuro', 'vago']
    },
    {
        id: 'slan_csillag',
        name: 'Slan csillag',
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
        id: 'szigony',
        name: 'Szigony',
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
        id: 'tahdzsi',
        name: 'Tahdzsi',
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
        id: 'tor',
        name: 'Tőr',
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
        id: 'tor_dobo',
        name: 'Tőr, dobó',
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
        id: 'tor_slan',
        name: 'Tőr, Slan',
        kepesseg: 'osszpontositas',
        kez: 0.5,
        sebesseg: 'gyors',
        ke: 9,
        te: 14,
        ve: 6,
        flags: 'slan-tor',
        sebzes: parseKocka('1k6+2'),
        erobonusz: 16,
        sebzestipus: ['szuro', 'vago']
    },
    {
        id: 'torkard',
        name: 'Tőrkard',
        kepesseg: 'reflex',
        erobonusz: 0,
        kez: 1,
        sebesseg: 'gyors',
        ke: 9,
        te: 12,
        ve: 14,
        sebzes: parseKocka('1k6+2'),
        sebzestipus: ['szuro']
    },
    {
        id: 'pajzs_kozepes',
        name: 'Pajzs, közepes',
        kepesseg: 'izom',
        flags: 'nagy-pajzs',
        kez: 1,
        sebesseg: 'atlagos',
        mgt: 1,
        ke: 0,
        te: 0,
        ve: 35,
        sebzes: parseKocka('1k6'),
        erobonusz: 16,
        sebzestipus: ['zuzo']
    },
    {
        id: 'pajzs_nagy',
        name: 'Pajzs, nagy',
        flags: 'nagy-pajzs',
        kepesseg: 'izom',
        kez: 1,
        mgt: 5,
        sebesseg: 'lassu',
        ke: 0,
        te: 0,
        ve: 50,
        sebzes: parseKocka('1k6'),
        erobonusz: 16,
        sebzestipus: ['zuzo']
    },
    {
        id: 'pajzs_kicsi',
        name: 'Pajzs, kicsi',
        kepesseg: 'mozgaskoordinacio',
        flags: 'buckler',
        kez: 0.5,
        sebesseg: 'atlagos',
        mgt: 0,
        ke: 4,
        te: 4,
        ve: 20,
        sebzes: parseKocka('1k6'),
        erobonusz: 16,
        sebzestipus: ['szuro']
    },
    {
        id: 'alkarvedo',
        name: 'Alkarvédő',
        kepesseg: 'reflex',
        flags: 'buckler',
        kez: 0.5,
        sebesseg: 'gyors',
        mgt: 0,
        ke: 7,
        te: 7,
        ve: 18,
        sebzes: parseKocka('1k6'),
        erobonusz: 16,
        sebzestipus: ['szuro']
    },
];

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
    kepzettseg: (kepzettsegek: SzintInfo['kepzettsegek']['normal'], fegyver: KozelharcFegyver, minusz = 0): Harcertek => {
        const kepzettseg = kepzettsegek.find(k => k.kepzettseg.id === `fegyver:${fegyver.id}`);
        const kategoriaKepzettseg = kepzettsegek.find(k => k.kepzettseg.id === `fegyverkat:${fegyver.kategoria?.id}`);

        const fok = Math.max(kepzettseg?.fok ?? 0, kategoriaKepzettseg?.fok ?? 0);
        return FEGYVER_KEPZETTSEG_HARCERTEKEK[Math.max(fok - minusz, 0)];
    }
}