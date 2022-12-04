import { FEGYVER_KATEGORIAK, KOZELHARCI_FEGYVEREK } from "./Fegyver";
import { SzintInfo } from "./Karakter";
import { mergeToArray, namedEntityArray } from "./util";

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
    szintleiras: [string, string, string, string, string]
}

export interface SzazalekosKepzettseg {
    fajta: 'szazalekos';
    id: string;
    name: string;
    leiras: string;
}

export type Kepzettseg = NormalKepzettseg | SzazalekosKepzettseg;


const generateFegyverKepzettsegek = (): Array<NormalKepzettseg> => KOZELHARCI_FEGYVEREK
    .filter(f => f.alapFegyver === undefined && f.flags !== 'nagy-pajzs' && f.flags !== 'buckler')
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
            ]
        }
    });

const generateFegyverKategoriaKepzettsegek = (): Array<NormalKepzettseg> => Object.values(FEGYVER_KATEGORIAK).map(k => ({
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
    ]
}));

const TUDOMANYOS_KEPZETTSEGEK: Array<NormalKepzettseg> = [
    {
        fajta: 'normal',
        id: 'sebgyogyitas',
        name: 'Sebgyógyítás',
        tipus: 'tudomanyos',
        kepesseg: 'emlekezet',
        linked: [],
        kp: [5, 10, 15, 20, 30],
        leiras: 'A Sebgyógyítás mind a sebesülések azonnali, csatatéren való ellátását, mind a hosszabb távú ápolást magában foglalja.',
        szintleiras: ['', '', '', '', '']
    },
    {
        fajta: 'normal',
        id: 'herbalizmus',
        name: 'Herbalizmus',
        tipus: 'tudomanyos',
        kepesseg: 'emlekezet',
        linked: [{
            id: 'sebgyogyitas',
            strength: 1 / 2
        }, {
            id: 'meregkeveres',
            strength: 1 / 4
        }],
        kp: [2, 3, 15, 25, 40],
        leiras: 'A Herbalizmus a gyógy- vagy épp mérgező növények ismeretét, azok gyakorlati felhasználását takarja.',
        szintleiras: ['', '', '', '', '']
    },
    {
        fajta: 'normal',
        id: 'meregkeveres',
        name: 'Méregkeverés/Semlegesítés',
        tipus: 'tudomanyos',
        kepesseg: 'emlekezet',
        linked: [],
        kp: [5, 10, 25, 40, 60],
        leiras: 'Ez a képzettség szükséges nemcsak a mérgek előállításához, de a biztonságos kezeléséhez is. A képzetlen méregkeverőnek minden egyes alkalommal, amikor mérget használ, intelligencia-próbát kell dobnia, hogy nem éri-e baleset. A baleset lehet elpocsékolt, szennyezett méreg vagy extrém esetben akár önmaga megmérgezése is.',
        szintleiras: ['', '', '', '', '']
    },
    {
        fajta: 'normal',
        id: 'alkimia',
        name: 'Alkímia',
        tipus: 'tudomanyos',
        kepesseg: 'gondolkodas',
        linked: [{
            id: 'meregkeveres',
            strength: 1 / 2
        }],
        kp: [5, 10, 25, 40, 60],
        leiras: '',
        szintleiras: ['', '', '', '', '']
    },
    {
        fajta: 'normal',
        id: 'elettan',
        name: 'Élettan',
        tipus: 'tudomanyos',
        kepesseg: 'emlekezet',
        linked: [{
            id: 'sebgyogyitas',
            strength: 1 / 2
        }],
        kp: [6, 10, 20, 35, 50],
        leiras: '',
        szintleiras: ['', '', '', '', '']
    }
];

