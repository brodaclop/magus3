import { KarakterCalcResult } from './KarakterCalculator';
import { NormalKepzettseg } from './Kepzettseg';
import { constructArray, NamedEntity, namedEntityArray } from './util';
import varazslatLista from '../data/varazslatok.json';

export type GyorsVarazslat = { ke: number } & VarazslatBase;
export type LassuVarazslat = { varazslasIdeje: string } & VarazslatBase;

const MagiaHasznalat: NormalKepzettseg = {
    fajta: 'normal',
    id: 'magiahasznalat',
    name: 'Mágiahasználat',
    tipus: 'magia',
    kepesseg: 'osszpontositas',
    linked: [],
    kp: [
        8,
        19,
        25,
        33,
        40
    ],
    leiras: 'A mágiahasználat képzettség képessé teszi a nem varázshasználó karaktert arra, hogy manát kössön meg a testében. Ezt naponta egyszer, pihenés után tudja megtenni, tíz percnyi meditáció segítségével. A képzettség mindössze a mana begyűjtését és tárolását teszi lehetővé, nem tesz képessé a varázslásra. Utóbbihoz a megfelelő mágiaiskola valamilyen fokú ismerete is szükséges.\n\nFontos, hogy szakrális mágia ilyen módon egyáltalán nem hozható létre, hiszen ott a rituálék és litániák a karakter istenéhez való fohászok, a varázslat létrejötte minden esetben az adott isten jóindulatán múlik.',
    szintleiras: [
        '5 MP',
        '8 MP',
        '11 MP',
        '14 MP',
        '17 MP'
    ],
    __generated: true
};

const VarazslatKepzettsegek = [
    {
        id: 'magia:pap_szfera_altalanos',
        name: 'Általános Szféra',
        kepesseg: 'hit'
    },
    {
        id: 'magia:pap_szfera_termeszet',
        name: 'Természet Szféra',
        kepesseg: 'hit'
    },
    {
        id: 'magia:pap_szfera_elet',
        name: 'Élet Szféra',
        kepesseg: 'hit'
    },
    {
        id: 'magia:pap_szfera_lelek',
        name: 'Lélek Szféra',
        kepesseg: 'hit'
    },
    {
        id: 'magia:pap_szfera_halal',
        name: 'Halál Szféra',
        kepesseg: 'hit'
    },
] as const;

export const Mentodobasok = [
    { name: 'Mentál', id: 'mental' },
    { name: 'Asztrál', id: 'asztral' },
    { name: 'Asztrál+Mentál', id: 'asztral+mental' },
    { name: 'Méreg', id: 'mereg' },
    { name: '-', id: 'nincs' },
] as const;

export const MagiaKategoriak = [
    { name: 'Kis Arkánum', id: 'kis_arkanum' },
    { name: 'Nagy Arkánum', id: 'nagy_arkanum' },
    { name: 'Litánia', id: 'litania' },
    { name: 'Rituálé', id: 'rituale' },
    { name: 'Darton egyedi', id: 'egyedi_darton' }
] as const;

export interface VarazslatBase extends NamedEntity {
    mp: number;
    range: 'self' | 'touch' | number;
    idotartam: string;
    leiras: string;
    save: typeof Mentodobasok[number]['id'];
    kategoriak: Array<typeof MagiaKategoriak[number]['id']>;
    kepzettseg: typeof VarazslatKepzettsegek[number]['id'];
    fok: number;

}

export type Varazslat = (GyorsVarazslat | LassuVarazslat);

const varazslatok = (kepzettseg: typeof VarazslatKepzettsegek[number], fok: number): Array<Varazslat> => Magia.lista.filter(v =>
    v.kepzettseg === kepzettseg.id && v.fok === fok
);

export const Magia = {
    ...namedEntityArray(varazslatLista as Array<Varazslat>),
    kepzettsegek: () => VarazslatKepzettsegek.map(k => ({
        ...k,
        varazslatok: constructArray(5, i => varazslatok(k, i + 1))
    })),
    hasznalatKepzettseg: MagiaHasznalat,
    magiaHasznalatMana: (kepzettsegek: KarakterCalcResult['kepzettsegek']['normal']): number => {
        const fok = kepzettsegek.find(k => k.kepzettseg.id === MagiaHasznalat.id)?.fok;
        if (fok === undefined || fok === 0) {
            return 0;
        }
        return 2 + fok * 3;
    },
    mentodobasok: Mentodobasok,
    kategoriak: MagiaKategoriak
};