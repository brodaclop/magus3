import { Fegyver, FEGYVER_KATEGORIAK, NYILPUSKA_KATEGORIA } from "./Fegyver";
import { SzintInfo } from "./Karakter";
import { mergeToArray, namedEntityArray } from "./util";
import taroltKepzettsegek from '../data/kepzettsegek.json';
import { EgyebLofegyver, Lofegyver } from "./Lofegyver";

export type KepzettsegTipus = 'fegyver' | 'fegyverkategoria' | 'tudomanyos' | 'harcmodor' | 'harci' | 'vilagi';

interface KepzettsegLink {
    id: string;
    strength: number;
}

export interface NormalKepzettseg {
    fajta: 'normal';
    id: string;
    name: string;
    tipus: KepzettsegTipus;
    kepesseg: string,
    linked: Array<KepzettsegLink>;
    kp: [number, number, number, number, number],
    leiras: string,
    szintleiras: [string, string, string, string, string],
    __generated?: boolean,
}

export interface SzazalekosKepzettseg {
    fajta: 'szazalekos';
    id: string;
    name: string;
    leiras: string;
}

export type Kepzettseg = NormalKepzettseg | SzazalekosKepzettseg;


const generateFegyverKepzettsegek = (): Array<NormalKepzettseg> => Fegyver.lista
    .filter(f => f.flags !== 'nagy-pajzs' && f.flags !== 'buckler')
    .map(f => {
        const linked: Array<KepzettsegLink> = f.kategoria ? [{ id: `fegyverkat:${f.kategoria.id}`, strength: 1 }] : [];
        return {
            fajta: 'normal',
            id: `fegyver:${f.id}`,
            name: `Fegyver (${f.name})`,
            tipus: 'fegyver',
            kepesseg: (f.kategoria?.kepesseg ?? f.kepesseg) as string,
            linked: linked,
            kp: [1, 3, 10, 25, 40],
            leiras: 'Egy adott fegyverrel való harc. A képzetlen fegyverhasználat módosítói: KÉ: -10, TÉ: -25, VÉ: -20, CÉ: -30',
            szintleiras: [
                'KÉ: -5, TÉ: -5, VÉ: -10, CÉ: -15',
                'KÉ: 0, TÉ: 0, VÉ: 0, CÉ: 0',
                'KÉ: +2, TÉ: +5, VÉ: +5, CÉ: +5',
                'KÉ: +5, TÉ: +10, VÉ: +10, CÉ: +10',
                'KÉ: +10, TÉ: +20, VÉ: +20, CÉ: +20'
            ],
            __generated: true
        }
    });

const generateLoFegyverKepzettsegek = (): Array<NormalKepzettseg> => [...Lofegyver.lista.filter(l => l.tipus !== 'ij'), { tipus: 'ij', id: 'ij', name: 'Íj' }]
    .map(f => {
        const linked: Array<KepzettsegLink> = f.tipus === 'nyilpuska' ? [{ id: NYILPUSKA_KATEGORIA.id, strength: 1 }] : [];
        const kepesseg = f.tipus === 'ij' ? 'mozgaskoordinacio' : (f.tipus === 'nyilpuska' ? NYILPUSKA_KATEGORIA.kepesseg : (f as EgyebLofegyver).kepesseg);
        return {
            fajta: 'normal',
            id: `fegyver:${f.id}`,
            name: `Fegyver (${f.name})`,
            tipus: 'fegyver',
            kepesseg,
            linked,
            kp: [1, 3, 10, 25, 40],
            leiras: 'Egy adott lőfegyverrel való harc. A képzetlen fegyverhasználat módosítói: KÉ: -10, CÉ: -30',
            szintleiras: [
                'KÉ: -5, CÉ: -15',
                'KÉ: 0, CÉ: 0',
                'KÉ: +2, CÉ: +5',
                'KÉ: +5, CÉ: +10',
                'KÉ: +10, CÉ: +20'
            ],
            __generated: true
        }
    });


const generateFegyverKategoriaKepzettsegek = (): Array<NormalKepzettseg> => [...Object.values(FEGYVER_KATEGORIAK), NYILPUSKA_KATEGORIA].map(k => ({
    fajta: 'normal',
    id: `fegyverkat:${k.id}`,
    name: `Fegyverkategória (${k.nev})`,
    tipus: 'fegyverkategoria',
    kepesseg: k.kepesseg,
    linked: [],
    kp: [5, 14, 50, 125, 200],
    leiras: 'Egy egész fegyvercsaláddal való harc. A képzetlen fegyverhasználat módosítói: KÉ: -10, TÉ: -25, VÉ: -20, CÉ: -30',
    szintleiras: [
        'KÉ: -5, TÉ: -5, VÉ: -10, CÉ: -15',
        'KÉ: 0, TÉ: 0, VÉ: 0, CÉ: 0',
        'KÉ: +2, TÉ: +5, VÉ: +5, CÉ: +5',
        'KÉ: +5, TÉ: +10, VÉ: +10, CÉ: +10',
        'KÉ: +10, TÉ: +20, VÉ: +20, CÉ: +20'
    ],
    __generated: true
}));

