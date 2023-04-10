import { Fegyver, FEGYVER_KATEGORIAK, NYILPUSKA_KATEGORIA } from "./Fegyver";
import { Karakter, SzintInfo } from "./Karakter";
import { arrayName, mergeToArray, namedEntityArray } from "./util";
import taroltKepzettsegek from '../data/kepzettsegek.json';
import { EgyebLofegyver, Lofegyver } from "./Lofegyver";
import { Magia, MagiaKategoriak } from "./Magia";
import { Harcmuveszet } from "./Harcmuveszet";
import { Pszi } from "./Pszi";
import { KarakterCalcResult } from "./KarakterCalculator";

export const KepzettsegTipus = [
    {
        id: 'fegyver',
        name: 'Fegyver'
    },
    {
        id: 'harcmuveszet',
        name: 'Harcművészet'
    },
    {
        id: 'fegyverkategoria',
        name: 'Fegyverkategória'
    },
    {
        id: 'tudomanyos',
        name: 'Tudományos'
    },
    {
        id: 'harcmodor',
        name: 'Harcmodor'
    },
    {
        id: 'harci',
        name: 'Harci'
    },
    {
        id: 'vilagi',
        name: 'Világi'
    },
    {
        id: 'alvilagi',
        name: 'Alvilági'
    },
    {
        id: 'szakma',
        name: 'Szakma'
    },
    {
        id: 'magia',
        name: 'Mágia'
    },
    {
        id: 'nyelv',
        name: 'Nyelv'
    },
    {
        id: 'osi_nyelv',
        name: 'Ősi nyelv'
    },
    {
        id: 'pszi',
        name: 'Pszi'
    }
] as const;

interface KepzettsegLink {
    id: string;
    strength: number;
}

