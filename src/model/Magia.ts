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
        leiras: `Az alábbi varázslatokat az ordani tűzvarázsló iskola alapvető jellegűnek tekinti. Ahogy a tűzvarázslók mondják, ez az első lecke, melyet minden novíciusnak el kell sajátítania, ha felvételt kíván nyerni a rendbe. Aki ezen alapvető tűzvarázslatok végrehajtására képes, már igazi beavatottnak tekintheti magát - ha nem is a legkülönbek közül valónak.

A tűzvarázsló persze nem csak megidézni képes a tüzet, de a már létező máglyák, fáklyák lángja is fegyverré alakulhat a kezében. A már létező tüzek irányítása sokkal kisebb energia befektetést igényel, mint a tűz Elemi Síkról történő megidézése.

Ezért, ha lehetősége nyílik rá, a tűzvarázsló inkább a rendelkezésre álló tüzet használja fel, mivel ez sokkal kevésbé kimerítő. A varázslatok sokszor többszörösére fokozhatják az eredeti tűz valamely tulajdonságát: fényét, hőjét, esetleg kiterjedését.

A varázslatok használatához azonban ismernünk kell, hogy mik az egyes tüzek kategóriái, hiszen a sebzés és a fényerősség is ennek függvénye. Lássuk hát a kategóriákat:

| Kategória | Sebzés | Fényerősség | E |
|-----------|--------|-------------|---|
|Gyertya|1|2 méter|0|
|Fáklya|1k6|5 méter|1|
|Kandallótűz|2k6|8 méter|2|
|Tábortűz|3k6|12 méter|3|
|Jelzőtűz|4k6|16 méter|4|
|Máglya|5k6|20 méter|5|

Ha a varázslatok leírásában a Mana-pont igény a tűz erősségének függvénye, a gyertya lángja minden esetben 1 Mana-pontért befolyásolható, mivel erőssége csak nulla.

A táblázat az 5E erősségű máglyánál ér véget, de természetesen ennél nagyobb tüzek is elképzelhetőek. A tűz nagyságának - azaz kategóriá- jának, erősségének - meghatározása minden esetben a KM joga és feladata. Szem előtt kell tartanunk azonban, hogy a legnagyob és legforróbb természetes tüzek - amelyek legfeljebb az erdőtüzek forrongó középpontjában vagy vulkánok izzó katlanjában lelhetőek fel - erőssége 15E.
        `
    },
    {
        id: 'magia:tv_elemi_formai',
        name: 'Tűzmágia elemi formái',
        kepesseg: 'emlekezet',
        leiras: `A tűzmágia elemi formái magukban foglalják mind a varázslók által is ismert hat iskolaformát, mind pedig a magasabb szintű, szabad elemi formákat.`
    },
    {
        id: 'magia:tv_magasiskola',
        name: 'Tűzmágia magasiskolája',
        kepesseg: 'emlekezet',
        leiras: `Az idetartozó varázslatok már a tűzvarázslás magasiskoláját jelentik - ami abból mérhető le a legszembetűnőbben, hogy még egy tanult mozaikmágus is értetlenül állna előttük, képtelenül arra, hogy utánozza őket, mi több, hogy meghatározza, mi módon épülnek fel.`
    },
    {
        id: 'magia:tv_tuzlenyek_megidezese',
        name: 'Tűzlények megidézése',
        kepesseg: 'emlekezet',
        leiras: `
Nem valódi idézésről van szó, csupán egy látványos tűzvarázslói praktikáról. A varázslatok különbözőek, néhány dologban azonban megegyeznek: a tűzvarázsló adott manapontért "megidézi" a lényt.

A tüzet valóban meg kell idézni, majd a kívánt lénnyé formázni. A lény a varázsló zónájának tetszőlegesen meghatározott pontján materializálódik, és el sem hagyhatja azt - a tűzvarázsló csak itt képes összetartani, odakint azonnal megsemmisül.

Ugyanez történik, ha a tűzvarázslót megzavarják a koncentrációban. Minden varázslat erősíthető - ez szükséges is, mivel a lényeket eredetileg 1 E Őstűz alkotja, mely 1 E Ősvízzel való találkozáskor kialszik. A lények nagysága és ereje is növelhető az erősséggel.

A fantomok csak Ősvízzel és mágikus fegyverekkel sebezhetők, ám utóbbiak sebzése feleződik rajtuk. A fegyverrel való sebzés a lények anyagát nem károsítja, formájukat azonban megbontja. Ha egy lényt fegyverrel győznek le, az adott E-nek megfelelően tűzkitöréssé alakulva tér meg a Tűz Őselemi Síkjára.

A varázslat fenntartása folyamatos koncentrációt igényel: mivel a lények nem rendelkeznek saját tudattal, irányitani kell őket. Ha egy tűzvarázslót megzavarnak lényének irányításában (például Ép sebet kap), a lény formája megbomlik, tűzkitöréssé lesz, ami az adott E-nek mgefelelően sebez. Ha a harc közben a tűzvarázsló Fp sebet kep, Összpontosítás próbát tehet, sikerül-e a lényt a megfelelő formában tartania. Ha elvéti, a lény szétesik.

A tűzlények, ha Ősvízzel semmisítik meg őket, természetesen nem változnak tűzkitöréssé, hanem az Ősvízzel együtt elenyésznek. Ugyanezt teszik, ha lejár a varázslat időtartama, mely a tűzvarázsló szintjétől függ. Ekkor a tűzlény minden, az időtartamot meghaladó új körben elveszt 1k6 Ép-t. A tűzvarázslónak óvatosan kell megsemmisítenie a lényt, különben az anyag kitörhet uralma alól. A tűzlény egészen addig képes harcolni, amíg Ép-i el nem fogynak. A tűzvarázsló az időtartam lejárta előtt bármikor tűzkitöréssé alakíthatja lényeit.

Egy tűzvarázsló egyszerre csak egy tűzlényt irányíthat, ez is felemészti figyelmének mintegy 90%-át.

Minden tűzlényre jellemző, hogy az Őstűz, amivel fizikai kapcsolatba kerülnek, megszűnik eredeti formájában létezni: magukba olvasztják, így a tűzvarázsló, amennyiben lényének létét veszélyeztetve érzi, irányíthatja azt a zónában lévő Őstüzek felé, hogy érintkezzen velük, s új erőre kapjon. A tűzvarázsló nem képes a varázslat időtartama alatt varázsolni, így nem tudja lényét tűzvarázslatokkal erősíteni. A varázslat időtartama alatt a tűzvarázsló nem varázsolhat, harcolni is képtelen - koncentrálnia kell.

Minden tűzlény immunis az Asztrál- és Mentálalapú varázslatokra, nemkülönben a mérgekre. A természetes anyagok mágiájára is immunisak: kiterjed rájuk a tűzvarázsló személyes aurájának védelme. Őslég, Ősföld és Elemi erő csak Fp veszteséget okozhat nekik, az őselemek E-nként k6-ot, az Elemi erő nagyságának függvényében.

### Harc a lényekkel

A tűzfantomok más rendszerben sebződnek, mint az élőlények. Minden tűzlény rendelkezik Ép-vel és Fp-vel, ez azonban nem jelenti, hogy érzékelik is a fájdalmat.

Fp-jük a tűzvarázsló mindenkori Összpontosítás képességének háromszorosával egyenlő - ez az érték azt jelképezi, mennyire tartós a forma, melybe megidézték őket. Ha elfogynak az Fp-k, a fantom elveszti formáját, és tűzkitöréssé alakul.

A lények Ép-je egyenlő az E-jükkel - ebben jelentkezik, mennyi Őstűz alkotja a fantomot. Az E növekedhet őstüzzel való találkozáskor, illetve csökkenhet Ősvíz által.

Ép veszteség a tűzlényeknél nem okoz Fp veszteséget. A fegyverek csak Fp-t sebezhetnek rajtuk, túlütés esetén is. Ha túlütésre kerül sor, a fegyver kidobható maximális sebzése szerint sebez, hosszúkardnál pl. 10-et.

A tűzlények harci értékeinek meghatározásakor a tűzvarázsló (fegyver nélküli) alapértékeihez +10 járul, ehhez adandó a tűzvarázsló szintje és a lény Harcmódosítója.

A lények felettébb gyorsak, 100 lépést képesek egy körben megtenni - természetesen csak a zónán belül mozogva.

A lények, ha találnak, mindig annyi E-s Őstűznek megfelelően sebeznek, ami testüket alkotja. Ha túlütnek valakit, azon mintegy keresztülfolynak, s a teljes testfelületet érintő
égési sérülést okoznak. Az így okozott sebzés duplázódik. A lények csapásaival szemben nem védenek nem-mágikus fegyverek és vértek, ezek VÉ-je és SFÉ-je nem érvényesül.
        `
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
        if (!range) {
            return '????';
        }
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