const HARCMODOR_BASE: Pick<NormalKepzettseg, 'kp' | 'tipus' | 'linked' | 'fajta'> = {
    fajta: 'normal',
    kp: [5, 10, 20, 30, 40],
    tipus: 'harcmodor',
    linked: []
};
export const HARCMODOROK: Array<NormalKepzettseg> = [
    {
        ...HARCMODOR_BASE,
        name: 'Harcmodor (Nagypajzsos harc)',
        id: 'harcmodor:pajzs',
        kepesseg: 'mozgaskoordinacio',
        leiras: `Ez a harcmodor egykezes fegyver és karra szíjazott, közepes vagy nagy pajzzsal való harchoz szükséges.
        E képzettség nélkül a pajzs leginkább csak hátrány harc közben, bár valamennyi védelmet biztosít.
        Ez a gyakorlatban annyit tesz, hogy a képzetlen karakter a pajzs VÉ-jét ugyan megkapja, de a fegyverét nem,
        továbbá a fegyverével való jártassága 2 fokkal alacsonyabbnak számít a normálnál.`,
        szintleiras: [
            `A képzettség 1. fokán már kevésbé van útban a pajzs, ezért a karakter a fegyver VÉ-jét továbbra sem kapja meg,
            viszont a fegyverével való jártassága csak 1 fokkal romlik.`,
            `A képzettség 2. fokán már a fegyver és a pajzs mozgása jól koordinált, bár a karakter továbbra is csak a pajzsot
            használja védekezésre, ezért a fegyver VÉ-je nem adódik hozzá a teljes VÉ-hez, de egyéb levonások nem sújtják.`,
            `A képzettség 3. fokán a pajzzsal való védekezés már ösztönös, így a karakter a fegyverével ugyanúgy támad és
            védekezik, mint pajzs nélkül. A karakter mind a pajzs, mind a fegyver VÉ-jét hozzáadhatja a VÉ-jéhez`,
            `A képzettség 4. fokán a pajzs már nem akadályoz a mozgásban, így MGT-je 0, és a karakter támadni is képes a
            pajzzsal, körönként egyszer.`,
            `A képzettség 5. fokán a pajzs a karakter óvó karjának kiterjesztésévé válik, így önmagán kívül még egy közelálló
            bajtársat is képes védeni vele (tehát ő is megkapja a pajzs VÉ-jét, ha mindketten ugyanazon ellenfél ellen küzdenek)`,
        ]
    },
    {
        ...HARCMODOR_BASE,
        name: 'Harcmodor (Kispajzsos harc)',
        id: 'harcmodor:kispajzs',
        kepesseg: 'reflex',
        leiras: `Ez a harcmodor egy egy- vagy másfélkezes fegyvert és egy kézben fogott kicsi, kerek pajzzsal való harcot jelenti.
        Magasabb fokokon a karakter egy tőrt is foghat a pajzsos kezében, és támadhat vele. Ehhez nem kell képzettnek lenni a tőr
        használatában, hiszen teljesen más technikáról van szó. Fontos megjegyezni, hogy a tőr VÉ-je semmilyen esetben nem adódik
        hozzá a karakter VÉ-jéhez.
        E képzettség nélkül a pajzs leginkább csak hátrány harc közben, VÉ-je ugyan beleszámít a karakter VÉ-jébe, de a fegyverrel
        csak 2 fokkal alacsonyabban tud harcolni.`,
        szintleiras: [
            `A képzettség 1. fokán a karakter már fegyverrel támadás közben is tud a pajzzsal védekezni, a fegyverrel viszont
            továbbra sem, így a karakter VÉ-jéhez csak a pajzs VÉ-je járul, a fegyveré nem.`,
            `A képzettség 2. fokán már mind a pajzs, mind a fegyver VÉ-je hozzáadható a karakter VÉ-jéhez`,
            `A képzettség 3. fokán a pajzs alatt/alkarvédőhöz szorított tőrrel is tud támadni a karakter, körönként egyszer`,
            `A képzettség 4. fokán a tőrrel körönként már kétszer is lehet támadni.`,
            `A képzettség 5. fokán a két kéz teljes harmóniában mozog, mind a fő fegyverrel, mind a tőrrel leadott támadásokhoz
            hozzáadható mindkét fegyver TÉ-je.`,
        ]
    },
    {
        ...HARCMODOR_BASE,
        name: 'Harcmodor (Kétkezes fegyver)',
        id: 'harcmodor:ketkezes',
        kepesseg: 'izom',
        leiras: `A kétkezes fegyverek lassúnak és nehézkesnek tűnnek a felületes szemlélő számára, ami jórészt persze igaz is,
        ugyanakkor avatott forgatójuk jópár trükköt elsajátíthat, amelyekkel ez ellensúlyozható, sőt helyenként előnnyé
        kovácsolható. Minden fok egy újabb manőverrel gazdagítja a karakter trükktárát.`,
        szintleiras: [
            `A karakter egy ellenfelet tud távol tartani magától; amennyiben az mégis közelíteni próbál,
            egy soron kívüli támadás intézhető ellene. A manőver nem használható több ellenfél ellen, és addig nem
            ismételhető meg, amíg az ellenfél valamilyen módon ismét nem kerül távolabb.`,
            `A fegyvert rövidebbre fogva kisebb a karakter hátrányt szenved el Belharc ellen (mintha egykezes hosszú fegyver
            lenne a kezében), és szűkebb területen is tud harcolni a következő módosítókkal: KÉ: +5, TÉ: -5, VÉ: -5,
            sebzés feleződik.`,
            `A kétkezes harcmodort ezen a fokon űző karakter egy jól irányzott csapással vagy akasztással kibillentheti ellenfelét
            az egyensúlyából. Ehhez először sikeres támadó dobást kell tenni, és ha az ellenfél ezt követően elvéti
            ügyességpróbáját, földre kerül. Ugyanilyen módon az ellenfél közepes vagy nagy pajzsa is kirántható/üthető egy körre.`,
            `Mint az 1. fok, de tetszőleges számú ellenfél ellen alkalmazható, akár úgy is, ha a karaktert teljesen
            körbeveszik.`,
            `A kétkezes harcmodor magasiskolája: a karakter két, nem közvetlenül egymás mellett álló ellenfél ellen felváltva
            tud támadni, összesen duplaannyi támadást leadva, mint amennyit a fegyver sebessége engedne.`,
        ]
    },
    {
        ...HARCMODOR_BASE,
        name: 'Harcmodor (Két fegyver)',
        id: 'harcmodor:ketfegyver',
        kepesseg: 'mozgaskoordinacio',
        leiras: `E képzettség híján a két fegyverrel harcolni kívánó karakter igencsak nehéz helyzetben van, ami annyit tesz, hogy mindkét fegyverével
        való jártassága hárommal alacsonyabbnak számít. A fő fegyverrel annyiszor támadhat körönként, amennyit támadna, ha nem fogna másik fegyvert a
        kezébe, de a másodlagos fegyverrel csak legfeljebb körönként egyszer. Fontos továbbá, hogy bármennyire is képzett ebben a harcmodorban, a
        VÉ-jébe csak egy fegyver VÉ-je számít bele (ugyanakkor bármilyen levonás is csak egyszeresen számít), mégpedig azé, amelyiknek a VÉ-je magasabb.`,
        szintleiras: [
            `A karakter az elsődleges fegyverével való jártassága 1 fokkal alacsonyabbnak számít, a másodlagos fegyvert még mindig 3 fokkal alacsonyabb
            szinten forgatja.`,
            `A karakter az elsődleges fegyverével már akadálytalanul tud harcolni, a másodlagos fegyverrel való jártassága 1 fokkal alacsonyabbnak
            számít, és továbbra is csak egyszer támadhat vele.`,
            `A kétfegyveres harcban ezen a fokon képzett karakter már levonások nélkül harcolhat mindkét fegyverével, de a másodlagos fegyverével
            továbbra is csak egyszer támadhat`,
            `A karakter ezen a fokon már mindkét fegyverével annyiszor támadhat, amennyi támadást az adott fegyverrel egyébként leadhatna.`,
            `A kétfegyveres harc magasiskolája: a karakter két fegyvere tökéletes szinkronban mozog, támadásaihoz mindkét fegyver támadó értéke
            hozzáadódik.`,
        ]
    },
    {
        ...HARCMODOR_BASE,
        name: 'Harcmodor (Shien-su)',
        id: 'harcmodor:shiensu',
        kepesseg: 'osszpontositas',
        leiras: `A Shien-su a kardmúvészek által kidolgozott kétfegyveres technika, amely a Slan-kard és a Slan-tőr teljes
        harmóniában való mozgását szolgálja. Fontos megjegyezni, hogy Chi-harcban minden esetben az ott feltüntetett számú
        támadást lehet csak leadni a két fegyverrel összesen, nem jár több támadás, akármennyire is képzett e 
        harcmodorban a kardművész. A képzettség hiányában a karaktert ugyanazok a levonások sújtják, mint a kétfegyveres harcnál
        általában`,
        szintleiras: [
            `A karakter levonások nélkül forgathatja egyszerre a kardot és a tőrt, de támadni és védekezni is csak a karddal tud,
            a tőr mindig a kardművész karddal ellentétes oldala fele mozog, így semlegesítve bármilyen túlerőből adódó levonást.`,
            `A kardművész ezen a fokon már védekezni is tud a tőrrel, a tőr VÉ-jét hozzáadhatja a teljes VÉ-jéhez.`,
            `A kardművész ezen a fokon már támadni is tud a Slan tőrrel.`,
            `A tőr és a kard teljes harmóniában mozog, mindkét fegyver TÉ-je hozzáadódik minden támadáshoz.`,
            `A kardművész immár a fegyverhasználat fokából adódó bónuszokat is hozzáadhatja a másik fegyveréhez.`,
        ]
    },
    {
        ...HARCMODOR_BASE,
        name: 'Harcmodor (Egykezes fegyver)',
        id: 'harcmodor:egykezes',
        kepesseg: 'mozgaskoordinacio',
        leiras: `Természetesen egykezes fegyver használatához elég megtanulni a vonatkozó képzettséget, ez a harcmodor kizárólag
        azoknak szól, akik ki is akarják használni a szabadon maradó kézből adódó előnyöket.`,
        szintleiras: [
            `A karakter levonások nélkül hajthat végre egyszerűbb feladatokat a szabad kezével, pl. gyógyital elfogyasztása,
            ajtónyitás, vassulyom szórása.`,
            `A karakter homokot vagy egyéb irritáló port szórhat ellenfele arcába. Az ellenfél reflexpróbát kénytelen dobni
            (ha meglepetésként éri a támadás, -50-nel), különben 1 körig a harc vakon módosítói érvényesek rá.`,
            `Rejtett fegyver előrántás: a karakter egy megfelelően előkészített és álcázott kisméretű közelharci vagy dobófegyvert
            előrántva plusz egy támadást adhat le. Ha még nem alkalmazta ezt a manővert a csata során, jó eséllyel a meglepetés
            módosítói járnak a támadásra, de minimum +10 TÉ. Természetesen ha pl. tőrt rántott a karakter, dönthet úgy, hogy a
            következő körtől kétfegyveres harcot folytat.`,
            `A karakter a szabad kezével tudja manipulálni az ellenfél ütéstávolságát: amennyiben ellenfele belharcot kezdeményezni,
            külön próba nélkül is el tudja tolni magával, vagy fordítva, a karakter "beránthatja" ellenfelét belharcba megelőző támadás esélye
            nélkül `,
            `A karakter ezzel a manőverrel egykezes fegyvert forgató ellenfelet fegyverezhet le. Ehhez az kell, hogy megnyerje a
            kezdeményezést és feladjon egy támadást. Ha ezután az ellenfél ütését sikerül hárítania, reflex ellenpróbára kerül sor,
            amennyiben ez sikeres, az ellenfél elejti fegyverét.`,
        ]
    }

];

