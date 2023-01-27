import { NormalKepzettseg } from "./Kepzettseg";
import { constructArray, NamedEntity, namedEntityArray, sumArray } from "./util";
import { Mentodobasok } from "./Magia";
import { SzintInfo } from "./Karakter";

export interface PsziIskola extends NamedEntity {
    psziPont: [number, number, number, number, number];
    leiras: string;
}

export type GyorsPsziDiszicplina = { ke: number } & PsziDiszciplinaBase;
export type LassuPsziDiszciplina = { varazslasIdeje: string } & PsziDiszciplinaBase;

export interface PsziDiszciplinaBase extends NamedEntity {
    idotartam: string;
    leiras: string;
    psziPont: number;
    save: typeof Mentodobasok[number]['id'];
    iskola: typeof PsziIskolak[number]['id'];
    fok: number;
}

export const PsziIskolak = [
    {
        id: 'pyarroni',
        name: 'Pyarroni',
        psziPont: [2, 3, 4, 5, 6],
        leiras: `Pyarronban dolgozták ki a Pszi mindenki számára megtanulható fajtáját, mely segítségével önmagunk és mások felett is korlátozott befolyásra tehetünk szert.
        
A Pyarroni módszer nem alkalmas sem Mana előállítására, és nem is olyan hatékony, mint a Slan út - ám nagy előnye, hogy rövidebb idő alatt elsajátítható, mint az előbbi kettő, és gyakorlatilag bármelyik kaszt számára elérhető.`
    } as PsziIskola,
    {
        id: 'slan',
        name: 'Slan',
        psziPont: [1, 1, 1, 1, 1],
        leiras: `
Niarei szerzetesek évezredes tapasztalatát, munkáját foglalták egységbe a Slan-út megalkotásakor. E Ψ alkalmazás használói - kizárólag harc- és kardművészek - a testük és tudatuk feletti tökéletes uralmat valósították meg.

Képesek végrehajtani bármit, ami a Pyarroni módszer része, ám saját diszciplínáikat (kevés kivétellel) csak önMagukra tudják vonatkoztatni.

A Slan-út segítségével felépített Statikus Ψ-pajzs lebonthatatlan, csak megalkotója tudja megszüntetni. A. Slan Diszciplínák megalkotása során nem törekedtek a mások felett gyakorolt ellenőrzés módszereinek tökéletesítésére - a Kyr metódus e téren felülmúlja -, s energiáit sem képes Manává alakítani.

Mindettől függetlenül az elme és az akarat csiszoltságának magasiskolája, az önkontToll legtökéletesebb formája. Elsajátításához tíz-tizenkét esztendő szükséges és egy Slan tanár útmutatásai. Egyszerű
harc- vagy kardművész - aki nem tanítómester - képtelen továbbadni tudását, bármekkora hatalma legyen is a Ψ energiák felett.
        `
    } as PsziIskola,
    {
        id: 'kyr',
        name: 'Kyr',
        psziPont: [2, 2, 2, 2, 2],
        leiras: `
Magában foglalja a Pyarroni módszer teljes tudását, diszciplínái segítségével az elme hatékonyabban védhető és támadható, mint a Pyarroni módszerrel.

Tökéletesebb uralmat ad mások tudata és teste felett, mint bármely egyéb Ψ-alkalmazási eljárás. Legnagyobb erénye mégis az, hogy képes a Ψ-pontokat Mana-pontokká alakítani.

A Kyr metódus diszciplínáit (Kyr Diszciplínák) csakis varázslóknak és mágusoknak oktatják. E tudást gondosan őrzik, így más kaszt tagjai soha nem juthatnak hozzá.

Megértéséhez és elsajátításához legkevesebb hat, kemény tanulással töltött esztendő szükséges, meg olyan kézikönyvek, melyek ritka példányait biztos helyen rejtegetik.

A pyarroni Fehér Páholy és az északi Doran beavatottjai századok óta dolgoznak újabbnál újabb diszciplínákon, ám ezeket csak a felsőkasztba tartozó mágusok számára teszik elérhetővé.
        `
    } as PsziIskola,
    {
        id: 'dzsenn',
        name: 'Dzsenn',
        psziPont: [1, 1, 1, 1, 1],
        leiras: `
A dzsennek magas mentális felkészültsége, gondolkodásmódja és kivételes intellektusa egyaránt hozzájárul ahhoz, hogy mindannyian ismerik és magas szinten alkalmazzák a Pszit.

Az általuk kidolgozott és használt Pszi-iskola díszcíplínaként képes használni olyan mentális hatásokat, amelyek más fajok számára csak mágiával érhetők el - a Pszi és a Mentálmágia rokonsága a pyarroni mentalisták számára is egyértelmű.
        `
    } as PsziIskola
] as const;

export type PsziDiszciplina = GyorsPsziDiszicplina | LassuPsziDiszciplina;

