import { NormalKepzettseg } from "./Kepzettseg";
import { NamedEntity } from "./util";
import { Mentodobasok } from "./Magia";

export interface PsziIskola extends NamedEntity {
    psziPont: [number, number, number, number, number];
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

const PyarroniIskola = {
    id: 'pyarroni',
    name: 'Pyarroni',
    psziPont: [1, 2, 3, 4, 5]
} as PsziIskola;

const PsziMagasIskola = [
    {
        id: 'slan',
        name: 'Slan',
        psziPont: [1, 1, 1, 1, 1]
    } as PsziIskola,
    {
        id: 'kyr',
        name: 'Kyr',
        psziPont: [2, 2, 2, 2, 2]
    } as PsziIskola,
    {
        id: 'dzsenn',
        name: 'Dzsenn',
        psziPont: [1, 1, 1, 1, 1]
    } as PsziIskola
] as const;

export const PsziIskolak = [PyarroniIskola, ...PsziMagasIskola] as const;

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
        idotartam: 'azonnali',
        fok: 2,
        varazslasIdeje: '1 kör',
        iskola: 'pyarroni',
        leiras: `A diszciplína segítségével az agy fájdalomközpont­jára gyako­rolhatunk hatást. Lehetőség nyílik fájdalomérzet tompítására vagy  keltésére. Miután nem gyógyít vagy okoz valódi sebesüléseket, az  Életerő Pontokra nincs befolyással. Csak Fp-ot adhatunk vissza,  vagy vehetünk el. Ma­ximum Fp fölé nem juthatunk, bármennyi Ψp-ot is áldoznánk rá.`
    },
    {
        name: 'Fájdalomokozás',
        id: 'fajdalomcsillapitas:2',
        psziPont: 1,
        save: 'asztral',
        idotartam: 'azonnali',
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
    // {
    //     name: 'Képességjavítás',
    //     pont: 'lásd a leírásban',
    //     misc: {
    //         me: 'M',
    //         idotartam: '6 kör',
    //     },
    //     varazslasIdeje: '2 kör',
    //     labels: ['pszi', 'pszi-pyarroni'],
    //     description: `Olykor - különleges veszélyhelyzetekben - az emberi fizikum  látszólag csodákra képes. Egy vadállattól megré­mült gyermek  hihetetlen gyorsasággal képes felkúszni egy sudár, ág nélküli fa  törzsén, s miután a veszély elmúlt, nemcsak azon csodálkozik,  hogy miképp sikerült ez neki, hanem gyakorta lemászni sem tud  magától. Ez jellemző példája a Ψ akaratlan megnyilvánulásának,  hiszen ilyenkor az agy szabadít fel a testben olyan erőforrásokat,  melyek egyébként nem hozzáférhetőek.

    //     A diszciplína ugyanezt képes végrehajtani, termé­szetesen a  tudat teljes irányítása alatt. A Ψ erők segítségével a fizikai képességek  - kivéve a Szépséget - megváltoztat­hatóak. A változtatás időleges,  s a diszciplína hatásának el­múltával visszatérnek az eredeti értékek.  Ugyanakkor lehe­tetlent nem szabad elvárnunk a Ψ-től sem: egyik  képessé­günket sem emelhetjük 20 fölé.

    //     FIGYELEM!  
    //     Bármely képesség nullára - vagy nulla alá - csök­kentése azonnali  halálhoz vezet.

    //     A Képességjavítás az egyik legkedveltebb Általános Disz­ciplína. Gyakorta használják a Méregellenállás - az Egészség tíz  feletti része - megnövelésére. Valójában igen hasznos minden  olyan esetben, amikor Képességpróbára kényszerülünk, hiszen  az adott pillanatban valóban erőseb­bek, gyorsabbak, egész­ségesebbek vagy ügyesebbek le­szünk. Nem szabad elfelejteni,  hogy ha harc folyamán megnöveljük egészségünket - és egy  csapást csak az így nyert Ép-okkal éltünk túl -,amint a disz­ciplína hatása elmú­lik, a nyert Ép-k is semmivé lesznek, s ebbe  akár bele is halhatunk.

    //     Ha Rontással az ellenfelünk Egészségét annyira le­csökken­tettük, hogy ettől elveszíti maradék Ép-jait, akkor meghal. Hiába  jönnének vissza az Ép-ok a diszciplína hatá­sának megszűntével,  a lélek nem költözik vissza a halott testbe.

    //     <table>
    //         <tr>
    //             <td>+/- módosítás az eredeti képesség­hez képest</td>
    //             <td>1</td>
    //             <td>2</td>
    //             <td>3</td>
    //             <td>4</td>
    //             <td>5</td>
    //             <td>6</td>
    //         </tr>
    //         <tr>
    //             <td>Szükséges Ψp</td>
    //             <td>1</td>
    //             <td>2</td>
    //             <td>4</td>
    //             <td>8</td>
    //             <td>16</td>
    //             <td>32</td>
    //         </tr>
    //     </table>

    //     A táblázatban feltüntetett Ψp értékek a diszciplína alap idő­tartamára (6 kör) vonatkoznak. A felhasznált Ψp-ok megdup­lázásával a hatás időtartamának megduplázását ér­hetjük el,  megtriplázásával a hatás ideje megháromszorozó­dik, és így tovább.        
    //     `
    // },
    //     {
    //         name: 'Roham',
    //         pont: '1/+2TÉ',
    //         misc: {
    //             me: 'A',
    //             idotartam: '1 támadás',
    //         },
    //         varazslasIdeje: '1 szegmens',
    //         labels: ['pszi', 'pszi-pyarroni'],
    //         description: `A diszciplína alkalmazója egyetlen csapásra össz­pontosítva,  teste és elméje minden tartalékát kiadja egy lerohanásszerű  támadásban. Az alkalmazó mély, torok­hangú kiáltás kíséretében  hajtja végre a rohamot.

    //         A diszciplína felemészti az alkalmazó összes aktuális Ψp-ját,  beleértve a Dinamikus Pajzsban tároltakat is. Ez azt jelenti, hogy  a támadó kénytelen felhasználni minden Ψp-ot, amivel rendelkezik,  s az ebből nyert energia hozzáadó­dik a Támadó Értékéhez.  1 Ψp +2 TÉ-t jelent. (Azaz 5 Ψp felhasználása esetén + 10 van a  TÉ-n.)

    //         Amennyiben az ellenfél nem ugyanezt a diszciplínát alkalmazza,  a kezdeményezés automatikusan a Roham al­kalmazóját illeti,  kezdeményező dobás nélkül.

    //         Megfékezés esetén a diszciplína végrehajtója ezzel a mód­szerrel megakasztja, megzavarja támadóját, az elveszíti kezde­ményezését és a fenti módon kiszámított érték levonó­dik a Támadó  Értékéből.

    //         Ez a diszciplína olykor igen hasznos lehet, ám nem szabad  figyelmen kívül hagynunk veszélyét: agyunk feltöl­tődéséig képtelenek  leszünk bármiféle Ψ-alkalmazásra és elménket is csak a Statikus  Pajzs védi.
    //         `
    //     },
    //     {
    //         name: 'Telekinézis',
    //         pont: '2/1kg',
    //         misc: {
    //             idotartam: '1 kör',
    //         },
    //         varazslasIdeje: '1 szegmens',
    //         labels: ['pszi', 'pszi-pyarroni'],
    //         description: `Agyi energiáink segítségével kisebb tárgyakat moz­gathatunk  látótávolságon belül. Elfordíthatunk a zárban egy kulcsot, a tőlünk  távol heverő fegyvert magunkhoz húzhat­juk, vagy észrevétlen  elcsenhetünk az ékszerészmúhelyből némi drágaságot. A diszciplína  alkalmazása taglejtéseket nem igényel, pusztán a mozgatni kívánt  tárgyon kell tartani tekintetünket. Amint elfordulunk, vagy valami  eltakarja a tárgyat, az mozdulatlanná válik, esetleg - ha a levegőben  volt - lepottyan. A Telekinézis csak lassú mozgatásra alkal­mas  - egy futó ember sebességénél nagyobbat nem érhetünk el vele ­ezért ilyen módon fegyvert dobni, vagy sebesülést okozni szinte  lehetetlen.

    //         A diszciplína kifejti hatását mágikus tárgyakra is.

    //         2 Ψp felhasználásával 1 kg súlyú tárgy mozgatható 1 körig. 4  Ψp rááldozásával mozgathatunk 1 kg-os tárgyat 2 körig, vagy 2  kg-ot 1 körig, stb.
    //         `
    //     },
    //     {
    //         name: 'Telepátia',
    //         pont: 'lásd a leírást',
    //         misc: {
    //             me: 'M',
    //             idotartam: 'lásd a leírást',
    //         },
    //         varazslasIdeje: '3 kör',
    //         labels: ['pszi', 'pszi-pyarroni'],
    //         description: `
    //         Az egyik legősibb Ψ-alkalmazás, más néven Gondo­latátvitel.  Az Általános Diszciplínák azon kivétele, mely igazán csak  mesterfokon használható. Segítségével gondo­lati úton lehet  beszélgetni, vagy a Ψ-alkalmazó által felidé­zett képeket közölni.  A Telepátia csak Ψ képzettséggel ren­delkezők között működik.  Alapfokon a Ψ-alkalmazó nem tud beszélgetést kezdeményezni,  sőt válaszolni sem, csupán a hozzá intézett gondolati üzenetet  képes venni.

    //         A diszciplína mesterfokú alkalmazása ad módot arra, hogy a  Gondolatátvitelt megindítsa, és - két mesterfokú al­kalmazó ese­tében - válaszoljon a kérdésekre.

    //         A Telepátia alkalmazásához a Gondolatátvitel meg­kezdőjének  tökéletesen ismernie kell a gondolatokat fogadó személyt - ebben  az esetben a távolság nem számít -, vagy látnia kell azt.

    //         Amennyiben a Telepátiában résztvevők látják egy­mást, csupán  2 Ψp-ba kerül az 1 körig tartó gondolatátvitel. Ha nem látják  egymást 1 szegmensenként kerül 1 Ψp-ba. A Ψp-ok növelésével  egyenlő arányban növelhető a diszcip­lína időtartama is.

    //         Egyszerre legfeljebb két elme kapcsolható össze Te­lepátiával,  tehát a gondolati úton történő beszélgetésbe nem lehet harmadik  részről sem beleszólni, sem azt lehallgatni.

    //         Az egyetlen olyan diszciplína, mely megtalálja a módját,  hogy hatása átszivárogjon a Statikus Pajzson, noha a Dinami­kus Pajzs ezt is feltartóztatja. Ha egy efféle pajzsot vise­lőnek küldenek Telepátiával üzenetet, az csak azt fogja érzé­kelni, hogy kapcsolatot keresnek vele, ám a beszélgetés csu­pán a fogadó Dinamikus Pajzsának lebomlása után jöhet létre.

    //         A Telepátia mindig csak annak a Ψ-alkalmazónak ke­rül Ψp­-ba, aki a gondolati közlést kezdeményezte.
    //         `
    //     },
    //     {
    //         name: 'Testhőmérséklet n/cs',
    //         pont: '1/5 °C',
    //         misc: {
    //             me: 'M',
    //             idotartam: '1 óra',
    //         },
    //         varazslasIdeje: '6 kör',
    //         labels: ['pszi', 'pszi-pyarroni'],
    //         description: `A diszciplína alkalmazója képes saját - mesterfokon más ­testének hőmérsékletét növelni vagy csökkenteni. Így lehetősége  nyílik a vizes ruhát megszárítani magán, vagy egy lángoló házból  kimenekülni égési sérülések nélkül. Minden felhasznált Ψp 5 fokkal  képes megváltoztatni a testhőmérsékletet.

    //         Az ötven fok fölé növelt testhő hat kör múltán ájulást eredményez,  hosszabb távon halállal jár. A húsz fokra csökkentett hőmérséklet  Tetszhalálhoz vezet - ilyen formán még egy felkészületlen szervezet  is képes életben maradni néhány hónapig -, a húsz fok alá  csökkentett testkő mara­dandó egészségkárosodással jár, míg a  negyedórát megha­ladó öt fok alatti állapot visszafordíthatatlan  folyamattá vá­lik, és az áldozat meghal.

    //         A diszciplína lehetőséget ad arra, hogy 1Ψp-ért 5 fokkal eltérő  hőmérsékletet 1 óráig fenntartsa, 2Ψp-ért az 5 fokos befolyásolást  2 óráig, vagy a 10 fokos változtatást 1 órán keresztül biztosítsa,  stb.
    //         `
    //     },
    //     {
    //         name: 'Pszi-lökés',
    //         pont: '1/1 kg',
    //         varazslasIdeje: '1 szegmens',
    //         labels: ['pszi', 'pszi-pyarroni'],
    //         description: `
    //         Más nevén Energialökés. A mágiához legközelebb álló, alapvető  diszciplína. Használata során a Ψ-alkalmazó kis mennyiségű mágikus  energiát gyűjt magába, ám mivel tárolására nem készíti fel a  módszer, azonnal ki is áramlik belőle. A Ψ-lökés irányítható, gyenge szél fuvallat formájá­ban nyilvánul meg. Taszító ereje felhasznált  Ψp-onként 1 kg. Apróbb dolgok felborítására, arréb lökésére  szokták használni, olykor-kellő erővel alkalmazva - tárgyak vagy emberek egyensúlyi helyzetét lehet megszüntetni  vele.
    //         `
    //     },
    //     {
    //         name: 'Pszi-ostrom',
    //         pont: 'min 1',
    //         varazslasIdeje: '1 szegmens',
    //         labels: ['pszi', 'pszi-pyarroni'],
    //         description: `
    //         A tudat védelmére felépített Ψ-pajzsok megsemmi­sítésére szolgáló  diszciplína, mely csak mesterfokon alkal­mazható. Két különböző  típusa létezik: a Ψ-rombolás és Ψ-bontás.

    //         A Ψ-rombolással a Statikus Pajzsokat lehet meg­szüntetni. A  Statikus Pajzsok nem bonthatóak Ψp-onként - egyszerre kell  lerombolni őket. Ez a következőképp törté­nik:

    //         A diszciplína alkalmazója meghatározza, hogy a Ψ-romboláshoz  hány Ψp-ot kiván felhasználni. Ennyi lesz a Rombolás erősítése.  Ha ez nagyobb (egyenlő), mint a Stati­kus Pajzs erősítése, akkor a  Statikus Pajzs megszűnik, s a pajzshoz felhasznált energia semmivé  válik. Amennyiben a Ψ-romboláshoz valaki kevesebb Ψp-ot használ,  mint amennyiből a Statikus Pajzsot felépítették (legyen az asztrális  vagy mentális), akkor a pajzs teljes erősítéssel megmarad, míg a  Romboláshoz felhasznált Ψp-ok elvesz­nek. A Ψ-rombolás nem árt  a Dinamikus Pajzsoknak.

    //         A Dinamikus Pajzsok kiiktatására a Ψ-bontás szol­gál.  Segítségével akár Ψp-onként is bontható a Dinamikus Pajzs.  Ilyenkor a Bontáshoz felhasznált Ψp-ok mennyiségé­vel meg­egyező Ψp bomlik le a Dinamikus Pajzsból. Ψ-bon­tással nem  támadható a Statikus Pajzs.

    //         Egy 10 Ψp erősségű Statikus Pajzs, csak egy, leg­alább 10 Ψp  erősségű (vagy nagyobb) Ψ-rombolással sem­misíthető meg.  Ekkor a pajzs viselője (a pajzs építéséhez felhasznált, ám az  aktuális Ψp-jaiba nem beleszámító) és a Rombolás alkalmazója  (a Romboláshoz felhasznált) Ψp-jalt is elveszíti. Ha a Ψ-rom­

    //         boláshoz kevesebb, mint 10 Ψp-ot használtak, a Statikus Pajzs  teljes erősítéssel megmarad, míg a Romboláshoz igénybe vett  Ψp-ok elvesznek.

    //         Egy l0 Ψp nagyságú Dinamikus Pajzs lebontható 1, 2 vagy 3  Ψp-onként, de Felhasználtató egyszerre 10 vagy több Ψp is. A Dinamikus Pajzs mindig elveszít annyit az erősségéből, ahány  Ψp erősségű a Bontás. Persze, ha már nincs pajzs, a Romboláshoz  vagy Bontáshoz felhasznált Ψp-ok elvesznek, hiszen ugyanúgy  levonódnak az aktuális Ψp számából, mintha lett volna pajzs.

    //         A Ψ alapfokú alkalmazói nem érzékelik, ha egy elmét pajzsok  védenek. Mesterfokon már gyenge (Ψp-ot nem igénylő) kon­centrációval megállapítható, ha a tudatot övezi valamiféle vé­delem. Azt azonban, hogy Statikus vagy Dinamikus Pajzsok  működnek, csak a Kyr metódus alkalmazói tudhatják (lásd Kyr  Diszciplínák, Auraérzékelés).

    //         A Ψ-ostrom folytatója következtethet a pajzsok típusaira, hiszen  pontosan érzékeli, ha az Ostrom valamely fajtája sikerrel jár, vagy  ha a felhasznált energiák nem ütköznek ellenállásba.        
    //         `
    //     },
    //     {
    //         name: 'Pszi-pajzs, Dinamikus',
    //         pont: 'min 1',
    //         misc: {
    //             idotartam: 'lásd a leírást'
    //         },
    //         varazslasIdeje: '30 kör',
    //         labels: ['pszi', 'pszi-pyarroni'],
    //         description: `
    //         A Statikus Pajzsokra építhető egyetlen újabb védelmi réteg,  az úgynevezett Dinamikus Pajzs. A 30 körig tartó meditáció után  a Dinamikus Pajzs megmarad mindaddig, amíg az alkalmazó  meg nem szünteti, vagy Ψ-ostrommal le nem bontják. Felépítése után - ellentétben a Statikus Pajz­zsal - bármikor további Ψp-ok  adhatóak hozzá (azaz erősíthető), vagy vonhatóak el belőle. Ez  minden alkalom­mal 1 körig tartó, rövid, meditatív koncentrációt  igényel. Erőssége minden esetben megegyezik az éppen benne  tárolt Ψp-ok mennyiségével, ám az aktuális Ψp-ok számánál  so­sem lehet több. A Dinamikus Pajzsokban tartott Ψp-ok  be­leszámítanak a karakter aktuális Ψp-jaiba, azaz az asztrális  és mentális Dinamikus Pajzsban működő Ψp-ok és a disz­ciplínákra  Felhasználható pontok összessége a Karakter max. Ψp-ja.

    //         Fenntartása folytonos, gyenge koncentrációt igényel, amire a  Ψ-alkalmazó szinte bármely esetben képes - kivéve, ha alszik,  eszméletlen, vagy bármely egyéb okból öntudat­lan. Ha az elmét  valamilyen erős sokk éri, akárcsak egy pillanatra is, vagy a tudatot  megbénítják, a Dinamikus Pajzs rögtön lebomlik.

    //         A Dinamikus Pajzsnak éppen úgy két formája létezik, mint  a Statikusnak (asztrális és mentális), és erőssége is ép­pen úgy  adódik hozzá a ME-hoz. Előnye a Statikus Pajzs­hoz képest,  hogy a benne tárolt Ψ-energia bármikor hozzá­férhető, s fel­használható egyéb diszciplínák alkalmazásához vagy Ψ-ostrom  folytatásához. Hátránya, hogy a Dinamikus Pajzs lebontásával  a támadó nem csak közelebb jutott az elméhez, hanem az  alkalmazót, a diszciplínákra felhasznál­ható Ψp-jai nagyrészétől  (a Dinamikus Pajzsban tároltaktól) is megfosztotta.

    //         Dinamikus Pajzs más elméje köré nem építhető.
    //         `
    //     },
    //     {
    //         name: 'Pszi-pajzs, Statikus',
    //         pont: 'min 1',
    //         misc: {
    //             idotartam: 'lásd a leírást'
    //         },
    //         varazslasIdeje: '90 kör',
    //         labels: ['pszi', 'pszi-pyarroni'],
    //         description: `
    //         A Ψ pajzsok hivatottak megvédeni az  elmét a mági­kus és Pszi befolyások ellen. A  alkalmazó agyi energiáiból erőteret épít tudata köré, melyen a tudati támadások  fenna­kadhatnak. A Statikus Prajzs egyfajta  állandó védelem, ami mindaddig óvja a  tudatot, amíg azt az alkalmazó meg nem  szünteti, vagy valaki le nem Rombolja.

    //         A Statikus Pajzs erőssége annyi, ahány  Ψp-ból épí­tették. Gyakorlati hatása ab­ban nyilvánul meg, hogy a pajzs erősségét  hozzáadjuk a Tudatalatti Mágiaellenál­ láshoz és így dobjuk az ME-t. Két különböző típusú Statikus  Pajzs létezik: asztrális és mentális. Az Asztrális Pajzs az asztrális  támadások ME-ához adódik hozzá, míg a Mentális Pajzs a mentális  ME-hoz.

    //         A Statikus Pajzs, miután felépült, többé nem befolyá­solható: Ψp-okot sem elvonni, sem hozzáadni nem lehetsé­ges.  Védő hatását akkor is kifejti, ha a Ψ-alkalmazó alszik, esz­méletlen, vagy bármely egyéb okból öntudatlan, hiszen immár  az elmétől függetlenül működik. Lebontani is csak újabb  kilencven körön át tartó meditációval lehet vagy Ψ-ostrommal  (lásd Általános Diszciplínák, Ψ-ostrom).

    //         A Statikus Pajzshoz felhasznált Ψp-ok a későbbiek­ben nem  számítanak bele az aktuális Ψp-ok számába. Ez azt jelenti, hogy  az alkalmazó megteheti, hogy egy békés napon az összes Ψp-ját  Statikus Pajzsok emelésére fordítja, majd pihenés után ismét  maximális Ψp-jaira támaszkodhat - noha tudatát már védik) a  Statikus Pajzsfok). Minden elme köré legfeljebb egy asztrális és egy  mentális Statikus Pajzs épít­hető.

    //         Statikus Ψ-pajzs, mesterfokú alkalmazással bárki el­méje köré  (nemcsak ember, de lélekkel rendelkező állat) építhető, ám a  más elme köré épített pajzs, akárki építette is (harcművész,  kardművész vagy varázsló), bárki által alkal­mazott Ψ-ostrommal  lerombolható.
    // `
    //     },
    //     {
    //         name: 'Membrán',
    //         pont: '10',
    //         misc: {
    //             idotartam: 'végleges'
    //         },
    //         varazslasIdeje: '5 perc',
    //         labels: ['pszi', 'pszi-pyarroni'],
    //         description: `
    //         A membrán a Statikus Ψ-pajzs egy változata. Éppúgy körbevehető vele az elme, működtetésére többé nem kell Ψ-pontot áldozni, s lerombolni is csak ahhoz hasonlóan, Ψ-ostrommal lehet.

    //         A Membrán nem védi az elmét, hanem figyelmezteti a rá irányuló passzív Ψ-tevékenységre. A membrán felépítője megérzi, ha huzamosabb ideig figyelik, s azt is meg tudja határozni, merről. Azonnal tudomására jut, ha Asztrál vagy Mentál Szemmel rápillantanak. Természetesen akkor is nyomban riaszt, ha asztrál vagy mentál varázslattal próbálnak hatni a viselőjére. Ha a Ψ-használó nem a saját, hanem más elméjét övezi Membránnal, bármilyen távol tartózkodjék is, tudomására jut, ha a viselőre a fent említett mágikus módszerekkel hatnak.

    //         A membrán magától soha nem vész el, csak felépítője képes lebontani, vagy 10 E erősségű Ψ-ostrom.
    // `
    //     },
    //     {
    //         name: 'Csettintés',
    //         pont: 'lásd a leírásban',
    //         misc: {
    //             idotartam: 'egyszeri'
    //         },
    //         varazslasIdeje: '1 szegmens',
    //         labels: ['pszi', 'pszi-pyarroni'],
    //         description: `
    //         A diszciplina alapvető képessége minden Ψ-használónak. Oly kevés mentális energia használódik el alkalmazásakor, hogy Ψ-pontban nem mérhető, ezért a Csettintésre nem kell Ψ-pontot áldozni. Egyszerre egyvalakivel szemben használható, mindössze annyi történik, hogy az illető tudomást szerez a diszciplina alkalmazójáról. A hatás hasonló ahhoz, mint amikor egy csendes teremben valaki csettint. A "csettintést" csak a kiszemelt "áldozat" hallja, nem tudja, kitől származik, de tudja, milyen irányban keresse őt. Tapasztalatlan emberek első reakciója feltétlenül az, hogy az alkalmazó irányába, netán rápillantanak.
    //         A Csettintés csak azzal szemben használható, akit az alkalmazó lát.
    // `
    //     },
    //     {
    //         name: 'Összpontosítás',
    //         pont: '1/Ψ-használati szint',
    //         misc: {
    //             idotartam: '1 kör'
    //         },
    //         varazslasIdeje: '2 szegmens',
    //         labels: ['pszi', 'pszi-pyarroni'],
    //         description: `
    //         A diszciplina legtöbb 1 kör időtartamig egyetlen adott feladat megoldására elegendő misztikus, belső erővel ruházza fel alkalmazóját. Az illető ezáltal képes lesz olyan próbatételek sikeres végrehajtására, melyekre egyébként álmában sem lenne alkalmas. 1 Ψ-pont felhasználásával +1-gyel, százalékos próba esetén +5%-kal növelheti az esélyeit. Egyszerre legtöbb annyi Ψ-pontot képes felhasználni ilyen célra, amennyi a Ψ-használati Szintje.

    //         Mivel az 1 teljes körig tartó összpontosítás után az első tevékenység maga a próbatétel kell legyen, a diszciplina aligha használható közelharcban. Annál inkább lesből leadott, célzott lövésben (+5 CÉ/Ψ-pont azaz Ψ-használati Szint).

    //         A diszciplina különlegessége, hogy egyes Ψ-t nem ismerő íjászok is alkalmazzák, esetükben Ψ-pont felhasználása nélkül, +5 CÉ/Tapasztalati Szint mértékben.
    // `
    //     },
    //     {
    //         name: 'Abszolút Látás',
    //         pont: '8',
    //         misc: {
    //             idotartam: 'végleges'
    //         },
    //         varazslasIdeje: '1 szegmens',
    //         labels: ['pszi', 'pszi-pyarroni'],
    //         description: `
    //         A diszciplina alkalmazója nem anyagi testének tökéletlen látószervén, a szemen keresztül lát, hanem sokkal kifinomultabb lelki szemét használja. Ezáltal egyszerre nem csak egy irányba nézhet, hanem teljes körben - jobbra, balra, előre, hátra, fel és le - lát egyidejűleg; mi több, mindent élesen, hisz nem szükséges szemét a kérdéses távolságra fókuszálnia.

    //         Az Abszolút látás egyetlen hátránya a rövid látótávolság: csak 20 méter sugarú körön belül használható, azon túl minden teljes sötétbe borul. Az érintett területen azonban tökéletesek a látási viszonyok, függetlenül a fényviszonyoktól - azaz teljes sötétségben is minden látható. Az Abszolút látással sem pillanthatóak meg ellenben a láthatatlan tárgyak, a rejtőző emberek vagy takarásban lévő dolgok; ahogyan a mágikus sötétség is gátat szab használatának.

    //         Hátulütője is akad: az érintett területen belül a Szimbólumok, a Mágikus tekintet - és az összes látáson alapuló mágikus befolyás - azonnal kifejti hatását az alkalmazóra.

    //         Az Abszolút látás megértéséhez elvont gondolkodás szükséges, hiszen nehéz felfogni a fókuszálás nélküli teljes körívű látást a százhúsz fokos látótérhez szokott emberi elmének. Éppen ezért - az átállás miatt- igényel sok mentális energiát (Pszi-pontot) a diszciplina alkalmazása.

    //         Maga az Abszolút látás - a normál látáshoz hasonlóan - nem igényel Pszi-pontot, csak az átállás: a lelki szemre való átkapcsolás. Azaz az Abszolút látás bármeddig használható, míg csak alkalmazója vissza nem kíván térni a szokványos módszerhez; ekkor újra a diszciplinához kénytelen fordulni, hogy normál látását visszanyerje.

    //         Az Abszolút látás során a szem a semmibe réved, a szembéjak gyakorta le is csukódnak, így a hirtelen felvillanó éles fény - legyen bár mágikus - sem tehet kárt az alkalmazó látásában.

    //         Az Abszolút látás diszciplina magas mentális felkészültéset igényel, ezért - dacára annak, hogy az alkalmazó önmagára vonatkoztatva használja - alkalmazása Mesterfokú Pszi képzettséget igényel. Mivel az Abszolút látásban a szem nem játszik szerepet, a diszciplinát vakok és bekötött szeműek is alkalmazhatják. Harcban megszünteti a hátulról vagy félhátulról támadók előnyeit, s így kizárólag a "Harc több ellenfél ellen" módosítói érvényesülnek.
    // `
    //     },
    //     {
    //         name: 'Szinesztézia',
    //         pont: 'lásd a leírásban',
    //         misc: {
    //             idotartam: 'egyszeri'
    //         },
    //         varazslasIdeje: '2 szegmens',
    //         labels: ['pszi', 'pszi-pyarroni'],
    //         description: `
    //         A diszciplina alkalmazója képes Érzékközpontjában a látáshoz kapcsolni a más érzékszervein keresztül észlelt ingereket. Ily módon színes fénynyalábok formájában megpillanthatja a hangokat és a szagokat, s könnyűszerrel felismerheti forrásukat. Varázslók a Szinesztézia által a leplezetlen mágiát is megpillantják, mivel az derengő auraként világít a mágikus tárgy, személy, hely körül. Hatodik érzékkel együtt alkalmazva a diszciplina hasonló aurával leplezi le az alkalmazóját veszélyeztető tárgyat, ill. személyt.

    //         Nem szükségszerű, hogy éppen a látás legyen a kedvezményezett érzékszerv, ez csak az emberi és hozzá hasonló fajok esetében természetes, mivel ők leginkább a látásukra hagyatkoznak. Elviekben más érzékszerv használata is elképzelhető, bár ezt - úgy tudni - egyetlen pszi-mester sem oktatja és ismeri.

    //         A Szinesztézia alkalmazásakor minden érzékszerv ingerei más színben és erősségüktől függően egyre világosabb árnyalatban (egyre nagyobb fényerővel) jelennek meg. Általánosan a következő színek használatosak.

    //         <table>
    //             <tr>
    //                 <td>Érzékszerv</td>
    //                 <td>Szín</td>
    //                 <td>Ψ-pont</td>
    //             </tr>
    //             <tr>
    //                 <td>hallás</td>
    //                 <td>sárga</td>
    //                 <td>1</td>
    //             </tr>
    //             <tr>
    //                 <td>szaglás</td>
    //                 <td>zöld</td>
    //                 <td>1</td>
    //             </tr>
    //             <tr>
    //                 <td>mágia</td>
    //                 <td>kék</td>
    //                 <td>2</td>
    //             </tr>
    //             <tr>
    //                 <td>hatodik érzék</td>
    //                 <td>vörös</td>
    //                 <td>3</td>
    //             </tr>
    //         </table>

    //         A Ψ-pont rovat megmutatja, mennyi Pszi energiát emészt fel az adott érzékszerv látáshoz kapcsolása 1 körre. Több érzék együttes átkapcsolásakor az értékek összeadódnak, az időtartam növelésekor pedig körönként többszöröződnek.
    // `
    //     },
    //     {
    //         name: 'Érzék-tisztítás',
    //         pont: '1/érzékszerv',
    //         misc: {
    //             idotartam: 'végleges'
    //         },
    //         varazslasIdeje: '1 szegmens',
    //         labels: ['pszi', 'pszi-pyarroni'],
    //         description: `
    //         A diszciplina alkalmazója 1 Ψ-pontért megtisztíthatja egyik érzékszervét, melyet a korábbi nagy erejű ingerek eltompítottak. Verőfényről a barlang sötétjébe lépve azonnal "hozzászoktatja" szemét a megváltozott fényviszonyokhoz; a fülsértő ricsajt követő csendben is kifinomultan hallgatózhat; egyetlen röpke pillanat alatt száműzheti orrából a korábbi bűz vagy illatfelhő szaglást bénító utóhatásait.
    // `
    //     },

]


export const Pszi = {
    kepzettsegek: () => [{
        id: 'pszi:pyarroni',
        name: 'Pszi (Pyarroni)',
        kepesseg: 'osszpontositas',
        leiras: 'Pszi',
        kp: [10, 15, 27, 39, 52],
        szintleiras: ['', '', '', '', ''],
        fajta: 'normal',
        tipus: 'pszi'
    } as NormalKepzettseg,
    ...PsziMagasIskola.map(i => ({
        id: `pszi:${i.id}`,
        name: `Pszi (${i.name})`,
        kepesseg: 'osszpontositas',
        leiras: 'Pszi',
        kp: [10, 15, 27, 39, 52],
        szintleiras: ['', '', '', '', ''],
        fajta: 'normal',
        tipus: 'pszi',
        linked: [
            {
                id: 'pszi:pyarroni',
                strength: 1
            }
        ]
    } as NormalKepzettseg))
    ],
}