export const HARCI_KEPZETTSEGEK: Array<NormalKepzettseg> = [
    {
        fajta: 'normal',
        id: 'vertviselet',
        name: 'Vértviselet',
        tipus: 'harci',
        kepesseg: 'allokepesseg',
        linked: [],
        kp: [3, 10, 20, 40, 50],
        leiras: 'Páncélt hatékonyan viselni csak gyakorlással lehet. Minden egyes fok 1-gyel cs0kkenti a páncél MGT-jét',
        szintleiras: ['-1 MGT', '-2 MGT', '-3 MGT', '-4 MGT', '-5 MGT']
    },
    {
        fajta: 'normal',
        id: 'birkozas',
        name: 'Birkózás',
        tipus: 'harci',
        kepesseg: 'izom',
        linked: [],
        kp: [3, 10, 20, 40, 50],
        leiras: '',
        szintleiras: ['', '', '', '', '']
    },
    {
        fajta: 'normal',
        id: 'fegyvertores',
        name: 'Fegyvertörés',
        tipus: 'harci',
        kepesseg: 'izom',
        linked: [],
        kp: [3, 10, 20, 40, 50],
        leiras: '',
        szintleiras: ['', '', '', '', '']
    },
    {
        fajta: 'normal',
        id: 'vakharc',
        name: 'Vakharc',
        tipus: 'harci',
        kepesseg: 'erzekeles',
        linked: [],
        kp: [3, 10, 20, 40, 50],
        leiras: '',
        szintleiras: ['', '', '', '', '']
    },
];

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