export const PSZI_PYARRONI: Array<PsziDiszciplina> = [
    {
        name: 'Emlékfelidézés',
        id: 'emlekfelidezes',
        psziPont: 1,
        save: 'nincs',
        idotartam: 'Lásd a leírásban',
        varazslasIdeje: '2 kör',
        iskola: 'pyarroni',
        fok: 1,
        leiras:
            `A diszciplína helyszínek, szövegek, vagy események meg­jegyzésében, illetve régi - egyébként már elfelejtett - emlékek felidézésében nyújt segítséget. Ha a Ψ-alkalmazó valamit szeretne úgy az elméjébe vésni, hogy arra később - minden részletében ­visszaemlékezzen, akkor rövid (két körig] tartó meditációval mintegy beleégeti a kívánt dolgot az agyába.

Ezek után az emlék még három éven át tökéletesen tisztán él  benne, s minden különösebb erőfeszítés (vagy diszciplína alkalmazása) nélkül felidézhető. Az emlék  há­rom év múltán ugyanúgy halványodni kezd, mint egy nem efféle beégetéssel szerzett kép.

Ha a Ψ-alkalmazó olyan emléket kíván felidézni, melyet nem a fenti módon tárol agyában, akkor a diszcip­lína használatával erre is mód nyílik. Az így felidézett emlék 10 körig tökéletesen éles lesz, ám  utána semmivé válik, s csak a diszciplína újbóli alkalmazásával kerül elő megint.
        
Mesterfokú alkalmazás esetén nem csak saját ma­gunkban idézhetünk fel emléket, hanem másokban is.`
    },
    {
        name: 'Emlékfelidézés másban',
        id: 'emlekfelidezes:2',
        psziPont: 1,
        save: 'mental',
        idotartam: 'Lásd a leírásban',
        varazslasIdeje: '2 kör',
        iskola: 'pyarroni',
        fok: 3,
        leiras:
            `A diszciplína helyszínek, szövegek, vagy események meg­jegyzésében, illetve régi - egyébként már elfelejtett - emlékek felidézésében nyújt segítséget. Ha a Ψ-alkalmazó valamit szeretne úgy az elméjébe vésni, hogy arra később - minden részletében ­visszaemlékezzen, akkor rövid (két körig] tartó meditációval mintegy beleégeti a kívánt dolgot az agyába.

Ezek után az emlék még három éven át tökéletesen tisztán él  benne, s minden különösebb erőfeszítés (vagy diszciplína alkalmazása) nélkül felidézhető. Az emlék  há­rom év múltán ugyanúgy halványodni kezd, mint egy nem efféle beégetéssel szerzett kép.

Ha a Ψ-alkalmazó olyan emléket kíván felidézni, melyet nem a fenti módon tárol agyában, akkor a diszcip­lína használatával erre is mód nyílik. Az így felidézett emlék 10 körig tökéletesen éles lesz, ám  utána semmivé válik, s csak a diszciplína újbóli alkalmazásával kerül elő megint.
        
Ezzel a diszciplinával nem csak saját ma­gunkban idézhetünk fel emléket, hanem másokban is.`
    },
    {
        name: 'Ébredés',
        id: 'ebredes',
        psziPont: 0,
        save: 'nincs',
        idotartam: 'Lásd a leírásban',
        varazslasIdeje: '1 kör',
        iskola: 'pyarroni',
        fok: 1,
        leiras: `A Ψ-alkalmazó képes beprogramozni magát arra, hogy egy meghatározott időben minden külső befolyás nél­kül felébredjen. Az  önszuggesztiónak vagy arra kell irá­nyulnia, hogy mennyi idő  múlva szakadjon ki az álomból, vagy egy külső jelhez kell  kapcsolódnia. Mivel az érzék­szervek alvás alatt is működnek ­noha normális esetben a gyenge ingereket a tudat figyelmen  kívül hagyja - a disz­ciplína alkalmazója olyasféle jeleket határozhat  meg ébre­dési pontnak, mint hajnali kakasszó, az Éjközép teljes  sö­tétje, lova ideges horkantása, stb.
        
A diszciplína nem működik, ha a karakter elájult, ká­bítószeres  álomba merült, vagy valamely mentális támadás hatására  kapcsolt ki tudata.`
    },
    {
        name: 'Ébresztés',
        id: 'ebredes:2',
        psziPont: 0,
        save: 'mental',
        idotartam: 'Lásd a leírásban',
        varazslasIdeje: '1 kör',
        iskola: 'pyarroni',
        fok: 1,
        leiras: `A Ψ-alkalmazó képes beprogramozni mást arra, hogy egy meghatározott időben minden külső befolyás nél­kül felébredjen. A szuggesztiónak vagy arra kell irá­nyulnia, hogy mennyi idő  múlva szakadjon ki az álomból, vagy egy külső jelhez kell  kapcsolódnia. Mivel az érzék­szervek alvás alatt is működnek ­noha normális esetben a gyenge ingereket a tudat figyelmen  kívül hagyja - a disz­ciplína alkalmazója olyasféle jeleket határozhat  meg ébre­dési pontnak, mint hajnali kakasszó, az Éjközép teljes  sö­tétje, lova ideges horkantása, stb.
        
A diszciplína nem működik, ha a karakter elájult, ká­bítószeres  álomba merült, vagy valamely mentális támadás hatására  kapcsolt ki tudata. Az alkalmazáshoz legalább egy Ψp-tal kell  rendelkeznie.`
    },
    {
        name: 'Érzékélesítés',
        id: 'erzekelesites',
        psziPont: 2,
        idotartam: '1 kör',
        iskola: 'pyarroni',
        fok: 2,
        save: 'nincs',
        varazslasIdeje: '2 kör',
        leiras: `A Pszi-energiák lehetőséget nyújtanak arra, hogy fel­haszná­lásukkal az alapvető öt érzékszerv hatásfokát növel­jük vagy  csökkentsük. A diszciplína arra ad módot, hogy a látást, hallást,  szaglást, tapintást és ízlelést akaratunk szerint befolyásoljuk.
        
A Látás befolyásolásával nemcsak élesíthetjük a szemet (esetleg  elhomályosíthatjuk), hanem lehetőségünk nyílik a Megzavarására  is. A látás élesítésével legfeljebb megkétszereződik a látótávolság,  tompításával azonban vakság is okozható.

Megzavarás esetén a szem nem tud kellőképpen fó­kuszálni,  így felléphet kettőslátás, esetleg a távolság, vagy egy közeledő  tárgy, lény sebességének felmérése okozhat problémát. A valóságtól  való eltérés 10% és 60% között mozoghat. (Kiszámítása: 1 K6,  majd az eredmény megszor­zandó 10-zel.)

A Hallás élesítése kétszeresére növeli a hallótávolsá­got, míg  tompítása akár süketséghez is vezethet.

Megzavarásakor a hangok távolságát, esetleg irányát véti el  a befolyásolt lény. Az eltérés és a kiszámítás módja megegyezik  a Látás befolyásolásánál leírtakkal.

A Szaglás, a Tapintás, és az Ízlelés felerősítése meg­kétszerezi  ezen érzékszervek hatásfokát. Tompításuk az ér­zékek teljes  kikapcsolásával is járhat. Megzavarásukkal el­érhetjük, hogy más  szag, anyagi minőség (esetleg hőmér­séklet), vagy íz érződjék. A  Megzavarás mértékének el­döntése a Kalandmester feladata.

FIGYELEM!
A diszciplína nem alkalmas arra, hogy bármely ér­zékszerv  befolyásolásával valós kárt okozzon. Pl.: Nem le­het a hőérzetet  annyira fokozni, ami Fp veszteséggel jár.
A diszciplína végrehajtása érzékszervenkét 2 Ψp-ba kerül, és  hatását 1 körig fejti ki. 4 Ψp-ért két érzékszervet lehet befolyásolni  1 körig, vagy egy érzékszervet 2 körig, stb.`
    },
    {
        name: 'Érzékbefolyásolás',
        id: 'erzekelesites:2',
        psziPont: 2,
        idotartam: '1 kör',
        iskola: 'pyarroni',
        fok: 4,
        save: 'mental',
        varazslasIdeje: '2 kör',
        leiras: `A Pszi-energiák lehetőséget nyújtanak arra, hogy fel­haszná­lásukkal az alapvető öt érzékszerv hatásfokát növel­jük vagy  csökkentsük. A diszciplína arra ad módot, hogy a látást, hallást,  szaglást, tapintást és ízlelést akaratunk szerint befolyásoljuk.
        
A Látás befolyásolásával nemcsak élesíthetjük a szemet (esetleg  elhomályosíthatjuk), hanem lehetőségünk nyílik a Megzavarására  is. A látás élesítésével legfeljebb megkétszereződik a látótávolság,  tompításával azonban vakság is okozható.

Megzavarás esetén a szem nem tud kellőképpen fó­kuszálni,  így felléphet kettőslátás, esetleg a távolság, vagy egy közeledő  tárgy, lény sebességének felmérése okozhat problémát. A valóságtól  való eltérés 10% és 60% között mozoghat. (Kiszámítása: 1 K6,  majd az eredmény megszor­zandó 10-zel.)

A Hallás élesítése kétszeresére növeli a hallótávolsá­got, míg  tompítása akár süketséghez is vezethet.

Megzavarásakor a hangok távolságát, esetleg irányát véti el  a befolyásolt lény. Az eltérés és a kiszámítás módja megegyezik  a Látás befolyásolásánál leírtakkal.

A Szaglás, a Tapintás, és az Ízlelés felerősítése meg­kétszerezi  ezen érzékszervek hatásfokát. Tompításuk az ér­zékek teljes  kikapcsolásával is járhat. Megzavarásukkal el­érhetjük, hogy más  szag, anyagi minőség (esetleg hőmér­séklet), vagy íz érződjék. A  Megzavarás mértékének el­döntése a Kalandmester feladata.

FIGYELEM!
A diszciplína nem alkalmas arra, hogy bármely ér­zékszerv  befolyásolásával valós kárt okozzon. Pl.: Nem le­het a hőérzetet  annyira fokozni, ami Fp veszteséggel jár.
A diszciplína végrehajtása érzékszervenkét 2 Ψp-ba kerül, és  hatását 1 körig fejti ki. 4 Ψp-ért két érzékszervet lehet befolyásolni  1 körig, vagy egy érzékszervet 2 körig, stb.`
    },
    {
        name: 'Fájdalomcsillapítás',
        id: 'fajdalomcsillapitas',
        psziPont: 1,
        save: 'nincs',
        idotartam: '1 óra',
        fok: 2,
        varazslasIdeje: '1 kör',
        iskola: 'pyarroni',
        leiras: `A diszciplína segítségével az agy fájdalomközpont­jára gyako­rolhatunk hatást. Lehetőség nyílik fájdalomérzet tompítására vagy  keltésére. Miután nem gyógyít vagy okoz valódi sebesüléseket, az  Életerő Pontokra nincs befolyással. Csak Fp-ot adhatunk vissza,  vagy vehetünk el. Ma­ximum Fp fölé nem juthatunk, bármennyi Ψp-ot is áldoznánk rá. Az így visszanyert FP-k 1 óra múlva elvesznek, bár 1 Fp alá ekkor se kerülhet a karakter.`
    },
    {
        name: 'Fájdalomokozás',
        id: 'fajdalomcsillapitas:2',
        psziPont: 1,
        save: 'asztral',
        idotartam: '1 óra',
        fok: 4,
        varazslasIdeje: '1 kör',
        iskola: 'pyarroni',
        leiras: `A diszciplína segítségével az agy fájdalomközpont­jára gyako­rolhatunk hatást. Lehetőség nyílik fájdalomérzet tompítására vagy keltésére. Miután nem gyógyít vagy okoz valódi sebesüléseket, az  Életerő Pontokra nincs befolyással. Csak Fp-ot adhatunk vissza,  vagy vehetünk el. Az Fp-ok teljes elvonásával - 0 Fp-ra kínzás ­elérhetjük, hogy az áldo­zat elájuljon, ám igazi seb ekkor sem  keletkezik rajta. Ma­ximum Fp fölé  másokat nem juttat­hatunk, bármennyi Ψp-ot is áldoznánk rá. Asztráltesttel  nem rendelkező lényekre a diszciplína nem működik.`
    },
    {
        name: 'Hatodik Érzék',
        id: 'hatodik_erzek',
        psziPont: 5,
        idotartam: '10 perc',
        save: 'nincs',
        fok: 4,
        iskola: 'pyarroni',
        ke: -20,
        varazslasIdeje: '5 szegmens',
        leiras: `A Hatodik Érzék az agy azon különleges képességét használja  fel, mely lehetővé teszi, hogy az idő szövedékén átszűrődő  eseménymozaikokat összerendezve megérezze a közeljövőben  bekövetkező történések irányát.
        
A diszciplína alkalmazója megérzésekhez juthat az időtartam  alatt. Ezek a megérzések semmiféle pontossággal nem bírnak,  csupán egy hamarosan bekövetkező eseményre figyelmeztetik a  karaktert. A megérzések lehetnek jó, vagy rossz előjelűek.

Rossz előérzetet kelt minden olyan történés, mely ártalmas  lehet, vagy gonosz szándékkal cselekedték.

Jó előérzethez juthat a diszciplína alkalmazója, ha az idő­tartam alatt semmiféle baj nem történik vele, illetve a rá váró  események a javára válnak.

A Hatodik Érzéknek két alkalmazási módja lehetsé­ges. Az  első esetben a karakter csupán általánosságban kí­váncsi az  időtartam alatt bekövetkező események rá vonat­kozó előjelére.  Ennek tipikus példája, ha a karakter egy sö­tét barlang szájánál  megtorpanva alkalmazza a diszciplínát. Amennyiben a barlang­ban ellenséges lények lapulnak, akik valamilyen módon a  biztonságára törnek a diszciplína hatá­sának időtartama alatt,  akkor a karaktert Rossz Előérzet fogja el. Nem tudja az okát, sőt,  a leselkedő veszedelem mértékét és pontos irányát sem ismeri,  csupán arról szerez tudomást, hogy valami vár rá. Belépve a  barlangba fokozó­dik Rossz Előérzete - ahogy az időben egyre  közeledik az ártalmas esemény -, majd a baj közvetlen megtörténte  előtt egy pillanattal megérzi irányát is. Ha ez egy támadás volt,  már nem érte a diszciplína alkalmazóját váratlanul, s ebben az  esetben az ellenséges akció nem minősül Meglepetésnek.

A Hatodik Érzék másik alkalmazási módja, ha a ka­rakter  arra kíváncsi, hogy egy általa végrehajtott cselek­mény milyen  hatással jár rá nézve. Ilyenkor a diszciplína alkalmazása után  megkérdezheti Kalandmesterét, hogy mi­lyen előérzetei vannak,  érdemes-e megtenni, amire készül. A válasz minden esetben csak  annyi, hogy jó vagy rossz ér­zések ébrednek benne. Indoklás sosincs.  Jellemző helyzet, amikor karakter egy sírt kíván kibontani.  Végrehajtja a diszciplínát, s megkérdezi a Kalandmesterét érzeteiről.  Ha a sírban élőhalott fekszik, a karakternek Rossz Előérzetei  tá­madnak. Ha a sírban semmi sincs (legfeljebb egy porladó tetem),  vagy a koporsó mélyén kincs hever, a karakterben )ó Előérzetek  ébrednek.

A diszciplína 5 Ψp-ért 60 körig (azaz tíz percig) en­gedi efféle  korlátozott módon a jövő titkainak felfedését. 10 Ψp felhasználásával  az időtartam megduplázódik, stb.`
    },
    {
        name: 'Képességjavítás',
        id: 'kepessegjavitas',
        psziPont: 1,
        idotartam: '6 kör',
        varazslasIdeje: '2 kör',
        iskola: 'pyarroni',
        fok: 2,
        save: 'nincs',
        leiras: `Olykor - különleges veszélyhelyzetekben - az emberi fizikum  látszólag csodákra képes. Egy vadállattól megré­mült gyermek  hihetetlen gyorsasággal képes felkúszni egy sudár, ág nélküli fa  törzsén, s miután a veszély elmúlt, nemcsak azon csodálkozik,  hogy miképp sikerült ez neki, hanem gyakorta lemászni sem tud  magától. Ez jellemző példája a Ψ akaratlan megnyilvánulásának,  hiszen ilyenkor az agy szabadít fel a testben olyan erőforrásokat,  melyek egyébként nem hozzáférhetőek.

A diszciplína ugyanezt képes végrehajtani, termé­szetesen a  tudat teljes irányítása alatt. A Ψ erők segítségével a fizikai képességek  - kivéve a Szépséget - megváltoztat­hatóak. A változtatás időleges,  s a diszciplína hatásának el­múltával visszatérnek az eredeti értékek.  Ugyanakkor lehe­tetlent nem szabad elvárnunk a Ψ-től sem: egyik  képessé­günket sem emelhetjük 20 fölé.

A Képességjavítás az egyik legkedveltebb Általános Disz­ciplína. Gyakorta használják a Méregellenállás - az Egészség tíz  feletti része - megnövelésére. Valójában igen hasznos minden  olyan esetben, amikor Képességpróbára kényszerülünk, hiszen  az adott pillanatban valóban erőseb­bek, gyorsabbak, egész­ségesebbek vagy ügyesebbek le­szünk. Nem szabad elfelejteni,  hogy ha harc folyamán megnöveljük egészségünket - és egy  csapást csak az így nyert Ép-okkal éltünk túl -,amint a disz­ciplína hatása elmú­lik, a nyert Ép-k is semmivé lesznek, s ebbe akár bele is halhatunk.

| Módosítás az eredeti képességhez képest | 1 | 2 | 3 | 4 | 5  | 6  |
| --------------------------------------- | - | - | - | - | -  | -  |
| Szükséges Ψp                            | 1 | 2 | 4 | 8 | 16 | 32 | 


A táblázatban feltüntetett Ψp értékek a ~diszciplína~ alap idő­tartamára (6 kör) vonatkoznak. A felhasznált Ψp-ok megdup­lázásával a hatás időtartamának megduplázását ér­hetjük el,  megtriplázásával a hatás ideje megháromszorozó­dik, és így tovább.`
    },
    {
        name: 'Roham',
        id: 'roham',
        psziPont: 1,
        idotartam: '1 támadás',
        varazslasIdeje: 'azonnali',
        iskola: 'pyarroni',
        save: 'nincs',
        fok: 1,
        leiras: `A diszciplína alkalmazója egyetlen csapásra össz­pontosítva,  teste és elméje minden tartalékát kiadja egy lerohanásszerű  támadásban. Az alkalmazó mély, torok­hangú kiáltás kíséretében  hajtja végre a rohamot.

A diszciplína felemészti az alkalmazó összes aktuális Ψp-ját,  beleértve a Dinamikus Pajzsban tároltakat is. Ez azt jelenti, hogy  a támadó kénytelen felhasználni minden Ψp-ot, amivel rendelkezik,  s az ebből nyert energia hozzáadó­dik a Támadó Értékéhez.  1 Ψp +2 TÉ-t jelent. (Azaz 5 Ψp felhasználása esetén + 10 van a  TÉ-n.)

Amennyiben az ellenfél nem ugyanezt a diszciplínát alkalmazza, a kezdeményezés automatikusan a Roham al­kalmazóját illeti, kezdeményező dobás nélkül.

Ez a diszciplína olykor igen hasznos lehet, ám nem szabad  figyelmen kívül hagynunk veszélyét: agyunk feltöl­tődéséig képtelenek  leszünk bármiféle Ψ-alkalmazásra és elménket is csak a Statikus  Pajzs védi.
            `
    },
    {
        name: 'Telekinézis',
        id: 'telekinezis',
        psziPont: 2,
        idotartam: '1 kör',
        ke: 20,
        iskola: 'pyarroni',
        save: 'nincs',
        fok: 3,
        leiras: `Agyi energiáink segítségével kisebb tárgyakat moz­gathatunk  látótávolságon belül. Elfordíthatunk a zárban egy kulcsot, a tőlünk  távol heverő fegyvert magunkhoz húzhat­juk, vagy észrevétlen  elcsenhetünk az ékszerészmúhelyből némi drágaságot. A diszciplína  alkalmazása taglejtéseket nem igényel, pusztán a mozgatni kívánt  tárgyon kell tartani tekintetünket. Amint elfordulunk, vagy valami  eltakarja a tárgyat, az mozdulatlanná válik, esetleg - ha a levegőben  volt - lepottyan. A Telekinézis csak lassú mozgatásra alkal­mas  - egy futó ember sebességénél nagyobbat nem érhetünk el vele ­ezért ilyen módon fegyvert dobni, vagy sebesülést okozni szinte  lehetetlen.

A diszciplína kifejti hatását mágikus tárgyakra is.

2 Ψp felhasználásával 1 kg súlyú tárgy mozgatható 1 körig. 4 Ψp rááldozásával mozgathatunk 1 kg-os tárgyat 2 körig, vagy 2  kg-ot 1 körig, stb.
            `
    },
    {
        name: 'Telepátia',
        id: 'telepatia',
        psziPont: 1,
        save: 'mental',
        idotartam: 'lásd a leírást',
        varazslasIdeje: '3 kör',
        iskola: 'pyarroni',
        fok: 3,
        leiras: `
Az egyik legősibb Ψ-alkalmazás, más néven Gondo­latátvitel. Segítségével gondo­lati úton lehet  beszélgetni, vagy a Ψ-alkalmazó által felidé­zett képeket közölni.  A Telepátia csak Ψ képzettséggel ren­delkezők között működik.  A Pszi képzettség 3. foka alatt a karakter nem tud válaszolni, csupán a hozzá intézett gondolati üzenetet  képes venni.

A Telepátia alkalmazásához a Gondolatátvitel meg­kezdőjének  tökéletesen ismernie kell a gondolatokat fogadó személyt - ebben  az esetben a távolság nem számít -, vagy látnia kell azt.

Amennyiben a Telepátiában résztvevők látják egy­mást, csupán 2 Ψp-ba kerül az 1 körig tartó gondolatátvitel. Ha nem látják egymást, 1 szegmensenként kerül 1 Ψp-ba. A Ψp-ok növelésével növelhető a diszcip­lína időtartama is.

Egyszerre legfeljebb két elme kapcsolható össze Te­lepátiával,  tehát a gondolati úton történő beszélgetésbe nem lehet harmadik  részről sem beleszólni, sem azt lehallgatni.

Az egyetlen olyan diszciplína, mely megtalálja a módját,  hogy hatása átszivárogjon a Statikus Pajzson, noha a Dinami­kus Pajzs ezt is feltartóztatja. Ha egy efféle pajzsot vise­lőnek küldenek Telepátiával üzenetet, az csak azt fogja érzé­kelni, hogy kapcsolatot keresnek vele, ám a beszélgetés csu­pán a fogadó Dinamikus Pajzsának lebomlása után jöhet létre.

A Telepátia mindig csak annak a Ψ-alkalmazónak ke­rül Ψp­-ba, aki a gondolati közlést kezdeményezte.
            `
    },
    {
        name: 'Testhőmérséklet n/cs',
        id: 'testhomerseklet',
        psziPont: 1,
        save: 'mental',
        idotartam: '1 óra',
        varazslasIdeje: '6 kör',
        iskola: 'pyarroni',
        fok: 4,
        leiras: `A diszciplína alkalmazója képes saját vagy másvalaki ­testének hőmérsékletét növelni vagy csökkenteni. Így lehetősége  nyílik a vizes ruhát megszárítani magán, vagy egy lángoló házból  kimenekülni égési sérülések nélkül. Minden felhasznált Ψp 5 fokkal  képes megváltoztatni a testhőmérsékletet.

Az ötven fok fölé növelt testhő hat kör múltán ájulást eredményez,  hosszabb távon halállal jár. A húsz fokra csökkentett hőmérséklet  Tetszhalálhoz vezet - ilyen formán még egy felkészületlen szervezet  is képes életben maradni néhány hónapig -, a húsz fok alá  csökkentett testkő mara­dandó egészségkárosodással jár, míg a  negyedórát megha­ladó öt fok alatti állapot visszafordíthatatlan  folyamattá vá­lik, és az áldozat meghal.

A diszciplína lehetőséget ad arra, hogy 1Ψp-ért 5 fokkal eltérő  hőmérsékletet 1 óráig fenntartsa, 2Ψp-ért az 5 fokos befolyásolást  2 óráig, vagy a 10 fokos változtatást 1 órán keresztül biztosítsa,  stb.
            `
    },
    {
        name: 'Pszi-lökés',
        id: 'pszi_lokes',
        psziPont: 1,
        ke: 20,
        idotartam: 'azonnali',
        iskola: 'pyarroni',
        save: 'nincs',
        fok: 1,
        leiras: `
Más nevén Energialökés. A mágiához legközelebb álló, alapvető  diszciplína. Használata során a Ψ-alkalmazó kis mennyiségű mágikus  energiát gyűjt magába, ám mivel tárolására nem készíti fel a  módszer, azonnal ki is áramlik belőle. A Ψ-lökés irányítható, gyenge szél fuvallat formájá­ban nyilvánul meg. Taszító ereje felhasznált  Ψp-onként 1 kg. Apróbb dolgok felborítására, arréb lökésére  szokták használni, olykor-kellő erővel alkalmazva - tárgyak vagy emberek egyensúlyi helyzetét lehet megszüntetni  vele.
            `
    },
    {
        name: 'Pszi-ostrom',
        id: 'pszi_ostrom',
        psziPont: 1,
        ke: 20,
        idotartam: 'azonnali',
        iskola: 'pyarroni',
        save: 'nincs',
        fok: 4,
        leiras: `
A tudat védelmére felépített Ψ-pajzsok megsemmi­sítésére szolgáló  diszciplína. Két különböző típusa létezik: a Ψ-rombolás és Ψ-bontás.

A Ψ-rombolással a Statikus Pajzsokat lehet meg­szüntetni. A  Statikus Pajzsok nem bonthatóak Ψp-onként - egyszerre kell  lerombolni őket. Ez a következőképp törté­nik:

A diszciplína alkalmazója meghatározza, hogy a Ψ-romboláshoz  hány Ψp-ot kiván felhasználni. Ennyi lesz a Rombolás erősítése.  Ha ez nagyobb (egyenlő), mint a Stati­kus Pajzs erősítése, akkor a  Statikus Pajzs megszűnik, s a pajzshoz felhasznált energia semmivé  válik. Amennyiben a Ψ-romboláshoz valaki kevesebb Ψp-ot használ,  mint amennyiből a Statikus Pajzsot felépítették (legyen az asztrális  vagy mentális), akkor a pajzs teljes erősítéssel megmarad, míg a  Romboláshoz felhasznált Ψp-ok elvesz­nek. A Ψ-rombolás nem árt  a Dinamikus Pajzsoknak.

A Dinamikus Pajzsok kiiktatására a Ψ-bontás szol­gál.  Segítségével akár Ψp-onként is bontható a Dinamikus Pajzs.  Ilyenkor a Bontáshoz felhasznált Ψp-ok mennyiségé­vel meg­egyező Ψp bomlik le a Dinamikus Pajzsból. Ψ-bon­tással nem  támadható a Statikus Pajzs.

Egy 10 Ψp erősségű Statikus Pajzs, csak egy, leg­alább 10 Ψp  erősségű (vagy nagyobb) Ψ-rombolással sem­misíthető meg.  Ekkor a pajzs viselője (a pajzs építéséhez felhasznált, ám az  aktuális Ψp-jaiba nem beleszámító) és a Rombolás alkalmazója  (a Romboláshoz felhasznált) Ψp-jalt is elveszíti. Ha a Ψ-rom­

boláshoz kevesebb, mint 10 Ψp-ot használtak, a Statikus Pajzs  teljes erősítéssel megmarad, míg a Romboláshoz igénybe vett  Ψp-ok elvesznek.

Egy l0 Ψp nagyságú Dinamikus Pajzs lebontható 1, 2 vagy 3  Ψp-onként, de Felhasználtató egyszerre 10 vagy több Ψp is. A Dinamikus Pajzs mindig elveszít annyit az erősségéből, ahány  Ψp erősségű a Bontás. Persze, ha már nincs pajzs, a Romboláshoz  vagy Bontáshoz felhasznált Ψp-ok elvesznek, hiszen ugyanúgy  levonódnak az aktuális Ψp számából, mintha lett volna pajzs.

A Ψ kezdő alkalmazói nem érzékelik, ha egy elmét pajzsok  védenek. 3. fokon már gyenge (Ψp-ot nem igénylő) kon­centrációval megállapítható, ha a tudatot övezi valamiféle vé­delem. Azt azonban, hogy Statikus vagy Dinamikus Pajzsok  működnek, csak a Kyr metódus alkalmazói tudhatják (lásd Kyr  Diszciplínák, Auraérzékelés).

A Ψ-ostrom folytatója következtethet a pajzsok típusaira, hiszen  pontosan érzékeli, ha az Ostrom valamely fajtája sikerrel jár, vagy  ha a felhasznált energiák nem ütköznek ellenállásba.        
            `
    },
    {
        name: 'Pszi-pajzs, Dinamikus',
        id: 'pszi_pajzs_dinamikus',
        psziPont: 1,
        idotartam: 'koncentráció',
        varazslasIdeje: '5 perc',
        iskola: 'pyarroni',
        save: 'nincs',
        fok: 2,
        leiras: `
A Statikus Pajzsokra építhető egyetlen újabb védelmi réteg,  az úgynevezett Dinamikus Pajzs. A 30 körig tartó meditáció után  a Dinamikus Pajzs megmarad mindaddig, amíg az alkalmazó  meg nem szünteti, vagy Ψ-ostrommal le nem bontják. Felépítése után - ellentétben a Statikus Pajz­zsal - bármikor további Ψp-ok  adhatóak hozzá (azaz erősíthető), vagy vonhatóak el belőle. Ez  minden alkalom­mal 1 körig tartó, rövid, meditatív koncentrációt  igényel. Erőssége minden esetben megegyezik az éppen benne  tárolt Ψp-ok mennyiségével, ám az aktuális Ψp-ok számánál  so­sem lehet több. A Dinamikus Pajzsokban tartott Ψp-ok  be­leszámítanak a karakter aktuális Ψp-jaiba, azaz az asztrális  és mentális Dinamikus Pajzsban működő Ψp-ok és a disz­ciplínákra  Felhasználható pontok összessége a Karakter max. Ψp-ja.

Fenntartása folytonos, gyenge koncentrációt igényel, amire a  Ψ-alkalmazó szinte bármely esetben képes - kivéve, ha alszik,  eszméletlen, vagy bármely egyéb okból öntudat­lan. Ha az elmét  valamilyen erős sokk éri, akárcsak egy pillanatra is, vagy a tudatot  megbénítják, a Dinamikus Pajzs rögtön lebomlik.

A Dinamikus Pajzsnak éppen úgy két formája létezik, mint  a Statikusnak (asztrális és mentális), és erőssége is ép­pen úgy  adódik hozzá a ME-hoz. Előnye a Statikus Pajzs­hoz képest,  hogy a benne tárolt Ψ-energia bármikor hozzá­férhető, s fel­használható egyéb diszciplínák alkalmazásához vagy Ψ-ostrom  folytatásához. Hátránya, hogy a Dinamikus Pajzs lebontásával  a támadó nem csak közelebb jutott az elméhez, hanem az  alkalmazót, a diszciplínákra felhasznál­ható Ψp-jai nagy részétől  (a Dinamikus Pajzsban tároltaktól) is megfosztotta.

Dinamikus Pajzs más elméje köré nem építhető.
            `
    },
    {
        name: 'Pszi-pajzs, Statikus',
        id: 'pszi_pajzs_statikus',
        psziPont: 1,
        idotartam: 'végleges',
        varazslasIdeje: '15 perc',
        iskola: 'pyarroni',
        save: 'nincs',
        fok: 1,
        leiras: `
A Ψ pajzsok hivatottak megvédeni az  elmét a mági­kus és Pszi befolyások ellen. A  alkalmazó agyi energiáiból erőteret épít tudata köré, melyen a tudati támadások  fenna­kadhatnak. A Statikus Prajzs egyfajta  állandó védelem, ami mindaddig óvja a  tudatot, amíg azt az alkalmazó meg nem  szünteti, vagy valaki le nem Rombolja.

A Statikus Pajzs erőssége annyi, ahány  Ψp-ból épí­tették. Gyakorlati hatása ab­ban nyilvánul meg, hogy a pajzs erősségét  hozzáadjuk a Tudatalatti Mágiaellenál­ láshoz és így dobjuk az ME-t. Két különböző típusú Statikus  Pajzs létezik: asztrális és mentális. Az Asztrális Pajzs az asztrális  támadások ME-ához adódik hozzá, míg a Mentális Pajzs a mentális  ME-hoz.

A Statikus Pajzs, miután felépült, többé nem befolyá­solható: Ψp-okot sem elvonni, sem hozzáadni nem lehetsé­ges.  Védő hatását akkor is kifejti, ha a Ψ-alkalmazó alszik, esz­méletlen, vagy bármely egyéb okból öntudatlan, hiszen immár  az elmétől függetlenül működik. Lebontani is csak újabb  kilencven körön át tartó meditációval lehet vagy Ψ-ostrommal  (lásd Általános Diszciplínák, Ψ-ostrom).

A Statikus Pajzshoz felhasznált Ψp-ok a későbbiek­ben nem  számítanak bele az aktuális Ψp-ok számába. Ez azt jelenti, hogy  az alkalmazó megteheti, hogy egy békés napon az összes Ψp-ját  Statikus Pajzsok emelésére fordítja, majd pihenés után ismét  maximális Ψp-jaira támaszkodhat - noha tudatát már védik) a  Statikus Pajzsfok). Minden elme köré legfeljebb egy asztrális és egy  mentális Statikus Pajzs épít­hető.

Statikus Ψ-pajzs, mesterfokú alkalmazással bárki el­méje köré  (nemcsak ember, de lélekkel rendelkező állat) építhető, ám a  más elme köré épített pajzs, akárki építette is (harcművész,  kardművész vagy varázsló), bárki által alkal­mazott Ψ-ostrommal  lerombolható.
    `
    },
    {
        name: 'Membrán',
        id: 'membran',
        psziPont: 10,
        idotartam: 'végleges',
        varazslasIdeje: '5 perc',
        iskola: 'pyarroni',
        save: 'nincs',
        fok: 5,
        leiras: `
A membrán a Statikus Ψ-pajzs egy változata. Éppúgy körbevehető vele az elme, működtetésére többé nem kell Ψ-pontot áldozni, s lerombolni is csak ahhoz hasonlóan, Ψ-ostrommal lehet.

A Membrán nem védi az elmét, hanem figyelmezteti a rá irányuló passzív Ψ-tevékenységre. A membrán felépítője megérzi, ha huzamosabb ideig figyelik, s azt is meg tudja határozni, merről. Azonnal tudomására jut, ha Asztrál vagy Mentál Szemmel rápillantanak. Természetesen akkor is nyomban riaszt, ha asztrál vagy mentál varázslattal próbálnak hatni a viselőjére. Ha a Ψ-használó nem a saját, hanem más elméjét övezi Membránnal, bármilyen távol tartózkodjék is, tudomására jut, ha a viselőre a fent említett mágikus módszerekkel hatnak.

A membrán magától soha nem vész el, csak felépítője képes lebontani, vagy 10 E erősségű Ψ-ostrom.
    `
    },
    {
        name: 'Csettintés',
        id: 'csettintes',
        psziPont: 0,
        idotartam: 'azonnali',
        varazslasIdeje: 'azonnali',
        iskola: 'pyarroni',
        save: 'nincs',
        fok: 1,
        leiras: `
A diszciplina alapvető képessége minden Ψ-használónak. Oly kevés mentális energia használódik el alkalmazásakor, hogy Ψ-pontban nem mérhető, ezért a Csettintésre nem kell Ψ-pontot áldozni. Egyszerre egyvalakivel szemben használható, mindössze annyi történik, hogy az illető tudomást szerez a diszciplina alkalmazójáról. A hatás hasonló ahhoz, mint amikor egy csendes teremben valaki csettint. A "csettintést" csak a kiszemelt "áldozat" hallja, nem tudja, kitől származik, de tudja, milyen irányban keresse őt. Tapasztalatlan emberek első reakciója feltétlenül az, hogy az alkalmazó irányába, netán rápillantanak.
A Csettintés csak azzal szemben használható, akit az alkalmazó lát.
    `
    },
    {
        name: 'Összpontosítás',
        id: 'osszpontositas',
        psziPont: 1,
        idotartam: 'azonnali',
        varazslasIdeje: '1 kör',
        iskola: 'pyarroni',
        save: 'nincs',
        fok: 3,
        leiras: `
A diszciplina legtöbb 1 kör időtartamig egyetlen adott feladat megoldására elegendő misztikus, belső erővel ruházza fel alkalmazóját. Az illető ezáltal képes lesz olyan próbatételek sikeres végrehajtására, melyekre egyébként álmában sem lenne alkalmas. 1 Ψ-pont felhasználásával +1-gyel, százalékos próba esetén +5%-kal növelheti az esélyeit. Egyszerre legtöbb annyi Ψ-pontot képes felhasználni ilyen célra, amennyi a Ψ-használati Szintje.

Mivel az 1 teljes körig tartó összpontosítás után az első tevékenység maga a próbatétel kell legyen, a diszciplina aligha használható közelharcban. Annál inkább lesből leadott, célzott lövésben (+5 CÉ/Ψ-pont).`
    },
    {
        name: 'Abszolút Látás',
        id: 'abszolut_latas',
        psziPont: 8,
        idotartam: 'végleges',
        varazslasIdeje: 'azonnali',
        iskola: 'pyarroni',
        save: 'nincs',
        fok: 5,
        leiras: `
A diszciplina alkalmazója nem anyagi testének tökéletlen látószervén, a szemen keresztül lát, hanem sokkal kifinomultabb lelki szemét használja. Ezáltal egyszerre nem csak egy irányba nézhet, hanem teljes körben - jobbra, balra, előre, hátra, fel és le - lát egyidejűleg; mi több, mindent élesen, hisz nem szükséges szemét a kérdéses távolságra fókuszálnia.

Az Abszolút látás egyetlen hátránya a rövid látótávolság: csak 20 méter sugarú körön belül használható, azon túl minden teljes sötétbe borul. Az érintett területen azonban tökéletesek a látási viszonyok, függetlenül a fényviszonyoktól - azaz teljes sötétségben is minden látható. Az Abszolút látással sem pillanthatóak meg ellenben a láthatatlan tárgyak, a rejtőző emberek vagy takarásban lévő dolgok; ahogyan a mágikus sötétség is gátat szab használatának.

Hátulütője is akad: az érintett területen belül a Szimbólumok, a Mágikus tekintet - és az összes látáson alapuló mágikus befolyás - azonnal kifejti hatását az alkalmazóra.

Az Abszolút látás megértéséhez elvont gondolkodás szükséges, hiszen nehéz felfogni a fókuszálás nélküli teljes körívű látást a százhúsz fokos látótérhez szokott emberi elmének. Éppen ezért - az átállás miatt- igényel sok mentális energiát (Pszi-pontot) a diszciplina alkalmazása.

Maga az Abszolút látás - a normál látáshoz hasonlóan - nem igényel Pszi-pontot, csak az átállás: a lelki szemre való átkapcsolás. Azaz az Abszolút látás bármeddig használható, míg csak alkalmazója vissza nem kíván térni a szokványos módszerhez; ekkor újra a diszciplinához kénytelen fordulni, hogy normál látását visszanyerje.

Az Abszolút látás során a szem a semmibe réved, a szembéjak gyakorta le is csukódnak, így a hirtelen felvillanó éles fény - legyen bár mágikus - sem tehet kárt az alkalmazó látásában.

Az Abszolút látás diszciplina magas mentális felkészültéset igényel, ezért - dacára annak, hogy az alkalmazó önmagára vonatkoztatva használja - alkalmazása Mesterfokú Pszi képzettséget igényel. Mivel az Abszolút látásban a szem nem játszik szerepet, a diszciplinát vakok és bekötött szeműek is alkalmazhatják. Harcban megszünteti a hátulról vagy félhátulról támadók előnyeit, s így kizárólag a "Harc több ellenfél ellen" módosítói érvényesülnek.
    `
    },
    {
        name: 'Szinesztézia',
        id: 'szinesztezia',
        psziPont: 1,
        idotartam: '1 kör',
        save: 'nincs',
        ke: 10,
        iskola: 'pyarroni',
        fok: 3,
        leiras: `
A diszciplina alkalmazója képes Érzékközpontjában a látáshoz kapcsolni a más érzékszervein keresztül észlelt ingereket. Ily módon színes fénynyalábok formájában megpillanthatja a hangokat és a szagokat, s könnyűszerrel felismerheti forrásukat. Varázshasználók a Szinesztézia által a leplezetlen mágiát is megpillantják, mivel az derengő auraként világít a mágikus tárgy, személy, hely körül. Hatodik érzékkel együtt alkalmazva a diszciplina hasonló aurával leplezi le az alkalmazóját veszélyeztető tárgyat, ill. személyt.

Nem szükségszerű, hogy éppen a látás legyen a kedvezményezett érzékszerv, ez csak az emberi és hozzá hasonló fajok esetében természetes, mivel ők leginkább a látásukra hagyatkoznak. Elviekben más érzékszerv használata is elképzelhető, bár ezt - úgy tudni - egyetlen pszi-mester sem oktatja és ismeri.

A Szinesztézia alkalmazásakor minden érzékszerv ingerei más színben és erősségüktől függően egyre világosabb árnyalatban (egyre nagyobb fényerővel) jelennek meg. Általánosan a következő színek használatosak.

|Érzékszerv   |Szín |Ψ-pont|
|-------------|-----|------|
|hallás       |sárga|1     |
|szaglás      |zöld |2     |
|mágia        |kék  |2     |
|hatodik érzék|vörös|3     |

A Ψ-pont rovat megmutatja, mennyi Pszi energiát emészt fel az adott érzékszerv látáshoz kapcsolása 1 körre. Több érzék együttes átkapcsolásakor az értékek összeadódnak, az időtartam növelésekor pedig körönként többszöröződnek.
    `
    },
    {
        name: 'Érzék-tisztítás',
        id: 'erzektisztias',
        psziPont: 1,
        idotartam: 'végleges',
        varazslasIdeje: 'azonnali',
        iskola: 'pyarroni',
        fok: 1,
        save: 'nincs',
        leiras: `
A diszciplina alkalmazója 1 Ψ-pontért megtisztíthatja egyik érzékszervét, melyet a korábbi nagy erejű ingerek eltompítottak. Verőfényről a barlang sötétjébe lépve azonnal "hozzászoktatja" szemét a megváltozott fényviszonyokhoz; a fülsértő ricsajt követő csendben is kifinomultan hallgatózhat; egyetlen röpke pillanat alatt száműzheti orrából a korábbi bűz vagy illatfelhő szaglást bénító utóhatásait.
    `
    },
];

