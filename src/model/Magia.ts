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
        kepesseg: 'hit',
        leiras: ''
    },
    {
        id: 'magia:pap_szfera_termeszet',
        name: 'Természet Szféra',
        kepesseg: 'hit',
        leiras: ''
    },
    {
        id: 'magia:pap_szfera_elet',
        name: 'Élet Szféra',
        kepesseg: 'hit',
        leiras: ''
    },
    {
        id: 'magia:pap_szfera_lelek',
        name: 'Lélek Szféra',
        kepesseg: 'hit',
        leiras: ''
    },
    {
        id: 'magia:pap_szfera_halal',
        name: 'Halál Szféra',
        kepesseg: 'hit',
        leiras: ''
    },
    {
        id: 'magia:bard_dalmagia',
        name: 'Dalmágia',
        kepesseg: 'empatia',
        leiras: `Ynev bárdjai jártasak az Asztrál- és Mentálvarázslatok használatában, ám azokat csak egy különleges módszer, a Dalmágia segítségével képesek alkalmazni. Ennek gyakorlásához énekelniük vagy muzsikálniuk kell, hogy a dallamok formába öntsék és célba juttassák a varázslat bennük felgyűlt energiáit.

FIGYELEM! A bárd dalmágiája kizárólag élőlényekre hat!

A varázslat eredményességének feltétele az is, hogy a kiszemelt alany hallja a dalt. Amennyiben a célpont süket, vagy - saját jól felfogott érdekében - fülének befogásával védekezik a mágia ellen, a dal hatástalan marad.

A bárdok egyszerre több lényre is alkalmazhatják a Dalmágia varázslatait, a dal hatókörén belül ők határozhatják meg, ki legyen az, akire a dal varázslatként hat. A dal többi hallgatója nem észleli a dallamba ágyazott mágiát: értetlenül állnak majd társaik megváltozott viselkedése előtt. A bárdnak, mint fentebb említettük, énekelnie sem feltétlenül szükséges, elég, ha hangszerén játszik, a Dalmágia ez esetben is megidézhető.

Ritkán kerül sor arra, hogy egy bárd csatában használja a dalmágiát - ez alól talán csak a Bátorság dala jelent kivételt. A harcmező zaja ugyanis elnyomja a bárd énekét, s a Dalmágia varázslatainak hatótávolsága a felére csökken. A dalok mágiájának kedvez viszont a csend, melyben a dal messze elhallatszik, s a hatótáv ennek következményeként a kétszeresére nő.

Fontos, hogy a Dalmágia varázslatai tökéletesen összekapcsolódnak a bárd énekmondó, szórakoztató képességeivel. Hisz varázslásuk mindaddig észrevétlen maradhat, míg a hatás nyilvánvalóvá nem válik - ám akkorra sokszor már minden hiába.

A Dalmágia áldozatait a bárd választhatja meg tehát, a varázslat hatókörén belül tartózkodók közül csak azokra vonatkozik a hatás, akiket a bárd célpontnak szemelt ki.

A varázslatok megidézéséhez szükséges idő sokszor megyezik az Időtartammal - ennek oka, hogy a mágia csak addig hat, míg a bárd énekel. Előfordulhat az is, hogy a bárd énekének hatása továbbra is fennmarad, ilyen esetben áldozatonként változik, hogy mennyi idő szükséges a dal emlékének elűzéséhez.`
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
    kepzettsegek: Array<typeof VarazslatKepzettsegek[number]['id']>;
    fok: number;

}

export type Varazslat = (GyorsVarazslat | LassuVarazslat);

const varazslatok = (kepzettseg: typeof VarazslatKepzettsegek[number], fok: number): Array<Varazslat> => Magia.lista.filter(v =>
    v.kepzettsegek?.includes(kepzettseg.id) && v.fok === fok
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
    formatRange: (range: number | string) => {
        if (range === 'self') {
            return 'önmaga';
        }
        if (range === 'touch') {
            return 'érintés';
        }
        if (typeof range === 'number' || range.match(/[0-9]+/g)) {
            return `${range} m`;
        }
        return range;
    },
    mentodobasok: Mentodobasok,
    kategoriak: MagiaKategoriak
};