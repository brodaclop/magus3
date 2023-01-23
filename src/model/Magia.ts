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
        leiras: `Az általános varázslatok közé azok a mágiaformák tartoznak, melyek nincsenek szoros kapcsolatban egyetlen vallás papjaival sem.
        
Mind a négy szféra tartalmazza az adott varázslatot, következésképp a szükséges manapontok birtokában bármely pap képes a végrehajtásukra. Közös jellemzőjük, hogy mindegyikük a Kis Arkánumokba tartozik.`
    },
    {
        id: 'magia:pap_szfera_termeszet',
        name: 'Természet Szféra',
        kepesseg: 'hit',
        leiras: `A Természet szférába tartoznak mindazok a varázslatok, melyek a természet erőinek vagy lényeinek parancsolnak, függetlenül attól, hogy segítő vagy ártó szándékkal alkalmazzák őket.
        
Használatukkal nem csak állatok és növények felett nyerhet hatalmat a pap, de kérheti az elemi síkok lakóinak segítségét, és némely természetben előforduló jelenséget is előidézhet.

A varázslás időtartama alatt a pap szimbóluma kék fénnyel világít.`
    },
    {
        id: 'magia:pap_szfera_elet',
        name: 'Élet Szféra',
        kepesseg: 'hit',
        leiras: `Az Élet szférájába tartoznak azok a varázslatok, melyek az élet megőrzését vagy szebbé tételét szolgálják.
        
Az e szférába tartozó varázslatot csak a leírás szerint lehet használni, tehát ártó szándékkal nem alkalmazható - ezzel hiába is próbálkozna bárki. Az Élet szférákba tartozó megidézésekkel szolgálatra bírt lények csak arra utasíthatók, hogy védjék meg a papot valamely veszedelemtől. Közvetlen támadásra vagy pusztításra nem vehetők rá, az efféle parancs hatására a lény azonnal felszabadul a mágia hatása alól. A varázslat létrehozásakor a pap szent jelképe fehéren izzó fényt áraszt.`
    },
    {
        id: 'magia:pap_szfera_lelek',
        name: 'Lélek Szféra',
        kepesseg: 'hit',
        leiras: `A Lélek szférához tartozó varázslatok leginkább a lények asztrál- és mentáltestére gyakorolnak hatást - az olyan lények ellen, melyek nem rendelkeznek a két fent említett test közül egyikkel sem, a varázslatok nem használhatóak.
        
Ugyanígy, mindazon lények, akik immunisak az Asztrál- vagy Mentálmágiára, immunisak a Lélek szférába tartozó varázslatokra is. Az Asztrál vagy Mentálsíkon érvényesülő varázslatok kihatással lehetnek az Anyagi Sík történéseire. Minél nagyobb erejű egy varázslat, annál szembetűnőbb lehet befolyása az anyagi világ lakóira. A mellékhatások kizárólag a varázslat erejétől és jellegétől függőek s a pap körüli 1 km sugarú körben jelentkeznek. Kizárólag gyenge érzelmek, gondolatfoszlányok formájában bukkanhatnak elő, sérülést, ájulást, stb, nem okozhatnak.

A Lélek szférábatartozó varázslatok végrehajtásakor a pap szent jelképe sárga fényt áraszt.`
    },
    {
        id: 'magia:pap_szfera_halal',
        name: 'Halál Szféra',
        kepesseg: 'hit',
        leiras: `E szférába tartoznak mindazok a varázslatok, melyek ártó szándékúak, az elmúlást és a pusztulást szolgálják. Végrehajtásukkor a pap szent jelképe vérvörös színben izzik.`
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
    {
        id: 'magia:bard_hangmagia',
        name: 'Hangmágia',
        kepesseg: 'empatia',
        leiras: `A megtévesztés ynevi művészei a bárdok, olyannyira, hogy Hang- és Fénymágiájukkal - mely ugyan semmiféle anyagi hatással nem bír - sokszorta         ütőképesebbek lehetnek, mint más mágiahasználók.
        
Kevés azon Hangmágiához tartozó varázslatok száma, melyeket önálló alkalmazásra szántak. Ezek a varázslatok inkább támogatást biztosítanak a Fénymágia illúzióinak, vagy a Dalmágia hatásait befolyásolják. Összefonódnak a más csoportokba tartozó varázslatokkal, tökéletes egységet alkotva velök.`
    },
    {
        id: 'magia:bard_fenymagia',
        name: 'Fénymágia',
        kepesseg: 'empatia',
        leiras: `A bárd varázslatainak többsége ebbe a csoportba tartozik. A varázslók által lenézett illúziók ezek, melyeknél veszedelmesebb fegyver kevés akad a mágiát nem ismerők ellen.

A Fénymágia az Elemi Mágia sajátos változata, mely a megidézett fényt nem elemi formájában idézi meg, hanem a bárd kívánta minta szerint alakítja át. Az erősítésnek nem kell nagynak lennie, így az illúziók viszonylag kevés Mana-pont befektetésével is kápráztatóak lehetnek.

A Fénymágia varázslatai soha sem hatnak másra, csak a fénysugarakra; így minden általuk létrehozott kép valódi természete könnyen felismerhető, ha valaki megkísérli megérinteni őket. Keze ugyanis átsiklik a fényjátékon. Ám az illúzió felismerése nem jelenti azt, hogy a kép eltűnik. Az illúzió továbbra is ott marad, s a mögötte található tárgyakat eltakarja.

Az illúziók ellen leginkább a varázslók védettek, mert tapasztalatuk oly nagy a létező anyaggal kapcsolatos mágiában, hogy a Fénymágia által létrehozott képek nem tévesztik meg őket egykönnyen. Minden efféle varázslat felfedezésének esélye számára 3096. Ha a varázsló megdobja ezt a százalékot, első pillantásra felismeri az apró pontatlanságokat a fény alkotta képben, s rájön illúzió voltára.

Azoknál a varázslatoknál, ahol felfedezési esély szerepel, a varázslók 3096-a ehhez hozzáadandó.`
    },
    {
        id: 'magia:bard_egyeb',
        name: 'Egyéb bárd',
        kepesseg: 'empatia',
        leiras: `Az egyéb mágiák csoportjába azok a varázslatok kerültek, melyek alapvetően nem tartoztak a bárdok eszköztárába - ki tudja, hogy e csavaros eszű, gyakorta görbe utakon járó fickók miképpen jutottak birtokukba.`
    },
    {
        id: 'magia:tv_alapveto_tuzmagia',
        name: 'Alapvető tűzmágia',
        kepesseg: 'emlekezet',
        leiras: `Az alábbi varázslatokat az ordani tűzvarázsló iskola alapvető jellegűnek tekinti. Ahogy a tűzvarázslók mondják, ez az első lecke, melyet minden novíciusnak el kell sajátítania, ha felvételt kíván nyerni a rendbe. Aki ezen alapvető tűzvarázslatok végrehajtására képes, már igazi beavatottnak tekintheti magát - ha nem is a legkülönbek közül valónak.`
    }

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
    { name: 'Darton egyedi', id: 'egyedi_darton' },
    { name: 'Domvik egyedi', id: 'egyedi_domvik' },
] as const;

export interface VarazslatBase extends NamedEntity {
    mp: number;
    range: 'self' | 'touch' | number;
    idotartam: string;
    leiras: string;
    save: typeof Mentodobasok[number]['id'];
    kategoriak?: Array<typeof MagiaKategoriak[number]['id']>;
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