export const PSZI_SLAN: Array<PsziDiszciplina> = [
    {
        name: 'Aranyharang',
        id: 'aranyharang',
        psziPont: 1,
        idotartam: '2 kör',
        varazslasIdeje: '1 kör',
        save: 'nincs',
        iskola: 'slan',
        fok: 3,
        leiras: `
A tudat test feletti tökéletes uralma nyilvánul meg ebben a diszciplinában. Segítségével az alkalmazó képessé válik testét élő páncéllá alakítani. Ezt izomzata átrendezésével, és Ψ-energáinak  erős kisugárzásával éri el. Az Aranyharang éppen olyan Sebzés Felfogó Értéket ad alkalmazójának, mint bármilyen páncél - az így  nyert SFÉ megegyezik a felhasznált Ψp-ok számával. A diszciplína  az egyik legnehezebben elsajátítható és legveszedelmesebb Ψ­alkalmazási módszer. Éppen ezért az alkalmazó nem használhatja  korlátlanul: maximális mértéke megegyezik az alkalmazó Tapasztalati  Szintjével. Ez a gyakorlatban azt jelenti, hogy az Aranyharang  SFÉ-je sosem lehet nagyobb a diszciplínát használó Tapasztalati  Szintjénél (azaz egy 4. szintű Slan legfeljebb 4-es SFÉ-jű  Aranyharangot képes csinálni).

1 Ψp-ért 1-es SFÉ nyerhető 2 körre, 2 Ψp-ért 2-es SFÉ 2 körre,  vagy 1-es SFÉ 4 körre, stb.`
    },
    {
        name: 'Belső idő',
        id: 'belso_ido',
        psziPont: 10,
        idotartam: '1 szegmens',
        varazslasIdeje: 'azonnali',
        save: 'nincs',
        iskola: 'slan',
        fok: 5,
        leiras: `
A Slan Pszi mentális alkalmazásának tökélyre vitele. A diszciplína alkalmazója képes saját belső idejét annyira lelassítani, hogy minden – a valóságban – 1 szegmensnyi időt egy teljes körnek érzékel. Ez  lehetőséget nyújt az alkalmazónak, hogy az eseményeket jobban  végiggondolva mérlegeljen, s hogy az eltelt valós idő helyett a saját  belső ideje szerint alkalmazzon Ψ diszciplínákat. Mindemellett a  Slan-út Belső Ideje nemcsak a gondolati folyamatokat gyorsítja fel,  hanem a diszciplína használójának testét is, így az alkalmazónak  minden szempontból egy teljes köre van cselekedni, míg a külvilág számára csupán 1 szegmens telik el.

A külső szemlélő érzékei szinte követhetetlen gyorsaságúnak  találják a diszciplína alkalmazóját. A  használat során az alkalmazó képes kitérni a mágikus lövedékek elől, a rálőtt nyílvesszőket akár puszta kézzel is megfoghatja, és  lehetetlen meglepetésszerű támadást intézni ellene.

10 Ψp felhasználásával a valós idő 1 szegmense lassítható le, 20 Ψp-ért már két szegmens, stb.`
    },
    {
        name: 'Chi-harc',
        id: 'chi_harc',
        psziPont: 1,
        idotartam: 'lásd a leírást',
        varazslasIdeje: 'azonnali',
        save: 'nincs',
        iskola: 'slan',
        fok: 1,
        leiras: `
A Chi-harc nem más, mint a harc- vagy kardművész azon  tudása, mely segítségével a belső energiáit harc közben a teste  szolgálatába állíthatja. Ettől lesz több minden egyéb puszta­kezes verekedőnél és fegyverhasználónál - ez a harc művészete.  Az alkalmazás közben mozdulatai csiszoltabbá, pontosabbá  válnak, saját belső ideje lelassul. Ütéseiben nemcsak izomzatának  ereje és testének súlya nyilvánul meg, hanem felszabadított  tudati energiái is. A harcművész puszta keze - ha úgy kívánja  - a legélesebb karddal lesz egyenértékű, vagy buzogányként  zúz. A kardművész eggyé válik fegyverével, mintegy saját  végtajaként érzékeli azt.

A Chi-harc folyamán nem lehet meglepni az alkalmazót, és  lehetetlen olyan módon harcolni, hogy az ellenfél csak ártalmatlanná  váljon. Használat  során az alkalmazó vonásai összpontosításról árulkodnak, arca  kifejezéstelen kőmaszknak hat, tekintete maga elé mered, hiszen  nem csak a szemére, hanem érzékeinek együttesére hagyatkozik.  Mondják, a Slanek az effajta állapotot a Sárkány ébredésének  nevezik.

A Chi-harc hatékonyságát az alábbi táblázat mutatja.

|Tsz|Sebesség|Időtartam|TÉ,VÉ|KÉ  |Sebzés|
|---|--------|---------|-----|----|------|
|1  | +10%   | 1 kör   | +10 | +2 | +1   |
|3  | +20%   | 1 kör   | +15 | +4 | +3   |
|5  | +30%   | 2 kör   | +20 | +6 | +5   |
|7  | +40%   | 2 kör   | +25 | +8 | +7   |
|9  | +50%   | 3 kör   | +30 | +10| +9   |
|11 | +60%   | 4 kör   | +35 | +12| +11  |
|13 | +60%   | 5 kör   | +40 | +14| +13  |
|15 | +60%   | 6 kör   | +45 | +16| +15  |
|17 | +60%   | 7 kör   | +50 | +18| +17  |
|19 | +60%   |korlátlan| +50 | +20| +19  |

A diszciplína alkalmazása roppant mód igénybe veszi a testet és a
szellemet. Ezért amikor az Időtartam lejár, a felhasználónak annyi körig „pihennie” kell,
mielőtt újra használhatná, amennyit a diszciplína hatása alatt töltött. A pihenés itt mindössze
annyit jelent, hogy a karakternek „normál harcot” kell folytatnia, de más diszciplínákat
alkalmazhat. További pszi pontok rááldozásával a TÉ, VÉ, KÉ és a sebzés nem növelhető.
Ezen értékek csak a fent közölt mértékben változnak.

Elnyújtható viszont a megszakítás nélkül folytatott Chi-harc időtartama, ez azonban
még inkább megterheli az alkalmazó Harcművész szervezetét.
A következő táblázat arról ad felvilágosítást, hogy mennyi pszi pontot kell még áldoznia
az alkalmazónak, ha meg kívánja hosszabbítani a diszciplína hatása alatt tölthető időt:

|További körök száma|Pszi pont|
|-------------------|---------|
|1                  | 4       |
|2                  | 9       |
|3                  | 16      |
|4                  | 25      |
|5                  | 36      |
|6                  | 49      |

Ezek szerint, egy, 6. Tsz-ű harcművésznek, ha 4 kört óhajt Chi-harcban tölteni, 15
pszi pontot kell kifizetnie. 2 kört tölthetne elméletileg a diszciplína hatása alatt, ez (2x 1 pszi
pont = 2 pszi pont), az első plusz kör még 4 pszi pontba, a második további 9-be kerül: 2 + 4 + 9 = 15.
Persze a kényszerpihenő hossza is 4 körre növekszik az időtartam lejárta után.

Chi-harccal egyidejűleg semmilyen más diszciplína hatása nem működhet, kivéve a
pajzsok fenntartását, a Kiáltás és az Aranyharang nevű diszciplínákat. Ez azokra az esetekre is
vonatkozik, amikor a Harcművész olyan diszciplínát használ, aminek a fenntartásához nincs
szükség további koncentrációra, és még a hatás időtartama alatt megpróbál Chi-harcot
folytatni. Ilyenkor vagy a Chi-harc nem valósul meg, vagy másik alkalmazás hatása ér
azonnal véget.

A Harcművészek fegyvertára esetenként igen gazdag lehet, ám nem minden általuk
ismert fegyverrel képesek a Chi-harc alkalmazására. Hogy melyek azok, amelyeket a
diszciplína hatása alatt forgatni tudnak, az az egyes iskolák, specializációk leírásánál található
meg. Természetesen puszta kézzel valamennyi Harcművész képes a Chi-harc folytatására.

A Kardművészek kizárólag Slan-kardjukkal vagy Slan-tőrükkel alkalmazhatják. 
        `
    },
    {
        name: 'Érzékelhetetlenség',
        id: 'erzekelhetetlenseg',
        psziPont: 8,
        idotartam: '1 kör',
        varazslasIdeje: '1 kör',
        save: 'nincs',
        iskola: 'slan',
        fok: 4,
        leiras: `
A diszciplína alkalmazója mozdulatlanná dermedve képes érzékelhetetlenné válni. Ebben az állapotában még a legélesebb érzékszervek szá­mára sem fedezhető fel, legfeljebb tapintással, és kikerül a Hatodik Érzék ha­tósugarából is. Az Érzé­kelhetetlenség folyamán semmilyen tevékenység (mozgás, harc, Ψ-alkalmazás, vagy kommunikáció) nem végez­hető.

A Kyr metódus Auraérzékelése előtt is rejtve marad, csupán olyan Láthatatlansági észleléssel fedezhető fel, mely legalább 4-es  erősitésű.

8 Ψp felhasználásával 1 körig alkalmazható a diszciplína, 16Ψp-ért 2 körig, stb.
    `
    },
    {
        name: 'Halálos ujj',
        id: 'halalos_ujj',
        psziPont: 3,
        idotartam: '24 óra',
        varazslasIdeje: 'azonnali',
        save: 'nincs',
        iskola: 'slan',
        fok: 5,
        leiras: `
A Pszi energiák koncentrált, romboló kisugárzásának mód­szere Yadegori Chunin nevéhez fűződik. Yadegori ellentétben a  híresztelésekkel kardművész volt, noha a pusztakezes harc­művészet nagymestereként tartják számon. Ennek oka, hogy  közel tíz évet töltött az Oltalmazó Keleti Szél kolostorában,  ahol Enoszukéról magával hozott tudását tanította a szer­zeteseknek. Hamar híressé vált, s elterjedt róla, hogy egyetlen  érintésével képes ölni. A Gyémántok évének nyolcadik havában  Yi Chien Mu császári herceg, máig ismeretlen okból párviadalra  hívta ki. Yadegori többször visszautasította a kihívást, ám egy  ízben a herceg meditáció közben zavarta meg, s tisztelet­lenségével addig provokálta, míg az enoszukei mester- anélkül,  hogy egy szót szólt volna - odalépett a herceghez és muta­tóujjával megbökte. Yi Chien Mu azonnal kiszenvedett. Az  esetnek hamar híre ment, így Yadegori kénytelen volt menekülni.  Azonban mielőtt elhagyta volna a kolostort, megtanította a  rendfőnököt arra a diszciplínára, melynek segítségével megölte  a császári herceget. A Halálos ujjat - nevezik Yadegori érintésének  is - sokáig titkos tanításként kezelték, csak nemrég jutott el  Tiadlanba, ahol is a legtöbb Slan iskola átvette és tanítani  kezdte. ­

A diszciplínát a legveszélyesebb Ψ-alkalmazásnak tarják.  Használatával időzített belső sérülések okozhatók. Az alkalma­zónak meg kell érinteni valamelyik mutatóujjával ellenfelét. Ez  harci szituációban sikeres támadást igényel. Az okozott sérülés  az alkalmazó akarata szerinti - de huszonnégy órán belül eső ­időpontban keletkezik, gyógyítása nem lehetséges. A disziplína  minden esetben Ép veszteséget okoz, s a páncélok Sebzés Felfogó  Értéke nem vonódik le belőle, sőt az Aranyharang sem jelent  védelmet hatása ellen.

Nehézsége okán nem alkalmazható korlátlanul: minden  Tapasztalati Szinten csak 1 Ép sérülés okozható, mely 3 Ψp  felhasználásába kerül. Második TSz-en már 6 Ψp rááldozásával 2  Ép veszteség érhető el, stb.
            `
    },
    {
        name: 'Jelentéktelenség',
        id: 'jelentektelenseg',
        psziPont: 6,
        idotartam: '1 perc',
        varazslasIdeje: 'azonnali',
        save: 'nincs',
        iskola: 'slan',
        fok: 2,
        leiras: `
A Slan-ek életük nagy részét- míg ki nem kerülnek a kolostorból vagy iskolából - csöndes önmagukba zárkózással, nyugalmas  elmélyedéssel töltik. A szinte észrevétlen jelenlét, háttérbe húzódó  viselkedés az effajta életmód egyik alapkövetelménye. Mindezt tökélyre  fejlesztve, és a Ψ-energiákat is segítségül hívva, a Slan-út alkalmazói  elérték, hogy a teljes jelentéktelenség aurájába burkolózhassanak.

A diszciplína használatakor az alkalmazó nem tűnik fel a  legéberebb őrnek, a legfigyelmesebb szemlélődőnek sem. A rá­irányított tekintet lesiklik róla, jelentéktelen, figyelmet nem érdemlő  senkinek hat. A tudatos érzékelések persze felfedezik (Aura­érzékelés, Láthatatlanság Érzékelés, Hatodik Érzék) és lelepleződik  akkor is, ha a gyanakvó szemlélő sikeres Érzékelés Próbát dob -20-szal. Ha azonban az alkalmazó már elhagyta a helyszínt - ahol  a diszciplína segítségével sikerült észrevétlennek maradnia - hiába  járt le a jelentéktelenség időtartama, nem ébred gyanú senkiben.

Közönséges példája ennek, ha az alkalmazó úgy kíván halálos  ellenségeinek táborán végighaladni - esetleg kikémlelni azt -,  hogy járása-kelése észrevétlen maradjon. Ilyenkor a diszciplína  segítségével jelentéktelenné válik, s az őrök meg a táborlakók ­sikeres Érzékelés Próba, vagy tudatos érzékelés híján - nem  figyelnek föl rá: maguk közé tartozónak tekintik. Miután a tábort  elhagyta, senkinek sem jut eszébe, hogy idegen járt közöttük.  Távozása éppúgy jelentőség nélkül való, mint jelenléte. A diszciplína  alkalmazása közben szólni, beszédbe elegyedni nem lehet - ez  azonnali lelepleződéssel jár -, miképpen a harcba bocsátkozás is  megszünteti a jelentéktelenséget.

A diszciplína értelmetlen alkalmazása szintén balul üthet ki:  magányos emberhez odamenni, vagy hegyi óriások falujába  besétálni - azaz bármi olyat tenni, amikor nincs mód a környezetben  tartózkodókkal való azonosulásra - nem vezethet sikerhez.

A Jelentéktelenség 6 Ψp-ért 1 percig tartható fenn, 12 Ψp-ért 2 percig, stb.            
`
    },
    {
        name: 'Levitáció',
        id: 'levitacio',
        psziPont: 1,
        idotartam: '1 óra',
        varazslasIdeje: '1 kör',
        save: 'nincs',
        iskola: 'slan',
        fok: 1,
        leiras: `
Meglehetősen kevés gyakorlati alkalmazhatósággal bíró  diszciplína, ám a Slanek szertartásainak elengedhetetlen kelléke.  Az emberi test súlyának teljes leküzdésére szolgál, alkalma­zásával föld feletti lebegésre nyílik mód. 1 Ψp felhasználásával 1  órán keresztül lehet I méter magasságban lebegni, 2 Ψp-ért már  két órán keresztül tartható fenn a diszciplína hatása. A Levitáció  magassága nem növelhető, ám az alkalmazó bármekkora súly – amennyiben a teste korlátai elbírják – felemelésére képes. A diszciplína  használata közben a Slan teste sebezhetetlenné válik bármely nem mágikus fegyverrel szemben. A diszciplína folyamatos  koncentrációt igényel, közben fizikai támadás, egyéb diszciplína  vagy varázslat használata nem lehetséges.
        `
    },
    {
        name: 'Statikus Ψ-pajzs (Slan)',
        id: 'pszi_pajzs_statikus_slan',
        psziPont: 1,
        idotartam: 'végleges',
        varazslasIdeje: '15 perc',
        save: 'nincs',
        iskola: 'slan',
        fok: 1,
        leiras: `
A Slan-út alkalmazói által gerjesztett Statikus Pajzs felépítésében  gyökeresen különbözik a Pyarroni módszer segítségével létre­hozottól, ám működésében és alkalmazásában teljesen megegyezik  azzal. A pontos leírást lásd az Általános Diszciplínák, Statikus Ψ­pajzs diszciplína tárgyalásánál.

A valódi különbség a végeredményben mutatkozik meg: a Slan­ út Statikus Ψ-pajzsát senki nem képes lerombolni, csak maga az  alkalmazó szüntetheti meg és építheti újra. Efféle pajzsot a Slan  csak saját elméje köré képes felhúzni.
        `
    },
    {
        name: 'Testsúly változtatás',
        id: 'testsuly_valtoztatas',
        psziPont: 1,
        idotartam: '3 kör',
        varazslasIdeje: '1 kör',
        save: 'nincs',
        iskola: 'slan',
        fok: 3,
        leiras: `
A diszciplína használatával a Ψ-alkalmazó képes saját test­súlyát megnövelni, avagy lecsökkenteni. Ezáltal képessé válik több  emelet magasra felugrani, a havon futni anélkül, hogy mély nyomot  hagyna, esetleg gyorsabban úszni. A diszciplínával nem változtatható  meg az alkalmazó által hordott vagy viselt tárgyak súlya.

Az alábbi táblázatból kiderül, hogy a testsúly különböző mér­tékű megváltoztatása mennyi Ψp-ba kerül. A felhasznált Ψp-ok  növelésével a diszciplína Időtartama is meghosszabbítható.        

|+/- módosítás az eredethez képest|1kg|3 kg|5 kg|9 kg|13 kg|31 kg|2x|3x|
|---------------------------------|---|----|----|----|-----|-----|--|--|
|Ψp                               |1  |2   |4   |7   |10   |20   |30|35|
        
Háromszorosnál jobban növelni, vagy harmadánál kevesebbre  csökkenteni a testsúlyt bármennyi Ψp rááldozásával sem lehet.
        `
    },
    {
        name: 'Tetszhalál',
        id: 'tetszhalal',
        psziPont: 6,
        idotartam: '1 óra',
        varazslasIdeje: '10 kör',
        save: 'nincs',
        iskola: 'slan',
        fok: 3,
        leiras: `
Az alkalmazás segítségével lehető­ség nyílik a test élettani folyamatainak  felfüggesztésére. Ilyenkor az alkalmazó  semmiféle életjelet nem ad, nincs szüksége  táplálékra vagy folyadékra, de még levegőre  sem. Mozdulatlanná válik-olyan ez, akár  a halál dermedtsége - és kihűl, a tudati  Folyamatok megszűnnek, így lebomlik a  Dinamikus Pszi-pajzs, csupán a Statikus  marad meg. Ezzel szemben az Asztrál- és  a Mentáltest nem alszik, így az alkalmazó  továbbra sem lehet alanya a Természeti  Anyag Mágiájának. Az alkalmazónak előre  el kell döntenie a Tetszhalál időtartamát,  mert nincs rá mód, hogy az időtartam  lejárta előtt félbeszakítsák a diszciplínát.  Tetszhalál állapotában semmiféle fájdalom (FP) nem okozható, és a testet ért (ÉP) sérülések feleződnek. Az  egyetlen olyan diszciplína ez, melynek alkalmazása során  valóban regenerálódik a test. Minden Tetszhalálban töltött óra  alatt 1 ÉP regenerálódik - azaz gyógyul magától -, és 10 FP.  Maximuma fölé sem az ÉP, sem az FP nem emelkedhet. A  szervezetbe került mérgek hatóideje háromszorosára lassul,  ráadásul sebzésük is harmadolódik.

A Tetszhalál felfedezése csak a Kyr Metódus Auraérzékelésével  lehetséges.

A Ψp-ok megduplázásával az időtartam megkétszereződik,  triplázásával megháromszorozódik, stb.
        `
    },
    {
        name: 'Kiáltás',
        id: 'kialtas',
        psziPont: 5,
        idotartam: 'azonnali',
        varazslasIdeje: 'azonnali',
        save: 'nincs',
        iskola: 'slan',
        fok: 2,
        leiras: `
A diszciplina segítségével a harcművész szellemi energiájával támadásának erejét fokozhatja. A Kiáltás kíséretében végrehajtott támadás rombolóerejét tekintve tökéletes, Sebzésének meghatározásakor nincs szükség kockadobásra, minden esetben a lehetséges maximumot sebzi. Ez persze függ a támadó fegyvertől, az alkalmazó Tapasztalati Szintjétől és még sok egyébtől.

A belső energiákat elnyújtott kiáltás szabadítja fel - innen kapta nevét a diszciplina. Kiáltás híján a várt hatás is elmarad. Mindig egyetlen támadást befolyásol, csak annak sebzését növeli. A felhasznált Ψ-pont akkor is elveszik, ha a támadás sikertelen. A diszciplinát a harcművész egy kör alatt legtöbb annyiszor használhatja, ahányadik Tapasztalai Szintű - természetesen minden újabb "megerősített" támadás további 5 Ψ-pontba kerül.

A Kiáltás Chi-harcban is alkalmazható.
    `
    },
    {
        name: 'Kitérés',
        id: 'kiteres',
        psziPont: 4,
        idotartam: '1 kör',
        varazslasIdeje: '1 szegmens',
        save: 'nincs',
        iskola: 'slan',
        fok: 2,
        leiras: `
A diszciplina alkalmazásakor a Slan belső ritmus diktálta táncba kezd. Egyfajta intuitív révület ez, mely alatt előre látja a ráváró veszedelmeket, ezért nagy biztonsággal képes kitérni előlük. A Kitérés időtartama alatt a hajított fegyverek és célzott lövedékek elméletileg nem találhatják el, a gyakorlatban a véletlen néha mást eredményez: a 00-ás dobások eredményesek ellene is. A diszciplinát 4 Ψ-pontért 1 körig képes alkalmazni, s ez idő alatt nem támadhat, nem végezhet más Ψ-tevékenységet. Egy adott körben minden slan legtöbb annyi lövedék elől képes kitérni, amennyi a Ψ-használati Szintje.
        `
    },
    {
        name: 'Zavarás',
        id: 'zavaras',
        psziPont: 20,
        idotartam: 'azonnali',
        varazslasIdeje: 'azonnali',
        save: 'nincs',
        iskola: 'slan',
        fok: 3,
        leiras: `
A Zavarás olyan rövid tudati csapás, mely képes kibillenteni ellenfelünket
koncentrációjából, megzavarni meditációját, megtömi a Transzállapotot. A legtöbb pszi diszciplína azonnal megszakad, ha alkalmazója ellen sikeres Zavarást hajtottak végre. Kivételt
csupán a Tetszhalál képez. Hogy sikeres legyen, a Zavaráshoz legalább eggyel több pszi
pontot kell felhasználni, mint amennyi a megzavarni kívánt személy mentális Pajzsaiban
(Statikus és Dinamikus) van, ám ha ez a feltétel teljesül, akkor nincs helye további TME-nek.
A Zavarás nem bontja le a megzavart lény pajzsait, csupán keresztülférkőzik rajtuk, hatását
még abban a szegmensben kifejti, és megszűnik. Az áldozat sem abban a körben, sem a
következőben nem képes semmi olyasmit cselekedni, mely komoly koncentrációt igényel,
azaz Pszit használni vagy varázsolni.
        `
    },

]

