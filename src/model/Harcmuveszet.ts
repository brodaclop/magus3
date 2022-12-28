import { FegyverBase, KozelharcFegyver, KozelharcHarcertekek, NemKategorizalt } from "./Fegyver";
import { NormalKepzettseg } from "./Kepzettseg";
import { parseKocka } from "./Kocka";
import { NamedEntity } from "./util";

const FEGYVER_KPK: [number, number, number, number, number] = [1, 3, 10, 25, 40];
const FEGYVER_SZINTLEIRASOK: [string, string, string, string, string] = [
    'KÉ: -5, TÉ: -5, VÉ: -10',
    'KÉ: 0, TÉ: 0, VÉ: 0',
    'KÉ: +2, TÉ: +5, VÉ: +5',
    'KÉ: +5, TÉ: +10, VÉ: +10',
    'KÉ: +10, TÉ: +20, VÉ: +20'
];

interface HarcmuveszStilus extends NamedEntity {
    leiras: string;
    tamadas: Omit<NemKategorizalt & FegyverBase & KozelharcHarcertekek, 'flags' | 'alternativKepzettseg' | 'mgt' | 'kez' | 'id' | 'name'>;
    flags?: 'pluszegypszi'
};

export const STILUSOK: Array<HarcmuveszStilus> = [
    {
        id: 'Shien-ka-to',
        name: 'Shien-ka-to',
        leiras: `Szimbólumuk sárga kör alapon fekete
        lángnyelv, s ezt előszeretettel viselik fejkötőiken,
        vagy tunikájuk hátán. 
        
        A technikák sokkal inkább támadás-, semmint
        védelem centrikusak. A cél minél gyorsabban
        ártalmatlanná tenni az ellenfelet, könnyed
        mozgással, mintha a harcművész valóban szélben
        lobogó lángnyelvként táncolna. Viszonylag széles,
        lendületes mozdulatok jellemzik, az ütések és
        rúgások erejét inkább gyorsaságuk és pontosságuk
        adja. Szeretik távol tartani ellenfeleiket, a közelharc
        idegen a Shien-ka-to-tól. Kezüket és lábukat közel
        azonos arányban használják harc közben, állásaik
        magasak, s kiváló az egyensúlyérzékük. `,
        tamadas: {
            ke: 11,
            te: 15,
            ve: 5,
            sebesseg: 'gyors',
            sebzes: parseKocka('1k6'),
            sebzestipus: 'zuzo',
            kepesseg: 'reflex',
            erobonusz: 16
        }
    },
    {
        id: 'Dart-nid-kinito',
        name: 'Dart-nid-kinito',
        leiras: `Szimbólumuk a víz, s mesterektől,
        iskolától függően, a víz valamely stilizált
        ábrázolását hordják ruhájukon.
        
        A stílusok között ez a leglágyabb. Egyetlen szögletes
        mozdulatot sem találhatunk benne, a kezek és
        lábak - mi több, maga a test - inkább körívek
        mentén mozog. A technika nagy hangsúlyt
        fektet a védelemre, az ellenfél saját
        támadásának lendületét próbálja elvezetni, ezt a
        maga javára kihasználni. A Dart-nid-kinito
        megtanulása meglehetősen időigényes feladat,
        kevés harcművész választja. Miután technikáik
        egyaránt használják a kezet és lábat, gyakran
        ugyanabban a mozdulatsorban, így nincs
        értelme a kéz vagy láb harcértékeit
        különbontani.`,
        tamadas: {
            ke: 7,
            te: 10,
            ve: 19,
            sebzes: parseKocka('1k3+1'),
            sebesseg: 'atlagos',
            sebzestipus: 'zuzo',
            kepesseg: 'osszpontositas',
            erobonusz: 16
        },
        flags: 'pluszegypszi'
    },
    {
        id: 'Avad-ka-kinito',
        name: 'Avad-ka-kinito',
        leiras: `Eredeti Niaréből származó stílus,
        változtatás nélkül tanítja a Sárga Kolostorok
        technikai anyagát. Gyakran ma is Niaréből
        érkezett mesterek oktatják, igen magas
        színvonalon. A női tanítványok igen ritkák, hisz
        elsősorban a fizikai erőre és állóképességre
        épülő technikákból áll.

        Jelképük a Sidar hegy stilizált körvonala,
        ezt általában a tunikájukra hímezve viselik.
        Meglehetősen stabil állásokat tartalmaz,
        romboló erejű ütésekkel. A harcművész nem
        csak karjának erejét, hanem szinte egész
        testsúlyát beleadja a jól kiszámított pillanatban
        leadott ütésbe. Ezért a technika sebzése
        nagyobb a többiénél, nem k6, hanem 2k6+1,
        viszont körönként csak egy támadásra nyílik
        lehetőség, mivel a sebzés nagysága a jó
        időzítésen múlik.`,
        tamadas: {
            ke: 2,
            te: 18,
            ve: 5,
            sebzes: parseKocka('2k6+2'),
            sebzestipus: 'zuzo',
            sebesseg: 'lassu',
            kepesseg: 'izom',
            erobonusz: 16
        }
    },
    {
        id: 'Nisen-nid-to',
        name: 'Nisen-nid-to',
        leiras: `Vien wri Dara, tiadlani Dorcha által
        kidolgozott stílus, azóta is a Dorcha
        testőrségének fő irányzata. Megtanulására
        egyedül Par-Elyaban vagy Di'Maremben
        van mód. A gyengébbik nem körében talán
        ez a leginkább kedvelt harci metódus, ám a
        Nisen-nid-to iskolák jó néhány férfi
        hírességet is adtak Ynevnek. A
        legharcosabbnak tartott stílus, elegáns,
        látványos és igen hatékony. Oktatását
        némely mester egybeköti - egy Niaréből
        származó, igen ritka és igen speciális -
        mágiafajta tanításával, s ezért a Nisen-nidto tanítványairól kering a legtöbb legenda.
        E stílus a kilenc alapfegyvert
        használatát is oktatja, a legnagyobb
        hangsúlyt azonban egy különlegesen
        kiképzett, egykezes, ún. Nisen-kard
        forgatásának tanítására fordítja. A Nisenkardot a tanítványok Chi-harc közben is
        képesek használni.
        A Nisen-nid-to jelképéül a szelet
        választották, ám a tanítványok nem
        hordanak ruházatukon jeleket, mégis
        jellegzetes láb és kéztartásukról azonnal
        felismerhető stílusuk.`,
        tamadas: {
            ke: 12,
            te: 15,
            ve: 9,
            sebzes: parseKocka('1k6+1'),
            sebzestipus: 'zuzo',
            erobonusz: 16,
            kepesseg: 'reflex',
            sebesseg: 'gyors'
        }
    }
];


export const Harcmuveszet = {
    fegyverek: STILUSOK.map(s => ({
        ...s.tamadas,
        id: `${s.id}`,
        name: `Harcművészet: ${s.name}`,
        alternativKepzettseg: `harcmuveszet:${s.id}`,
        flags: 'pusztakez',
        kez: 2
    }) as KozelharcFegyver),
    kepzettsegek: STILUSOK.map(s => ({
        id: `harcmuveszet:${s.id}`,
        name: `Harcművészet: ${s.name}`,
        leiras: s.leiras,
        tipus: 'harcmuveszet',
        fajta: 'normal',
        kepesseg: s.tamadas.kepesseg,
        kp: FEGYVER_KPK,
        szintleiras: FEGYVER_SZINTLEIRASOK
    }) as NormalKepzettseg),
}