export interface NormalKepzettseg {
    fajta: 'normal';
    id: string;
    name: string;
    tipus: typeof KepzettsegTipus[number]['id'];
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

export const FEGYVER_KPK: [number, number, number, number, number] = [1, 3, 10, 25, 40];
export const FEGYVER_SZINTLEIRASOK: [string, string, string, string, string] = [
    'KÉ: -5, TÉ: -5, VÉ: -10',
    'KÉ: 0, TÉ: 0, VÉ: 0',
    'KÉ: +2, TÉ: +5, VÉ: +5',
    'KÉ: +5, TÉ: +10, VÉ: +10',
    'KÉ: +10, TÉ: +20, VÉ: +20'
];

const generateFegyverKepzettsegek = (): Array<NormalKepzettseg> => Fegyver.lista
    .filter(f => f.flags !== 'nagy-pajzs' && f.flags !== 'buckler' && f.alternativKepzettseg === undefined)
    .map(f => {
        const linked: Array<KepzettsegLink> = f.kategoria ? [{ id: `fegyverkat:${f.kategoria.id}`, strength: 1 }] : [];
        return {
            fajta: 'normal',
            id: `fegyver:${f.id}`,
            name: `Fegyver (${f.name})`,
            tipus: 'fegyver',
            kepesseg: (f.kategoria?.kepesseg ?? f.kepesseg) as string,
            linked: linked,
            kp: FEGYVER_KPK,
            leiras: 'Egy adott fegyverrel való harc. A képzetlen fegyverhasználat módosítói: KÉ: -10, TÉ: -25, VÉ: -20',
            szintleiras: FEGYVER_SZINTLEIRASOK,
            __generated: true
        }
    });

const generateLoFegyverKepzettsegek = (): Array<NormalKepzettseg> => [...Lofegyver.lista.filter(l => l.tipus !== 'ij'), { tipus: 'ij', id: 'ij', name: 'Íj' }]
    .map(f => {
        const linked: Array<KepzettsegLink> = f.tipus === 'nyilpuska' ? [{ id: `fegyverkat:${NYILPUSKA_KATEGORIA.id}`, strength: 1 }] : [];
        const kepesseg = f.tipus === 'ij' ? 'mozgaskoordinacio' : (f.tipus === 'nyilpuska' ? NYILPUSKA_KATEGORIA.kepesseg : (f as EgyebLofegyver).kepesseg);
        return {
            fajta: 'normal',
            id: `fegyver:${f.id}`,
            name: `Fegyver (${f.name})`,
            tipus: 'fegyver',
            kepesseg,
            linked,
            kp: FEGYVER_KPK,
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

const generateMagiaKepzettsegek = (): Array<NormalKepzettseg> => Magia.kepzettsegek().map(k => ({
    fajta: 'normal',
    id: k.id,
    name: `Mágia (${k.name})`,
    tipus: 'magia',
    kepesseg: k.kepesseg,
    linked: [],
    kp: [2, 7, 13, 21, 34],
    leiras: `*A mágia ${k.name} iskolájának ismerete. Minden fok további +5-öt ad a kezdeményezésre.*

${k.leiras}
`,
    szintleiras: k.varazslatok.map(lista => lista.map(v => `- [${v.name}](entity:${v.id}) ${v.kategoriak ? '(' + v.kategoriak.map(k => arrayName(MagiaKategoriak, k)).join(', ') + ')' : ''}`).join('\n')) as any,
    __generated: true
}));

const SZAZALEKOS_KEPZETTSEGEK: Array<SzazalekosKepzettseg> = [
    {
        fajta: 'szazalekos',
        id: 'maszas',
        name: 'Mászás',
        leiras: `
A Mászás képzettség a fák, falak megmászásában való különleges jártasságot jelenti. Azt, amikor a karakter fürgén és biztosan kúszik fel az átlagember számára megmászhatatlannak ítélt meredélyeken is. Az igazán gyakorlott falmászók hihetetlenül sima felületeken is képesek kapaszkodót, támaszt találni. Nem jelentenek számukra akadályt a várak, lakóházak falai, a függőleges, vagy akár kifelé dőlő sziklák sem.

A Mászás képzettségben való Százalékos Jártasság értéke olyan falra, fára vonatkozik, melyet nagy szerencsével egy ügyes, de gyakorlatlan karakter is képes lenne megmászni.
Ilyenkor módosító tényező mincs. Ha a fal nehezebben vagy könyebben lekűzhető, akkor a KM a karakter hátrányára vagy előnyére százalékot vonhat le vagy adhat hozzá a jártassághoz. Átlagos nehézségűnek minősül a függőleges, egymásra rakott dinnyényi kövekből halmozott várfal, ahol a kiálló kövek, és a repedések sűrű és könnyű kapaszkodót kínálnak.

A Képzettségpróbát minden megtett 25 méter (avagy 3 perc tétlen kapaszkodás) után meg kell ismételni. Így egy 50 méter magas várfal lekűzdése két sikeres Képzettségpróbát is igényel.

A Mászás képzettség leginkább a tolvajok sajátja, de sokan űzik ilyen vagy olyan - akár még az övéknél is magasabb - szinten.

| Felület | Megtett távolság / kör | Képzettség módosító |
|---------|------------------------|---------------------|
|csúszós | 0.1 | -80 |
|teljesen sima | 0.1 | -50 |
|repedezett | 0.2 | -15 |
|durva | 0.4 | 0 |
|kiszögelléses | 0.5 | +5 |
|ferde fal | 1 | +15 |
|kötél | 1.5 | +40 |
|fa| 2 | +30 |
|csomózott mászókötél | 2.5 | +50 |

Folyamatosan annyi percen át képes mászni a karakter, amennyi az Állóképessége. Aki mászik, kiszolgáltatott helyzetbe kerül. Ekkor a [Harc helyhez kötve](entity:szabaly_harci_helyzet) szabályai vonatkoznak rá.
`,
    },
    {
        fajta: 'szazalekos',
        id: 'eses',
        name: 'Esés',
        leiras: `
A karakter ügyesen kigurulja, tompítja az eséseket. Ha nagyon magasról zuhan, érti a módját, hogy a keze ügyébe akadó rögzített tágyak segítségével hogyan fékezze, vagy akár állítsa meg a zuhanást.

Az Esés képzettségből való előnyök kihasználásához a karakternek előbb sikeres Képzettségpróbát kell tennie. Az Esés avatatlan nagymesterei mindenképpen a harcművészek, ám a képzettség mindenki számára tanulható.

Regéket mesélnek olyan hareművészekről, akik egy kútba zuhanva, a kövek összeillesztésénél keletkező résekbe bele-belekapaszkodva képesek voltak fékezni, sőt, kis idő múltán akár a falhoz tapadva meg is állítani az esést.

A képzettség általános felhasználása azonban a harc során való esésekből származó ütések tompítása. Ez annyit tesz, hogy ha a karakter harc közben bármilyen okból felbukik, és képzettségpróbája sikeres, azonnal talpra szökkenhet, anélkül, hogy akár egy támadást is elveszítene.

[Zuhanás](entity:szabaly_zuhanas) esetén a karakter megpróbálhatja fékezni vagy legalább tompítani az esést. Sikeres képzettségpróba esetén így felezheti a zuhanásból adódó sebzést, ám ha próbája több mint 50-nel sikerül, akkor teljesen sikerül megállitania az esést. (Ez utóbbi természetesen csak akkor érvényes, ha ilyesmi egyáltalán fizikailag lehetséges, ha a karakter közelében nincsenek tárgyak, amikbe belekapaszkodhatna, vagy más módon fékezze esését, úgy csak a tompításban bízhat.)
        `,
    },
    {
        fajta: 'szazalekos',
        id: 'ugras',
        name: 'Ugrás',
        leiras: `
A karakter ezen képzettség segítségével képes mindenféle akrobatikus manővereket végrehajtani, akár harc közben is. Sikeres képzettségpróba esetén pl. egy pillanat alatt el tud távolodni ellenfelétől, vagy épp mögé kerülhet anélkül, hogy annak esélye lenne kihasználni a helyzetet és közbetámadni.

Szimpla távol- vagy magasugrásban annyira nem segít sokat, mivel az elsősorban a karakter erején múlik, bár a technika, amit ez a képzettség biztosít, olyan ugrásokat is lehetővé tesz, amelyek enélkül jó eséllyel sérüléssel végződnének. (Pl. távolugrás előreszaltóval, ami bizony hatékonyabb, mint a szimpla ugrás)
        `,
    },
    {
        fajta: 'szazalekos',
        id: 'zarnyitas',
        name: 'Zárnyitás',
        leiras: `
Zárt ajtókkal, lakatokkal gyakran szembekerül a kalandozó - hiszen számtalanszor tér be mások  házába, kincseskamrájába meghívó nélkül. Az ajtók beszakítása, a lakatok leverése nem mindig  célravezető, mivel nemkívánatos zajjal jár. A zárakkal egyidős az álkulcsok alkalmazásának  tudománya.  

A Zárnyitásban járatos karakter ismeri a zárak szerkezetét, működési mechanizmusát. Álkulcs  készlete - vagy jobb híján egy darab drót - segítségével csodákra képes. A sikeres zárnyitás esélyét  növelheti a professzionista felszerelés és csökkenti a zár bonyolultsága, összetettsége,  hozzáférhetetlensége, netán egyedisége.

Ugyanezzel a képzettséggel lehet megkísérelni mechanikus csapdák elsütőszerkezetének hatástalanítását, vagy működésbe hozását.
`,
    },
    {
        fajta: 'szazalekos',
        id: 'lopozas',
        name: 'Lopózás',
        leiras: `
A Lopózás Képzettségben járatos karakter képes csendben haladni. Sem léptei, sem egyéb  mozdulatai nem vernek neszt. Minél képzettebb, annál "nehezebb" talajon teheti. Nagy segítségére  lehet ez az észrevétlen behatolásban, a meglepetésszerű támadásban. Mindezen túl a Képzettség  ismerete még a haladás közbeni rejtőzködés képességét is jelenti, mikor a lopózó kihasználja a  terep kínálta tárgyakat, azok takarásába, netán árnyékba húzódva közelíti meg célpontját.  

A Lopózás mesterei a könnyűléptű elfek, valamint a tolvajok és a fejvadászok. Ők azok is, akiktől  a karakter a legmagasabb szinten sajátíthatja el a Képzettséget.  
        `,
    },
    {
        fajta: 'szazalekos',
        id: 'rejtozes',
        name: 'Rejtőzés',
        leiras: `
A Rejtőzés a félhomályban, vagy tárgyak takarásában való mozdulatlan meghúzódás tudományát jelenti. A képzett karakter képes felfedezni és kihasználni a fényviszonyok, az emberi gondolkodás  hiányosságai kínálta legalkalmasabb búvóhelyeket.  

A Rejtőzés Képzettség a Lopózáshoz hasonlóan a tolvajok és fejvadászok sajátja, igazi mesterei képesek szinte egybeolvadni a tereptárgyakkal, akár még fényes nappal is.  
        `,
    },
    {
        fajta: 'szazalekos',
        id: 'zsebmetszes',
        name: 'Zsebmetszes',
        leiras: `
Ynev világán is akadnak emberek, akik mások pénzének elcsenéséből kívánnak meggazdagodni. A  tolvajláson és az erőszakos rabláson túl azonban akadnak jóval finomabb módszerek is. Ilyen a  Zsebmetszés. Általában tömegben, a kínálkozó alkalmat kihasználva űzik. A tolvaj belenyúl  áldozata zsebébe vagy erszényébe, netán felmetszi azt, és a benne található javakat a magáévá  teszi.  

Ahhoz, hogy sikerrel járjon, Képzettségpróbát kell tennie. Természetesen léteznek bizonyos  könnyítő és nehezítő körülmények, melyekkel számolni kell - ez azonban a KM feladata és  jogköre. 

De nem kell feltétlenül rosszra gondolni, ugyanezzel a képzettséggel meg lehet próbálkozni bármilyen, kézügyességet és figyelemelterelést kívánó manőverrel.
        `,
    },
    {
        fajta: 'szazalekos',
        id: 'csapdafelfedezes',
        name: 'Csapdafelfedezés',
        leiras: `
Az elrejtett csapdák felfedezése rendkívül hasznos tudomány. Sok kellemetlenségtől óvhatja meg a karaktert és társait. Természetesen a tevékenység nem tudatalatti, csak akkor alkalmazható, ha a  karakter előre szól. Nem is nevezhető gyorsnak, hiszen a gyanús terület aprólékos átvizsgálásából áll. De egy kalandozónak nemcsak csapdákra kell számítania egy idegen helyen.  

Várakba, kastélyokba, de olykor még városi házakba is építenek olyan titkos folyosókat, melyek létéről, bejáratáról a ház urának és bizalmasainak kivételével senki sem tud. A lakók, ha bajba kerülnek, ezeken észrevétlenül elhagyhatják az épületet, vagy meghúzódhatnak a rejtett helyiségekben. Gyakran efféle folyosók vezetnek a kincseskamrákba, a titkos laboratóriumokba vagy földalatti tanácskozó termekbe. Ugyanide soroljuk még a falakba nyíló titkos kamrákat és fülkéket, a padlódeszkák alatt vagy a mennyezetet borító rozetták mögött meghúzódó rekeszeket.

A Csapdakeresésben járatos karakternek esélye van arra, hogy meglelje a csapdákat, a rejtett helyiségek bejáratát, ha létüket sejti, de pontos helyükről nem tud. A képesség gyakorlásához a legtöbb esetben a karakternek be kell jelentenie kutatási szándékát. Ilyenkor a falat kopogtatja döngő szakaszokat keresve, rések, repedések után vizsgálódik, vizsgálja a padlót esetleges csapdabeindító mechanizmusok után kutatva, stb. A Képzettségpróbán pozitívan befolyásolja, ha a karakter megmondja, pontosan mit és hol keres. Minél pontosabb meghatározást ad a keresés mikéntjéről, annál nagyobb az esélye a sikerre - persze csak abban az esetben, ha a csapda, vagy a titkos bejárat valóban a gyanúnak megfelelő természetű. A siker esélye annál kisebb, minél jobban álcázták a csapdát vagy titkosajtót, minél szokatlanabb módon helyezték el.

Bizonyos esetekben akkor is adódik lehetőség egy titkosajtó észlelésére, ha a karakter nem jelenti be kutatási szándékát. Ilyenkor persze nem magát az ajtót leli meg, csak gyanúja támad létéről. Például indokolatlan huzatot érezhet, szemet szúrhatnak neki bizonyos jellegezetes építészeti megoldások. Ez a jelenség elvileg előfordulhat csapdák esetében is, de gyakoribb az, hogy a csapdát csak akkor észlelik a gyanútlan halandók, ha már működésbe lépett. Ha az adott helyiségben ilyesmi előfordul, a KM titokban Képzettségpróbát dob a karakter helyett, s csak akkor szól neki, ha a próba sikeres. Ilyen esetekben még a karakternek is dobnia kell, ha meg is kívánja lelni az ajtót ñ esetleg némi pozitív módosítóval.  

A csapda vagy titkosajtó felfedezése nem egyenlő kinyitásával. A megtalált csapdát még hatástalanítani kell. A titkos ajtóknál olykor egyszerű retesz, zár, netán ravasz mechanizmus gondoskodik a túloldali helyiség biztonságáról. Ha a zár nem nyitható néhány egyszerű mozdulattal, ha a karakter nem rendelkezik a beleillő kulccsal, vagy a mechanizmus  működtetéséhez szükséges ismerettel, akkor a Zárnyitás Képzettség alkalmazandó, de esetenként a fejsze is hasznos lehet.
`,
    },
];

const NYELVEK = ['pyarroni', 'dzsad', 'erv', 'kráni', 'shadoni', 'gorviki', 'toroni', 'aszisz', 'elf', 'ork', 'goblin', 'törp', 'gnóm', 'niarei', 'enoszukei', 'kahrei', 'tiadlani', 'korg'];

const OSI_NYELVEK = ['amund', 'aquir', 'kyr', 'godoni', 'dzsenn'];

const generateNyelvKepzettsegek: () => Array<NormalKepzettseg> = () => {
    return NYELVEK.map(ny => ({
        fajta: 'normal',
        id: `nyelv:${ny}`,
        name: `Nyelvtudás (${ny})`,
        tipus: 'nyelv',
        kepesseg: 'emlekezet',
        linked: [],
        kp: [1, 1, 2, 3, 21],
        leiras: 'Ez a képzettség elsősorban az adott nyelven való beszéd és a beszéd értésének mértékét jelzi. Ha viszont a karakter képzett az [Írás/Olvasás](entity:iras_olvasas)ban, akkor automatikusan tud írni is ezen a nyelven.',
        szintleiras: [
            'A karakter pár tucat fontosabb szót ismer, amivel úgy-ahogy meg tudja értetni magát.',
            'A karakter már lassan és tagolva, de viszonylag magabiztosan beszéli a nyelvet.',
            'A karakter folyékonyan, mégha nem is túl választékosan beszéli a nyelvet.',
            'A karakter anyanyelvi szinten beszéli a nyelvet, idegen nyelv esetén halványan felismerhető akcentussal.',
            'A karakter ismeri az adott nyelv összes nyelvjárását, és képes azokat meggyőzően utánozni.'
        ],
        __generated: true
    }));
}

const generateOsiNyelvKepzettsegek: () => Array<NormalKepzettseg> = () => {
    return OSI_NYELVEK.map(ny => ({
        fajta: 'normal',
        id: `osi_nyelv:${ny}`,
        name: `Ősi nyelv (${ny})`,
        tipus: 'osi_nyelv',
        kepesseg: 'emlekezet',
        linked: [
            {
                id: 'legendaismeret',
                strength: 0.5
            }
        ],
        kp: [8, 12, 21, 27, 39],
        leiras: '',
        szintleiras: ['', '', '', '', ''],
        __generated: true
    }));
}


const KEPZETTSEGEK: Array<Kepzettseg> = [
    ...taroltKepzettsegek as Array<Kepzettseg>,
    ...generateFegyverKategoriaKepzettsegek(),
    ...generateFegyverKepzettsegek(),
    ...Harcmuveszet.kepzettsegek,
    ...generateLoFegyverKepzettsegek(),
    ...generateNyelvKepzettsegek(),
    ...generateMagiaKepzettsegek(),
    Magia.hasznalatKepzettseg,
    ...generateOsiNyelvKepzettsegek(),
    ...Pszi.kepzettsegek(),
    ...SZAZALEKOS_KEPZETTSEGEK,
]
    .sort((a, b) => a.name.localeCompare(b.name))
    .sort((a, b) => a.fajta.localeCompare(b.fajta));



// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Kepzettseg = {
    ...namedEntityArray(KEPZETTSEGEK),
    kpFokhoz: (kepessegek: Record<string, number>, kepzettseg: NormalKepzettseg, fok: number): number => {
        const kepesseg = kepessegek[kepzettseg.kepesseg];
        try {
            return Math.ceil(kepzettseg.kp[fok - 1] * KP_SZORZOK[kepesseg]);
        } catch (e) {
            return 0;
        }
    },
    __taroltLista: () => Kepzettseg.lista.filter(k => k.fajta === 'normal' && !k.__generated),
    keres: (prefix: string): Array<Kepzettseg> => Kepzettseg.lista.filter(k => k.id.startsWith(prefix)),
    pluszKp: (
        calc: KarakterCalcResult,
        karakter: Karakter,
        kepzettseg: Kepzettseg,
        pluszKp: number,
        kasztKp: boolean,
        transitive: boolean
    ): void => {
        if (kepzettseg.fajta === 'normal') {
            const kepessegek = calc.kepessegek;
            const osszes = calc.kepzettsegek.normal;
            const current = karakter.szint.at(-1)!.kepzettsegek.normal;
            let { fok = 0, kp = 0 } = osszes.find(k => k.kepzettseg.id === kepzettseg.id) ?? {};
            kp += pluszKp;
            while (fok < 5 && kp >= Kepzettseg.kpFokhoz(kepessegek, kepzettseg, (fok + 1) as any)) {
                kp -= Kepzettseg.kpFokhoz(kepessegek, kepzettseg, (fok + 1) as any);
                fok++;
            }
            mergeToArray(current, { kepzettseg, kp, fok }, i => i.kepzettseg.id);
            if (transitive) {
                karakter[kasztKp ? 'kasztKp' : 'kp'] -= pluszKp;
                kepzettseg.linked?.forEach(l => Kepzettseg.pluszKp(calc, karakter, Kepzettseg.find(l.id), pluszKp * l.strength, kasztKp, false));
            }
        } else {
            const current = karakter.szint.at(-1)!.kepzettsegek.szazalekos;
            let { szazalek = 0 } = current.find(k => k.kepzettseg.id === kepzettseg.id) ?? {};
            szazalek += Math.floor(pluszKp * 3);
            if (!transitive || szazalek <= 15) {
                mergeToArray(current, { kepzettseg, szazalek }, i => i.kepzettseg.id);
                if (transitive) {
                    karakter[kasztKp ? 'kasztKp' : 'kp'] -= pluszKp;
                }
            }
        }
    },
    dmPlusz: (karakter: Karakter, calc: KarakterCalcResult, kepzettseg: Kepzettseg) => {
        if (kepzettseg.fajta === 'normal') {
            const osszes = calc.kepzettsegek.normal;
            const current = karakter.szint.at(-1)!.kepzettsegek.normal;
            let { fok = 0, kp = 0 } = osszes.find(k => k.kepzettseg.id === kepzettseg.id) ?? {};
            mergeToArray(current, { kepzettseg, kp, fok: Math.min(fok + 1, 5) }, i => i.kepzettseg.id);
        } else {
            const current = karakter.szint.at(-1)?.kepzettsegek.szazalekos.find(k => k.kepzettseg.id === kepzettseg.id);
            if (current === undefined) {
                karakter.szint[karakter.szint.length - 1].kepzettsegek.szazalekos.push({
                    kepzettseg,
                    szazalek: 1
                });
            } else {
                current.szazalek++;
            }
        }
    },
    previousSzazalekos: (karakter: Karakter, kepzettseg: SzazalekosKepzettseg): SzintInfo['kepzettsegek']['szazalekos'][0] | undefined | 'max' => {
        const current = karakter.szint.at(-1)?.kepzettsegek.szazalekos.find(k => k.kepzettseg.id === kepzettseg.id);
        if (current && current.szazalek >= 15) {
            return 'max';
        }
        return current;
    },
    addSzazalek: (karakter: Karakter, kepzettseg: SzazalekosKepzettseg, count: number): boolean => {
        const curr = Kepzettseg.previousSzazalekos(karakter, kepzettseg);
        if (curr === 'max') {
            return false;
        }
        if (curr === undefined) {
            karakter.szint[karakter.szint.length - 1].kepzettsegek.szazalekos.push({
                kepzettseg,
                szazalek: count
            });
        } else {
            curr.szazalek += count;
        }
        karakter.szazalek -= count;
        return true;
    }
}

const KP_SZORZOK: Array<number> = [
    3, 3, 3, 3, 3, 2.5, // 0-5
    2.5, 2.5, 2, 2, 1.5, // 6-10
    1.4, 1.3, 1.2, 1.1, 1, // 11-15
    0.9, 0.8, 0.7, 0.6, 0.5, //16-20
    0.4, 0.4, 0.4, 0.4 //21-24
]; 