// export const PSZI_KYR: Array<Varazslat> = [
//     {
//         name: 'Energiagyűjtés',
//         pont: 'lásd a leírásban',
//         varazslasIdeje: 'lásd a leírásban',
//         labels: ['pszi', 'pszi-kyr'],
//         description: `
//         A Kyr metódus legalapvetőbb diszciplínája, a varázslók  tudományának alapja. Segítségével a varázsló elméjébe gyűjtheti  a világegyetemet átható mágikus energiát (Mana-pont), az  energiát, melyhól a varázslatait létrehozza. Természetesen egy­szerre maximum annyit, amennyit befogadni képes. Erről a  mennyiségről a Tapasztalati Szint függvényében a max. Mana­pont tudósít. Az Energiagyűjtés leegyszerűsítve nem más, mint a  Ψ-pontok Mana-pontokra váltása - a váltószám az Energiagyűjtésre alkalmazott módszertől függ. Itt csak a három alapvető módszert  ismeretetjük: a Meditációs-formula, a Kivonás és a Kisajtolás.

//         A Meditációs Formula (1 Ψp = 10 Mp) alkalmazásához a  varázslónak Meditációs Varázskörben kell tartózkodnia (ennek  elkészítése 18 Mana-pontba kerül és 30 percbe telik) és ott 1 óra  hosszan transzállapotban meditálnia (lásd Transz diszciplína).  Már ebből is látszik, hogy ennél a módszernél jelentős elő­készületekre van szükség, s a varázsló másfél óra hosszan helyhez  van kötve. Mégis, a varázslók, ha idejük és körülményeik engedik,  ehhez az energiagyűjtési módszerhez folyamodnak, mert így  juthatnak a legtöbb mágikus energiához (Mp) a legkevesebb Ψ­pontért.

