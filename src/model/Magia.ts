import { NamedEntity, namedEntityArray } from "./util";

export type GyorsVarazslat = { ke: number } & VarazslatBase;
export type LassuVarazslat = { varazslasIdeje: string } & VarazslatBase;

const VarazslatKepzettsegek = [
    {
        id: 'pap_szfera_altalanos',
        name: 'Általános Szféra',
        kepesseg: 'hit'
    },
    {
        id: 'pap_szfera_termeszet',
        name: 'Természet Szféra',
        kepesseg: 'hit'
    },
    {
        id: 'pap_szfera_elet',
        name: 'Élet Szféra',
        kepesseg: 'hit'
    },
    {
        id: 'pap_szfera_lelek',
        name: 'Lélek Szféra',
        kepesseg: 'hit'
    },
    {
        id: 'pap_szfera_halal',
        name: 'Halál Szféra',
        kepesseg: 'hit'
    },
] as const;

const Mentodobasok = [
    { name: 'Mentál', id: 'mental' },
    { name: 'Asztrál', id: 'asztral' },
    { name: 'Asztrál+Mentál', id: 'asztral+mental' },
    { name: 'Méreg', id: 'mereg' },
    { name: '', id: 'nincs' },
] as const;

export const MagiaKategoriak = [
    { name: 'Kis Arkánum', id: 'kis_arkanum' },
    { name: 'Nagy Arkánum', id: 'nagy_arkanum' },
    { name: 'Litánia', id: 'litania' },
    { name: 'Rituálé', id: 'rituale' },
    { name: 'Általános Papi', id: 'szfera_altalanos' },
    { name: 'Halál', id: 'szfera_halal' },
    { name: 'Élet', id: 'szfera_elet' },
    { name: 'Lélek', id: 'szfera_lelek' },
    { name: 'Természet', id: 'szfera_termeszet' },
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

const PAPI_VARAZSLATOK: Array<Varazslat> = [
    {
        id: 'aldas',
        name: 'Áldás',
        mp: 3,
        idotartam: '1 hónap/szint',
        ke: -10,
        range: 'touch',
        save: 'nincs',
        leiras: 'Ezzel az áldással a pap istene hosszú távú jóindulatát kérheti valakire. Az illetőnek legalább egy istencsaládot kell tisztelnie mint a pap, és a jelleme nem lehet gyökeresen ellentétes a pap istenével. A pap biztosítja istene jóindulatát, mint például ilyenkor könnyebben létrejöhet a gyógyítás varázslat, de más esetekben is haszna lehet. Egy pap megérzi egy emberen (5 méternél közelebb kell lennie), ha a saját istenének az áldása van rajta. E módon tárgyakat is meg lehet áldani. Ekkor a tárgy mágikusnak minősül, és ellenállóbbá válik a hosszú távú romboló környezeti hatásoknak (mint például rozsdásodás), azonban más módon nem válik keményebbé, stabilabbá. Ha a megáldott személy valami olyat cselekszik, ami erősen ellentétes az isten elveivel, akkor az áldás egyszerűen lefoszlik róla. Ez a megkötés tárgyak esetén is igaz, bár ott akkor érvényesül, ha szentségtelen dologra akarják felhasználni azokat.',
        kategoriak: ['kis_arkanum', 'litania', 'szfera_altalanos'],
        kepzettseg: 'pap_szfera_altalanos',
        fok: 1
    },
    {
        id: 'pap_magia_erzekeles',
        name: 'Mágia érzékelése',
        mp: 1,
        idotartam: '3 kör/szint',
        varazslasIdeje: '1 kör',
        range: 20,
        save: 'nincs',
        leiras: 'A varázslattal a pap „láthatja” a mágiát. Az időtartam alatt minden mágikus tárgy illetve varázslat, aminek a leplezése kisebb erősítésű, vörös fénnyel dereng a pap számára.',
        kategoriak: ['kis_arkanum', 'litania', 'szfera_altalanos'],
        kepzettseg: 'pap_szfera_altalanos',
        fok: 1
    },
    {
        id: 'hatalom_szava',
        name: 'A hatalom szava',
        mp: 7,
        idotartam: '1 kör',
        ke: 20,
        range: 30,
        save: 'mental',
        leiras: 'A pap a valódi hatalmát mutathatja meg ezzel a varázslattal. Aki az időtartam alatt ránéz a papra a hatótávon belül és elrontja a mágiaellenálását, az szembesül ezzel. Megismeri tapasztalati szintjét, főbb harcértékei nagyságrendjét - de nem pontos értékét ), és tudatára ébred annak, hogy mi mindenre képes az, menyire áll a pap istene kegyében. A varázslat sohasem hazudik, mindig a valóság szerint mutatja be a mágia végrehajtóját. A Hatalom szavának nincs kényszerítő ereje. Ha mondjuk a támadók, kötekedők a valódi mivoltot megpillantva sem riadnak meg, a papnak más eszközöket kell keresnie megfékezésükre.',
        kategoriak: ['kis_arkanum', 'litania', 'szfera_altalanos'],
        kepzettseg: 'pap_szfera_altalanos',
        fok: 2
    },
    {
        id: 'vizlegzes',
        name: 'Vízlégzés',
        mp: 21,
        ke: -20,
        range: 'self',
        idotartam: '1 perc/szint',
        save: 'nincs',
        leiras: '...',
        kategoriak: ['kis_arkanum', 'litania', 'szfera_termeszet'],
        kepzettseg: 'pap_szfera_termeszet',
        fok: 2
    }
];

const varazslatok = (kepzettseg: typeof VarazslatKepzettsegek[number], fok: number): Array<Varazslat> => Magia.lista.filter(v =>
    v.kepzettseg === kepzettseg.id && v.fok === fok
);

export const Magia = {
    ...namedEntityArray(PAPI_VARAZSLATOK),
    kepzettsegek: () => VarazslatKepzettsegek.map(k => ({
        ...k,
        varazslatok: Array(5)
            .fill(undefined)
            .map((_, i) => varazslatok(k, i + 1))
    })),
    mentodobasok: Mentodobasok,
    kategoriak: MagiaKategoriak
};