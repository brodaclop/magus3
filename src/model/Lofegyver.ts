import { FegyverKategoria, FegyverSebesseg, SebzesTipus } from "./Fegyver";
import { KockaDobas, parseKocka } from "./Kocka";
import { NamedEntity, namedEntityArray } from "./util";

export interface LofegyverBase extends NamedEntity {
    sebesseg: typeof FegyverSebesseg[number];
    ke: number;
    ce: number;
    sebzestipus: typeof SebzesTipus[number]['id'];
    alternativKepzettseg?: string;
};

export interface NyilpuskaLofegyver extends LofegyverBase {
    tipus: 'nyilpuska';
    sebzes: KockaDobas;
    kategoria: FegyverKategoria;
    lotav: number;

}

export interface EgyebLofegyver extends LofegyverBase {
    tipus: 'egyeb';
    sebzes: KockaDobas;
    kategoria?: undefined;
    lotav: number;
    kepesseg: string;
}

export interface IjLofegyver extends LofegyverBase {
    tipus: 'ij';
    kategoria?: undefined;
    kepesseg: 'mozgaskoordinacio';
    minimumEro: number;
    maximumEro: number;
    eroPlusz: number;
};

export type Lofegyver = NyilpuskaLofegyver | EgyebLofegyver | IjLofegyver;
export type FixSebzesuLofegyver = NyilpuskaLofegyver | EgyebLofegyver;

const NYILPUSKA_KATEGORIA: FegyverKategoria = {
    id: 'nyilpuska',
    nev: 'Nyílpuska',
    erobonusz: 0,
    kepesseg: 'erzekeles'
};


const LOFEGYVEREK: Array<Lofegyver> = [
    {
        id: 'nyilpuska_kezi',
        name: 'Nyílpuska, kézi',
        tipus: 'nyilpuska',
        kategoria: NYILPUSKA_KATEGORIA,
        sebzestipus: 'szuro',
        sebesseg: 'atlagos',
        ke: 3,
        ce: 14,
        sebzes: parseKocka('1d3'),
        lotav: 30
    },
    {
        id: 'nyilpuska_kahrei',
        name: 'Nyílpuska, kahrei',
        tipus: 'nyilpuska',
        kategoria: NYILPUSKA_KATEGORIA,
        sebzestipus: 'szuro',
        sebesseg: 'gyors',
        ke: 9,
        ce: 13,
        sebzes: parseKocka('1d3'),
        lotav: 30
    },
    {
        id: 'nyilpuska_konnyu',
        name: 'Nyílpuska, konnyu',
        tipus: 'nyilpuska',
        kategoria: NYILPUSKA_KATEGORIA,
        sebzestipus: 'szuro',
        sebesseg: 'lassu',
        ke: 2,
        ce: 16,
        sebzes: parseKocka('1d6+1'),
        lotav: 50
    },
    {
        id: 'nyilpuska_nehez',
        name: 'Nyílpuska, nehez',
        tipus: 'nyilpuska',
        kategoria: NYILPUSKA_KATEGORIA,
        sebzestipus: 'szuro',
        sebesseg: '3',
        ke: 0,
        ce: 15,
        sebzes: parseKocka('1d10+2'),
        lotav: 30
    },
    {
        id: 'nyilpuska_shadoni',
        name: 'Nyílpuska, shadoni páncéltörő',
        tipus: 'nyilpuska',
        kategoria: NYILPUSKA_KATEGORIA,
        sebzestipus: 'szuro',
        sebesseg: '5',
        ke: 0,
        ce: 17,
        sebzes: parseKocka('2d10'),
        lotav: 80
    },
    {
        id: 'parittya',
        name: 'Parittya',
        tipus: 'egyeb',
        sebzestipus: 'zuzo',
        sebesseg: 'atlagos',
        kepesseg: 'izom',
        ke: 2,
        ce: 1,
        sebzes: parseKocka('1d5'),
        lotav: 100
    },
    {
        id: 'fuvocso',
        name: 'Fúvócső',
        tipus: 'egyeb',
        sebzestipus: 'szuro',
        sebesseg: 'gyors',
        kepesseg: 'allokepesseg',
        ke: 8,
        ce: 7,
        sebzes: parseKocka('1'),
        lotav: 30
    },
    {
        id: 'ij_rovid',
        name: 'Íj, rövid',
        tipus: 'ij',
        eroPlusz: 0,
        sebzestipus: 'szuro',
        sebesseg: 'atlagos',
        ke: 5,
        ce: 8,
        kepesseg: 'mozgaskoordinacio',
        minimumEro: 13,
        maximumEro: 18
    },
    {
        id: 'ij_hosszu',
        name: 'Íj, hosszú',
        tipus: 'ij',
        eroPlusz: 0,
        sebzestipus: 'szuro',
        sebesseg: 'atlagos',
        ke: 5,
        ce: 8,
        kepesseg: 'mozgaskoordinacio',
        minimumEro: 15,
        maximumEro: 20
    },
    {
        id: 'ij_visszacsapó',
        name: 'Íj, visszacsapó',
        tipus: 'ij',
        eroPlusz: 0,
        sebzestipus: 'szuro',
        sebesseg: 'atlagos',
        ke: 5,
        ce: 8,
        kepesseg: 'mozgaskoordinacio',
        minimumEro: 10,
        maximumEro: 20
    },
    {
        id: 'ij_elf',
        name: 'Íj, elf',
        tipus: 'ij',
        eroPlusz: 2,
        sebzestipus: 'szuro',
        sebesseg: 'atlagos',
        ke: 7,
        ce: 10,
        kepesseg: 'mozgaskoordinacio',
        minimumEro: 10,
        maximumEro: 20
    },

];



// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Lofegyver = {
    ...namedEntityArray(LOFEGYVEREK),
    calculateIj: (izom: number, fok: number, ij: IjLofegyver): { sebzes: KockaDobas, lotav: number } => {
        const ero = Math.min(izom + fok + ij.eroPlusz, ij.maximumEro);
        const lotav = Math.max(45, ero * 15 - 105);
        if (ero <= 10 || izom < ij.minimumEro) {
            return { sebzes: parseKocka('1'), lotav };
        };
        if (ero <= 11) {
            return { sebzes: parseKocka('1d2'), lotav };
        };
        if (ero <= 12) {
            return { sebzes: parseKocka('1d3'), lotav };
        };
        const plusz = (ero - 13) % 5 - 2;
        const darab = Math.floor((ero - 13) / 5 + 1);
        return { sebzes: { darab, kocka: 6, plusz }, lotav };
    }
};