//         Ha a meditáció bármely okból félbeszakad, az Energiagyűjtés  sikertelen lesz, s a felhasznált Ψ-pontok is elvesznek. Mi több, a  varázsló elméjéből elillan a már korábban begyűjtött energia is,  azaz Mana-pontjainak száma nullára zuhan.

//         Ha az 1 órás meditáció zavartalanul véget ér, azzal a varázsló  sikerrel gyűjtötte elméjébe a kívánt mennyiségű mágikus energiát.  Tízszer annyi Mana-pontot kap, ahány Ψ-pontot a diszciplína  alkalmazásásra fordított; tehát a Meditációs formula alkal­mazásával 1 Ψ-pontért l0 Mana-pont jár.

//         Kivonáshoz (1 Ψp = 3 Mp) a varázslók olyankor folya­modnak, ha kifogytak az elméjükben tárolt energiából, és  sürgősen utánpótlásra van szükségük. A sietségért cserébe a  kisebb hatékonysággal fizetnek - a módszer a Ψ-pontok  valóságos pazarlása! Ellenben csak 2 körig tart, és sem Transz,  sem Meditációs Varázskör nem kell hozzá; azaz semmiféle  előkészületet nem igényel, mindössze némi összpontosítást.  Közben a varázsló sétálhat, léptethet a lován, de nem harcolhat,  varázsolhat, s nem alkalmazhat más diszciplínát.