export const ALTALANOS_KEPZETTSEGEK: Array<NormalKepzettseg> = [
    {
        fajta: 'normal',
        id: 'uszas',
        name: 'Úszás',
        tipus: 'vilagi',
        kepesseg: 'allokepesseg',
        linked: [],
        kp: [3, 10, 20, 40, 50],
        leiras: '',
        szintleiras: ['', '', '', '', '']
    },
    {
        fajta: 'normal',
        id: 'futas',
        name: 'Futás',
        tipus: 'vilagi',
        kepesseg: 'allokepesseg',
        linked: [],
        kp: [3, 10, 20, 40, 50],
        leiras: '',
        szintleiras: ['', '', '', '', '']
    },
    {
        fajta: 'normal',
        id: 'lovaglas',
        name: 'Lovaglás',
        tipus: 'vilagi',
        kepesseg: 'mozgaskoordinacio',
        linked: [],
        kp: [3, 10, 20, 40, 50],
        leiras: '',
        szintleiras: ['', '', '', '', '']
    },
    {
        fajta: 'normal',
        id: 'ertekbecsles',
        name: 'Értékbecslés',
        tipus: 'vilagi',
        kepesseg: 'erzekeles',
        linked: [],
        kp: [3, 10, 20, 40, 50],
        leiras: '',
        szintleiras: ['', '', '', '', '']
    },
    {
        fajta: 'normal',
        id: 'kocsmai_verekedes',
        name: 'Kocsmai verekedés',
        tipus: 'vilagi',
        kepesseg: 'reflex',
        linked: [],
        kp: [3, 10, 20, 40, 50],
        leiras: '',
        szintleiras: ['', '', '', '', '']
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
        szintleiras: ['', '', '', '', '']
    }
    ));
}

const KEPZETTSEGEK: Array<Kepzettseg> = [
    ...generateFegyverKategoriaKepzettsegek(),
    ...generateFegyverKepzettsegek(),
    ...TUDOMANYOS_KEPZETTSEGEK,
    ...HARCI_KEPZETTSEGEK,
    ...ALTALANOS_KEPZETTSEGEK,
    ...HARCMODOROK,
    ...SZAZALEKOS_KEPZETTSEGEK,
    ...generateNyelvKepzettsegek()
];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Kepzettseg = {
    ...namedEntityArray(KEPZETTSEGEK),
    kpFokhoz: (kepessegek: Record<string, number>, kepzettseg: NormalKepzettseg, fok: number): number => {
        const kepesseg = kepessegek[kepzettseg.kepesseg];
        return Math.ceil(kepzettseg.kp[fok - 1] * KP_SZORZOK[kepesseg]);
    },
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