const SZAZALEKOS_KEPZETTSEGEK: Array<SzazalekosKepzettseg> = [
    {
        fajta: 'szazalekos',
        id: 'maszas',
        name: 'Mászás',
        leiras: 'Tudsz mászni.',
    },
    {
        fajta: 'szazalekos',
        id: 'eses',
        name: 'Esés',
        leiras: 'Tudsz esni.',
    },
    {
        fajta: 'szazalekos',
        id: 'ugras',
        name: 'Ugrás',
        leiras: 'Hopp!',
    },
    {
        fajta: 'szazalekos',
        id: 'zarnyitas',
        name: 'Zárnyitás',
        leiras: 'Szezám tárulj',
    },
    {
        fajta: 'szazalekos',
        id: 'lopozas',
        name: 'Lopózás',
        leiras: 'Lopótökkel való borkimérés',
    },
    {
        fajta: 'szazalekos',
        id: 'rejtozes',
        name: 'Rejtőzés',
        leiras: 'Aki bújt, aki nem',
    },
    {
        fajta: 'szazalekos',
        id: 'zsebmetszes',
        name: 'Zsebmetszes',
        leiras: 'Átenszion pikpokecc',
    },
    {
        fajta: 'szazalekos',
        id: 'csapdafelfedezes',
        name: 'Csapdafelfedezés',
        leiras: 'Kitaláltam egy újfajta csapdát',
    },
];

const NYELVEK = ['pyarroni', 'dzsad', 'erv', 'kráni', 'shadoni', 'gorviki', 'toroni', 'aszisz'];

const generateNyelvKepzettsegek: () => Array<NormalKepzettseg> = () => {
    return NYELVEK.map(ny => ({
        fajta: 'normal',
        id: `nyelv:${ny}`,
        name: `Nyelvtudás (${ny})`,
        tipus: 'vilagi',
        kepesseg: 'emlekezet',
        linked: [],
        kp: [1, 3, 5, 20, 35],
        leiras: '',
        szintleiras: ['', '', '', '', ''],
        __generated: true
    }));
}

const KEPZETTSEGEK: Array<Kepzettseg> = [
    ...taroltKepzettsegek as Array<Kepzettseg>,
    ...generateFegyverKategoriaKepzettsegek(),
    ...generateFegyverKepzettsegek(),
    ...generateLoFegyverKepzettsegek(),
    ...generateNyelvKepzettsegek(),
    ...SZAZALEKOS_KEPZETTSEGEK,
]
    .sort((a, b) => a.name.localeCompare(b.name))
    .sort((a, b) => a.fajta.localeCompare(b.fajta));



// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Kepzettseg = {
    ...namedEntityArray(KEPZETTSEGEK),
    kpFokhoz: (kepessegek: Record<string, number>, kepzettseg: NormalKepzettseg, fok: number): number => {
        const kepesseg = kepessegek[kepzettseg.kepesseg];
        return Math.ceil(kepzettseg.kp[fok - 1] * KP_SZORZOK[kepesseg]);
    },
    __taroltLista: () => Kepzettseg.lista.filter(k => k.fajta === 'normal' && !k.__generated),
    keres: (prefix: string): Array<Kepzettseg> => Kepzettseg.lista.filter(k => k.id.startsWith(prefix)),
    kpEloszt: (
        osszes: SzintInfo['kepzettsegek']['normal'],
        current: SzintInfo['kepzettsegek']['normal'],
        kepessegek: Record<string, number>,
        kepzettseg: NormalKepzettseg,
        pluszKp: number,
        transitive = false
    ): void => {
        let { fok = 0, kp = 0 } = osszes.find(k => k.kepzettseg.id === kepzettseg.id) ?? {};
        kp += pluszKp;
        //TODO: type
        while (fok < 5 && kp >= Kepzettseg.kpFokhoz(kepessegek, kepzettseg, (fok + 1) as any)) {
            kp -= Kepzettseg.kpFokhoz(kepessegek, kepzettseg, (fok + 1) as any);
            fok++;
        }
        mergeToArray(current, { kepzettseg, kp, fok }, i => i.kepzettseg.id);
        if (transitive) {
            kepzettseg.linked?.forEach(l => Kepzettseg.kpEloszt(osszes, current, kepessegek, Kepzettseg.find(l.id) as NormalKepzettseg, pluszKp * l.strength, false));
        }
    },
}

const KP_SZORZOK: Array<number> = [
    3, 3, 3, 3, 3, 2.5, // 0-5
    2.5, 2.5, 2, 2, 1.5, // 6-10
    1.4, 1.3, 1.2, 1.1, 1, // 11-15
    0.9, 0.8, 0.7, 0.6, 0.5, //16-20
    0.4, 0.4, 0.4, 0.4 //21-24
]; 