//         A módszer alkalmazásakor a varázsló kivonja környezetéből a  többletenergiákat, mindenhonnan csak keveset és csak a felesleget  - nem árt senkinek és semminek. Kivonással háromszor annyi  Mana-pontthoz jut, mint amennyit a diszciplínára áldozott; tehát  1 Ψ-pontért 3 Mana-pontot.

//         A Kisajtolás (1 Ψp = 5 Mp) természetéből fakadóan feketemágia!  Alkalmazásakor a varázsló nem a felesleget vonja el a környezetétől,  hanem kisajtót abból annyi energiát, amennyit csak képes. A folyamat  eredményeként a varázsló Zónájában (20 m sugarú gömb) a növények  elszáradnak (csak 20 Mp felett) és az élőlények kínzó fájdalmat  éreznek egész testükben. A fájdalom nem jár sebbel, de Fp-vesztést  okoz a varázsló Zónájában tartozkodó összes lénynek. A veszteség  minden megkezdett 20 Mp után K6 Fp (pl: 20 Mp = K6 Fp; 25 Mp  = 2K6 Fp; 70 Mp = 4K6 Fp). Az áldozat ilymódon Ép-t soha nem  veszíthet!

//         A Kisajtolás 5 szegmens alatt elvégezhető, és ötször annyi Mp­ot eredményez, mint amennyit a varázsló a diszciplínára elhasznált,  vagyis 1 Ψ-pontért 5 Mp jár.

//         A leírtak kivételével a Kisajtolás módszere teljesen azonos a  Kivonással.
//         `
//     },
//     {
//         name: 'Transz',
//         pont: '1',
//         misc: {
//             idotartam: 'korlátlan'
//         },
//         varazslasIdeje: '10 perc',
//         labels: ['pszi', 'pszi-kyr'],
//         description: `
//         A diszciplína segítségével a végrehajtó transzállapotba kerülhet.  Hogy ez megtörténjék, tíz percig mozdulatlan meditál, teljes  szellemiségével a transz elérésére összpontosít. Ez idő alatt nem végezhet fizikai vagy szellemi tevékenységet, mozdulatlanul áll,  vagy ül, netán fekszik.

//         Transzban lassú mozdulatokkal képes mozogni, akár egy sétáló  lovat is megülni, vagy gyalogolni, mágikus jeleket rajzolni, beszélni,  írni; de nem képes fürge mozdulatokra, közelharcra, a transztól  eltérő összpontosításra. Maga a végrehajtó bármikor visszatérhet  normális tudatállapotba; más azonban csak nehezen képes  kizökkenteni. A transzban levő emberhez hiába beszélnek, rázzák,  öntik nyakon vízzel; a transz csak Fp vagy Ép vesztést okozó  „zavarás" hatására szakad félbe.

//         A transzállapot feltétlenül szükséges egyes mágikus tanok  gyakorlásánál (pl: jelmágia), s a varázslók ilyenkor ezen diszciplínához  folyamodnak Egyetlen Ψ-pont felhasználásával a végrehajtó korlátian  időtartamra transzba kerülhet. Természetesen léteznek más  módszerek is a transzállapot elérésére, mint például a koplalás, a  kántálás vagy a törzsi tánc- ám ezek a javasasszonyok, boszorkányok,  sámánok fegyvertárába tartoznak.

//         Transzállapotban az ember testi funkciói lelassulnak, így jóval  (ötször) hosszabb időt képes kibírni evés, ivás vagy levegővétel  nélkül.
//         `
//     },
//     {
//         name: 'Láthatatlanság Észlelése',
//         pont: '5 (erősíthető)',
//         misc: {
//             idotartam: '5 kör',
//             erosseg: '1'
//         },
//         varazslasIdeje: '2 szegmens',
//         labels: ['pszi', 'pszi-kyr'],
//         description: `
//         A diszciplína végrehajtója öt körön keresztül látja a mágikusan  láthatatlanná tett tágyakat és élőlényeket. Természetesen csak  azokat, melyeknél a diszciplína erőssége meghaladja a láthatatlanság  Erősségét (E). Hasonlóképp a Leplezett varázslatok esetében: az  alkalmazó megpillanthatja a láthatatlanná tett mágikus hatásokat,  varázslatokat.

//         Alapesetben a diszciplína erőssége (E)1, de ez dupla vagy tripla  mennyiségű Ψ-pont felhasználásával a végtelenségig többszörözhető.  Ugyanez igaz az 5 körös időtartamra is.        
//         `
//     },
//     {
//         name: 'Asztrál Szem',
//         pont: '3',
//         misc: {
//             me: 'A',
//             idotartam: 'azonnali',
//             erosseg: '3'
//         },
//         varazslasIdeje: '3 szegmens',
//         labels: ['pszi', 'pszi-kyr'],
//         description: `
//         A diszciplína mások érzelmeinek, indu­latainak kifürkészésére alkalmas. Segítségével  át lehet „látni" az Asztrál Pajzson is.  Bármilyen erősítésű Asztrál Szemmel tekin­tünk is valakire, egyet mindenképpen és  biztosan megtudhatunk: az illető érzelmi  kiegyensúlyozottságának mértékét, másként  szólva, Asztrálját (lásd Képességek). Ezen  túl az áldozat jogosult Asztrális Mágia­ellenállásra.

//         Abban az esetben, ha Mágiaellenállása  sikeres, az alkalmazó csak a legnyilvánvalóbb  érzelmeiről szerez tudomást - melyek álta­lában már puszta emberismerettel is felfe­dezhetőek. Kimagaslóan erős érzelmekről van  itt szó: ilyen a heves szerelem, a vak gyűlölet, a szamuráj hűsége vagy éppen a fellángoló szexuális vágy.  Mindezeknek is csak a létére derül fény; a céljukra, arra hogy az illető kinek vagy minek az irányában érez, arra nem. Erre a diszciplína  alkalmazója legfeljebb következtethet: például kitalálhatja, hogy a  pap vak hűsége istene felé irányul.

//         Ha az áldozat elvéti Asztrális Mágiaellenállását, világossá válik  az érzelmek célja is, mitöbb, a kevésbé nyilvánvaló érzelmek is  napvilágra kerülnek. Persze az Asztrál Szem egyszeri használata  nem egyenlő az áldozat teljes érzelmi életének feltérképezésével.  Segítségével megpillantható öt nyilvánvaló, három átlagos vagy  egy titkolt ércelem. Legutóbbiról akkor beszélünk, ha valaki őszpontosít  arra, hogy lelke mélyén elrejtsen egy érzelmet illetve indulatot ­egyszerre legfeljebb kettővel teheti.

//         A Szem alkalmazója vagy a KM-re bízza, hogy mesélje el, mi  az, amit lát, vagy célirányosan kérdezhet is. Felteheti a kérdést,  hogy a diszciplína áldozata miként érez meghatározott személyek  vagy eszmék irányában. Kérheti az öt legnyilvánvalóbb érzelem  felsorolását, vagy tudakozódhat egy esetleges titkolt érzelem felől.  A választól függetlenül, a kérdezést annyiszor ismételheti meg,  ahányszor a felsorolt feltételek lehetővé teszik.

//         A diszciplína egyszerre egyetlen személy ellen alkalmazható, és  a feltüntetett 3 szegmens alatt a teljes információcsere lezajlik. Ez  idő alatt az alkalmazó meditatív tudatállapotban kell legyen.

//         A diszciplína másik használati módja, mikor az alkalmazó az  Asztrál Szem tekintetével nem egy valakit vesz alaposan szemügyre,  hanem a 3 szegmens alatt gyorsan körbepásztáz. Ilyenkor  megtudhatja a közelében tartózkodó - legfeljebb tíz - személy  Asztrál Képességének értékét, de az érzelmeiket és azok célját  nem fürkészheti ki.

//         Az alkalmazásra szánt minden egyes további Ψ-pont-a feltüntetett  3-on felül - nem 1-gyel, hanem 3-mal növeli a diszciplína Erősségét.  

//         Az Asztrál Szem használatáról a diszciplína áldozata ill. áldozatai  nem szereznek tudomást!
//         `
//     },
//     {
//         name: 'Mentál Szem',
//         pont: '5 (erősíthető)',
//         misc: {
//             me: 'M',
//             idotartam: 'azonnali',
//             erosseg: '5'
//         },
//         varazslasIdeje: '5 szegmens',
//         labels: ['pszi', 'pszi-kyr'],
//         description: `
//         A Mentál Szem egyetlenegy személy gondolati életének minőségéről  ad felvilágosítást. Segítségével át lehet "látni" a Mentál Pajzson,  bár ilyenkor nem égbekiáltó az eredmény- de nem is lebecsülendő.

//         A Mentál Szem használata ellen a kiszemelt áldozat mentális  Mágiaellenállásra jogosult. Ha ez sikeres, az alkalmazó csak  annyit tud meg róla, hogy figyelemre méltó elme-e, netán átlagos  gondolkodó, vagy éppen afféle „ostoba tuskó". Továbbá azt,  ha valakitől, vagy valakihez Mentál-fonál vezet. Hogy kitől  kihez, az csak akkor deríthető ki, ha az alkalmazó mindkét  áldozatot szemügyre veszi Mentál Szemével.

//         Ha az áldozat elvéti Mágiaellenállását, az alkalmazó  számszerűen tudomást szerez Intelligencia és Akaraterő  Képességéről, valamint Kasztjáról és plusz-mínusz 1 eltéréssel  a Tapasztalati Szintjéről és Ψ-használatának szintjéről.

//         A diszciplína egyszerre egyetlen személy ellen alkalmazható, és  a feltüntetett 5 szegmens alatt a teljes információcsere lezajlik.  Ezalatt az alkalmazó meditatív tudatállapotban kell legyen.

//         A diszciplína másik használati módja, mikor az alkalmazó a  Mentál Szemmel nem egy valakit vesz alaposan szemügyre, hanem  az 5 szegmens alatt gyorsan körbepásztáz. Ilyenkor legfeljebb  tíz, közelében tartózkodó személyről tudhatja meg azt, amit a  Mágia-ellenállás elvétésének esetében írtunk le, de mást nem  fürkészhet ki.

//         Az alkalmazásra szánt minden egyes további Ψ-pont-a feltüntetett  5-ön felül - nem 1-gyel, hanem 2-vel növeli a diszciplína Erősségét.

//         A Mentál Szem használatáról a diszciplína áldozata ill. áldozatai  nem szereznek tudomást!        
//         `
//     },
//     {
//         name: 'Auraérzékelés',
//         pont: '7 (erősíthető)',
//         misc: {
//             me: 'A+M',
//             idotartam: 'lásd a leírást',
//             erosseg: '7'
//         },
//         varazslasIdeje: '1 szegmens',
//         labels: ['pszi', 'pszi-kyr'],
//         description: `
//         Minden kifejlett lélekkel bíró teremtmény kisugároz magából  Személyes Aurát. Ez azon túl, hogy megvédi a lélek uralta testet  a mágia bizonyos formáitól, messzemenően jellemző az illetőre.  Egy varázsló képes arra, hogy különleges érzékeivel szemügyre  vegye az Aurát. Ha már máskor is „látta" és megjegyezte, az  Aura alapján felismeri a lelket, bármely testben lakozik is. Képes  észlelni a szembeötlő természetellenességet is, mint mikor emberi  lélek állatban lakozik, vagy fordítva. Továbbá meg tudja állapítani,  hogy az illető milyen fajhoz tartozik.

//         Mivel azonban az Asztrál és Mentál Pajzsok az Aura körül  épülnek fel, mindezen információt csak akkor szerezheti meg,  ha „átlát" a Pajzsokon. Ezt csak úgy érheti el, hogy az Auraérzékelést  annyira felerősíti, hogy áldozata elvétse külön-külön, mind Asztrál,  mind Mentál Mágiaellenállását.

//         Mindaddig, míg ez nem történik meg, a diszciplína csak a  pajzsok erősségéről szolgáltat adatokat. Nem számszerűen,  hanem a következő táblázat szerint elárulja, milyen nagyság­rendű az illető statikus Asztrál és Mentál Pajzsa, valamint  dinamikus Asztrál és Mentál Pajzsa.

//         <table>
//             <tr>
//                 <td>Pajzs E-je</td>
//                 <td>Nagyságrend</td>
//             </tr>
//             <tr>
//                 <td>0</td>
//                 <td>Nincs</td>
//                 </tr>
//                 <tr>
//                 <td>1-9</td>
//                 <td>Gyenge</td>
//                 </tr>
//                 <tr>
//                 <td>10-21</td>
//                 <td>Mérsékelt</td>
//                 </tr>
//                 <tr>
//                 <td>22-34</td>
//                 <td>Közepes</td>
//                 </tr>
//                 <tr>
//                 <td>35-50</td>
//                 <td>Erős</td>
//                 </tr>
//                 <tr>
//                 <td>51-</td>
//                 <td>Nagyon erős</td>
//                 </tr>
//         </table>

//         A diszciplínát előszegettel használják alakjukat megváltoztatott  személyek felismerésére, netán vélt azonosság vagy ennek  ellenkezőjének tisztázására, mivel az Aura elváltoztatására nincs  mód!

//         Az Auraérzékelésre szánt minden további 1Ψ-pont - a leírt 7-en  felül - nem 1-gyel, hanem 2-vel növeli a diszciplína erősségét.
//         `
//     },
//     {
//         name: 'Mágikus Tekintet',
//         pont: '4 (erősíthető)',
//         misc: {
//             me: 'AE-próba',
//             idotartam: 'lásd a leírást',
//         },
//         varazslasIdeje: '1 szegmens',
//         labels: ['pszi', 'pszi-kyr'],
//         description: `
//         A diszciplína az Energiagyűjtés mellett a Kyr metódus másik  csúcspontját jelenti. Kifejezetten újkeletű, bár évek alatt széles  körben elterjedt; kifejlesztése egy Ynev-szerte csak a Smaragd Uraként  ismert pyarroni mágus nevéhez fűződik. Alapja az okkult tan,  miszerint az anyagi porhüvelyben a szem a legrövidebb út a lélek  felé. Épp ezért az alkalmazónak minden esetben a kiszemelt áldozat  szemébe kell néznie.

//         Bárki, aki a diszciplína alkalmazójának szemébe néz, akaraterő­próbát köteles dobni, amit ha elvét, többé nem képes tekintetét a varázslóétól elszakítani. Bármit tehet, hátrálhat, akár rá is  támadhat az alkalmazóra, de nem cselekedhet semmi olyat,  minek eredményeként kiszabadulna a Mágikus Tekintet bék­lyójából. Vagyis nem helyezhet semmit az összekapcsolódó  tekintetek útjába, nem fordulhat el, nem léphet takarásba. A  kapcsolat megtartása minden célja előtt való! A Mágikus  Tekintettől csak akkor szabadulhat, ha az alkalmazó, tekin­tetének elfordításával szabadon engedi, illetőleg, ha harmadik  személy akár csak egy szemvillanásra is akadályt gördít a két  pillantás kereszttüzébe.

//         Ha az áldozat kiszabadult, a diszciplína időtartama azonnal  lejár, egyébként percekig, órákig, de elméletileg akár a vég­telenségig is tarthat.

//         A varázsló az ellen a személy  ellen, aki Mágikus Tekintetének  rabja, magasabb hatásfokon ké­pes Asztrál- és Mentálmágiát alkal­mazni. Ami természetesen felté­telezi, hogy a varázslat ideje alatt  az áldozat nem szabadul. Hogy az  említett magasabb hatásfok mit  jelent, az a következő táblázatból  derül ki        

//         <table>
//             <tr>
//                 <td>TSZ</td>
//                 <td>+E</td>
//             </tr>
//             <tr>
// <td>1. </td>
// <td>+ 4 E  </td>
// </tr>
// <tr>
// <td>2. </td>
// <td>+ 5 E  </td>
// </tr>
// <tr>
// <td>3. </td>
// <td>+ 6 E  </td>
// </tr>
// <tr>
// <td>4. </td>
// <td>+ 7 E  </td>
// </tr>
// <tr>
// <td>5. </td>
// <td>+ 9 E  </td>
// </tr>
// <tr>
// <td>6. </td>
// <td>+ 10 E  </td>
// </tr>
// <tr>
// <td>7. </td>
// <td>+ 11 E  </td>
// </tr>
// <tr>
// <td>8. </td>
// <td>+ 12 E  </td>
// </tr>
// <tr>
// <td>9. </td>
// <td>+ 13 E</td>
// </tr>
// <tr>
// <td>10</td>
// <td>+ 15 E  </td>
// </tr>
// <tr>
// <td>11. </td>
// <td>+ 16 E  </td>
// </tr>
// <tr>
// <td>12. </td>
// <td>+ 17 E  </td>
// </tr>
// <tr>
// <td>13. </td>
// <td>+ 18 E  </td>
// </tr>
// <tr>
// <td>14. </td>
// <td>+ 19 E  </td>
// </tr>
// <tr>
// <td>15. </td>
// <td>+ 21 E</td>
// </tr>
//         </table>

//         A varázslat Erősségéhez (E)  hozzáadandó az adott Tapasz­talati Szinten, a +E rovatban  feltüntetett E érték. (Például: 4.  TSZ-en, ha a varázslat E-je 13,  Mágikus Tekintet rabságában az  erősség 20-nak minősül.)
//         A varázslat létrejöttével - de  még időtartamának lejártával  sem - az áldozat nem szabadul  a Mágikus Tekintet bilincséből.  Ez csak a fent említett esetekben  történhet, addig a varázsló any­nyiszor varázsol rá a leírt ked­vezménnyel, ahányszor csak jó­nak látja, illetve ameddig Mana­pontjai el nem fogynak.
//            `
//     },
//     {
//         name: 'Ψ-ostrom',
//         pont: '1 (erősíthető)',
//         misc: {
//             idotartam: 'lásd a leírást',
//         },
//         varazslasIdeje: '1 szegmens',
//         labels: ['pszi', 'pszi-kyr'],
//         description: `
//         Mindenben azonos az Általános Diszciplínáknál leírt Ψ-ostromhoz,  ám ezzel 1 Ψ-pontért 2Ψ-pont bontható le a dinamikus, és 2 E  rombolható le a statikus pajzsokból.        
//         `
//     },
//     {
//         name: 'Pszeudó',
//         pont: '5 + a Pszeudó',
//         misc: {
//             idotartam: 'egyszeri',
//         },
//         varazslasIdeje: '5 szegmens',
//         labels: ['pszi', 'pszi-kyr'],
//         description: `
//         Baromi hosszú leírás egy olyan diszciplinához, amit amúgy se használ soha senki.
//         `
//     },
// ]


const PSZI_DISZCILPLINAK = [
    ...PSZI_PYARRONI,
    ...PSZI_SLAN,
];

export const Pszi = {
    ...namedEntityArray(PSZI_DISZCILPLINAK),
    kepzettsegek: () => PsziIskolak.map(i => ({
        id: `pszi:${i.id}`,
        name: `Pszi (${i.name})`,
        kepesseg: 'osszpontositas',
        leiras: i.leiras,
        kp: [6, 10, 15, 27, 39],
        szintleiras: constructArray(5, idx => `Pszi pontok: ${i.psziPont[idx]}\n\nDiszciplinák:\n\n` + PSZI_DISZCILPLINAK.filter(d => d.iskola === i.id && d.fok === idx + 1).map(d => ` * [${d.name}](entity:${d.id})`).join('\n')),
        fajta: 'normal',
        __generated: true,
        tipus: 'pszi',
        linked: i.id === 'pyarroni' ? [] : [
            {
                id: 'pszi:pyarroni',
                strength: 1
            }
        ]
    } as NormalKepzettseg)),
    psziPont: (kepzettsegek: SzintInfo['kepzettsegek']['normal']): number => {
        const psziKepzettsegek = kepzettsegek.filter(k => k.kepzettseg.tipus === 'pszi');
        return sumArray(psziKepzettsegek.map(k => PsziIskolak.find(iskola => `pszi:${iskola.id}` === k.kepzettseg.id)?.psziPont[k.fok - 1] ?? 0));
    }
}