import { Harcertek } from "./Harcertek";
import { KapottKepzettseg } from "./Kasztok";
import { KEPESSEGEK } from "./Kepessegek";
import { NamedEntity, namedEntityArray } from "./util";

export interface Faj extends NamedEntity {
    kepessegek: Partial<Record<typeof KEPESSEGEK[number]['id'], number>>;
    harcertekAlap?: Partial<Harcertek>;
    infralatas?: number;
    kepzettsegek?: Array<Omit<KapottKepzettseg, 'id' | 'honnan'>>;
    leiras?: string;
    kulonlegesKepessegek?: string;
}

const FAJOK: Array<Faj> = [
    {
        id: 'ember',
        name: 'Ember',
        kepzettsegek: [{
            kepzettsegId: 'nyelv:',
            name: 'Nyelvtudás',
            fok: 4
        }],
        kepessegek: {},
        leiras: `Az emberek Yneven igen sokfélék, Gianag ködlepte, fagyos völgyeitől a Mélysivatag forró pokláig mindenhez képesek alkalmazkodni.

Távolról sem ők a kontinens legerősebb lényei, de találékonyságuk és puszta létszámuk következményeképp mindenképp ők tekinthetők az ismert világ
uralkodó fajának.
`
    },
    {
        id: 'elf',
        name: 'Elf',
        kepessegek: {
            izom: -2,
            allokepesseg: -1,
            mozgaskoordinacio: 1,
            reflex: 1,
            erzekeles: 2,
            emlekezet: 1,
            empatia: -1
        },
        harcertekAlap: { ce: 20 },
        kepzettsegek: [{
            kepzettsegId: 'lovaglas',
            fok: 3
        }, {
            kepzettsegId: 'idomitas',
            fok: 3
        }, {
            kepzettsegId: 'tuleles',
            fok: 3
        }],
        infralatas: 50,
        leiras: `Az elfeket két különböző csoportra oszthatjuk: a közönséges elfekre - akiknek jó néhány alfaja létezik
-, és az Óelfekre. Miután a M.A.G.U.S. rendszerében csak közönséges elffel lehet játszani, ezért itt és most csak
rájuk térünk ki. Íme!
        
Negyvenezer éve még csak Dél-Yneven léteztek elfek. Származásukat illetően csupán legendáikra hagyatkozhatunk - a legtöbb
bölcs Larion szigetét tartja őshazájuknak. A kráni Sötét Hatalom megjelenése után a Délen virágzó elf birodalom hanyatlásnak
indult. Életterük egyre szűkült, némely csoportjuk a fenyegetés elől Északra menekült, míg a délen maradottak beszorultak
Tysson Larba, hogy azután onnan is tovább meneküljenek a Lasmosi félszigetre. Itt élnek ma is, Elfendelnek nevezett
királyságukban. Északra költözött társaik szerencsésebbnek bizonyultak: a Nyugati Óceán partjától a kontinens belsejéig húzódó
komor erdőségekben - távol majd minden emberi civilizációtól - telepedtek meg. Birodalmukat Sirenar Szövetség néven jegyzik az ynevi
bölcsek.

Az elf elzárkózásra hajlamos, a világot csöndes méltósággal szemlélő nép - egyes feltételezések szerint a lélekvándorlás egy magasabb
lépcsőfokát jelentik. Mérhetetlenül hosszú ideig élnek az embernépekhez képest, s ez gondolkodásmódjukra, és viselkedésükre egyaránt
rányomja bélyegét. Türelmesek, emberi mércével gyönyörűek; bölcsességük, felhalmozott tudásuk elképesztő. A természet gyermekei,
mindenki másnál jobban ismerik az élővilágot, tisztelettel és végtelen megbecsüléssel közelítenek hozzá. Városaik, településeik erdők
mélyén állnak, követ csak elvétve használnak felépítésükhöz, ám művészetük és hozzáértésük folytán fából készült házaik vetekednek a
leggondosabban, legpazarabban megépített kőpalotával is. Idejük nagy részét elmélkedéssel, művészeteik gyakorlásával töltik, de az
univerzum legkitűnőbb íjászai is egyben, s nem kétséges: náluk jobb lovasokat nem hordott még hátán Ynev.

Testfelépítésük, mozgásuk inkább könnyed és légies, mint erőtől duzzadó, de gyorsak, akár a szarvas, és kézügyességük is párját
ritkítja. Bőrük halovány, hajuk aranyszőke, szemük borostyánszínű vagy mélykék.

Mindent összevéve csodálatos nép ez: egyedei - vetődjenek bárhová is Yneven - csodálatot, olykor azonban a babonaságok, előítéletek
miatt félelmet váltanak ki más fajok szülötteiből. Közömbös azonban senki sem marad irántuk. Nyugodt, türelmes életüket, megszokott
környezetüket nem szívesen hagyják el; az embernépek mentalitása teljességgel idegen tőlük. Nyíltak és egyenesek, igaztalanságon vagy
hazugságon nem kaphatja őket még ellenségük sem. Jellemük az Élet és a Rend értékeinek leghívebb tükre. Hogy olykor rossz hírüket
keltik, arról kizárólag az emberi civilizációban nevelkedett - s attól megrontott - fajtársaik tehetnek, akiknek - bár látszólag
mindenben azonosak elf birodalmakban élő társaikkal gondolkodását, erkölcseit már eltorzította a fiatalabb népek kultúrája. Igazi
elfek csak igen ritkán kapják el a „kalandozó-kórt", így a legtöbb elf kalandozó valamely emberbirodalomból, annak elf közösségéből
származik. Noha nem zárható ki, hogy az ősi földön élők némelyikében is kíváncsiság ébred a születésük óta jócskán megváltozott külvilág
iránt, ennek valószínűsége egy az ezerhez.

Bármennyire eltorzul is az emberek közt nevelkedett elfek értékrendje, némely ösztönüket sosem vetkőzik le. Minden elf - származzon
bárhonnét - nehezen viseli a kővárosokat, s a csillagos eget jobban kedveli fedél gyanánt, mint a cserepes tetőt. Az Élet szeretete ott
fészkel bennük, s - legyenek bár rettenthetetlen harcosok, netán híres gladiátorok - az öncélú pusztítás, a kegyetlenség távol áll tőlük.

A természet egyéb teremtményeivel kialakult évezredes jó kapcsolat sem múlik el nyomtalanul: nincs az az elf, aki tétlenül tűrné, hogy
egy állatot megkínozzanak, vagy egy ligetet fölöslegesen kivágjanak. Ez persze kölcsönös, az erdő s mező vadjai ösztönös bizalommal
viseltetnek irányukban, s ha egy nekivadult lovat, vagy őrjöngő kutyát keli lecsillapítani, az elfeknél jobban senki sem képes
teljesíteni a feladatot.`,
        kulonlegesKepessegek: `- Hallásuk élessége kétszerese a közönséges földi halandókénak. 
- Éles szemükkel két és félszer messzebbről felfedeznek mindent, mint az emberek. 
- Kiváló futók: annyiszor két óráig képesek könnyű futással haladni, amennyi az Állóképességük tíz feletti része. `
    },
    {
        id: 'félelf',
        name: 'Félelf',
        kepessegek: {
            izom: -1,
            reflex: 1,
            erzekeles: 1,
        },
        harcertekAlap: { ce: 10 },
        infralatas: 10,
        kepzettsegek: [{
            kepzettsegId: 'lovaglas',
            fok: 3
        }, {
            kepzettsegId: 'idomitas',
            fok: 3
        }],
        leiras: `
A félelfek Ynev legkülönösebb jellemű lényei. Egyik szülőjük elf, míg a másik ember, s ez a kettősség egész - igen hosszú - életük során
végigkíséri őket. Igazán sosem képesek beilleszkedni egyik nép világába sem - az embereknek túlságosan elfek, az elfeknek túlságosan
emberek. Gondolkodásmódjukban közelebb állnak az emberekhez - noha mindig egyfajta töprengő, a világ dolgain merengő hozzáállás jellemzi
őket -, külsejük azonban magán hordozza elf őseik örökségét. Légiesebbek,könnyedebbek mint az emberek - igaz, az elfeknél erősebb
testalkatúak -, vonásaik megnyerőek, hajuk szőke, olykor ezüstszín, szemük legtöbbször ibolyakék. Örökkön nyughatatlanok. Egyszer egy
dorani bölcs azt találta állítani róluk, hogy mindig helyüket keresik a világban, s bár ez kissé profán általánosítás, van benne némi
igazság.

Igen sok kalandozó kerül ki közülük, ennek oka nyilván a fenti tényekben keresendő. A két faj számtalan kitűnő tulajdonságát egyesítik,
ám vég nélküli - önmaguk számára is megmagyarázhatatlan - elégedetlenségük olyan átok, mely megakadályozza őket abban, hogy népük döntő
befolyással bírjon a világ sorsának alakításában. A természet furcsa fintora, hogy két félelf utódja is félelf lesz, sőt egy félelf és
tisztavérű elf Frigyéből is csak félelf születhet. Félelf és ember kapcsolatból mindig embergyermek születik.

A Félelfek is rajongva szeretik a természetet és az élőlényeket, noha korántsem olyan töretlen a kapcsolatuk vele, mint tiszta vérű
társaiké. Általában az Élet és a Rend erkölcsei szerint élik életüket, noha találhatunk köztük velejéig romlott, önmaguktól és a
világtól megkeseredett gyilkosokat is. Hazudni hamar megtanultak, ám a barátság szentségét még a legelvetemültebbek sem gyalázzák meg.`,
        kulonlegesKepessegek: `
- Hallásuk élessége másfélszerese az emberének, míg látásuk kétszerte élesebb.
- Kiváló futók: annyiszor 1 óráig képesek könnyű futással haladni, amennyi az Állóképességük tíz feletti része.
`
    },
    {
        id: 'torpe',
        name: 'Törpe',
        kepessegek: {
            izom: 1,
            allokepesseg: 1,
            egeszseg: 1,
            onuralom: -1,
            empatia: -1,
        },
        kepzettsegek: [
            {
                kepzettsegId: 'csapdafelfedezes',
                fok: 35
            }
        ],
        infralatas: 30,
        leiras: `
A törpék Beriquelről érkeztek, a P.sz. 1200-as években. Hamar barátságot kötöttek az Északi Szövetség népeivel, akik eleinte ugyan
különösnek találták ezt az aprótermetű fajt, mely szokásában és gondolkodásában igencsak elüt az embertől ám rövidesen rádöbbentek,
milyen kemény harcosokra, milyen hű barátokra tettek szert személyükben.

Való igaz: a törpéknél, az építészet, a statika szerelmeseinél keresve sem találni rendíthetetlenebb társakat. Életük egész tartama
alatt az állandóságot, a nyugalmat keresik - ám mivel Ynev és a valóság talaján is két lábbal állnak, pontosan felmérik, hogy az
állandósághoz, a nyugalomhoz és a kényelemhez munkára, vagyonra, vagyis kiemelkedettségre van szükség.Az átlag fölé emelkedés egyik
módja: maradandót alkotni. Aki látott már törpék építette palotát, netán megfordult a Tarinihegység mélyén kialakított barlangvárosaik
valamelyikében, tudja, miként viszonyulnak ehhez a kérdéshez. Épületeik, hídjaik bámulatosan szilárdak, századokig, sőt, akár ezredévekig
dacolhatnak az idővel. A törpék azonban nem csak az építészet területén alkottak nagyot. Erről azok mondhatnának bővebbet, akik viseltek
már ütközetben törpék kovácsolta páncélt, láncinget és pajzsot, vagy küzdöttek már tarini csatabárddal nem-tarini vértbe öltözött
szerencsétlenekkel.

A kiemelkedés második bevett módja a katonáskodás - s Tarin törpéi nagy számban élnek ezzel a lehetőséggel. Az Északi Szövetség
ármádiájának gyalogos derékhadát adják háború idején, de rettegést keltenek az ellenség szívében villámgyors mozgású rackla-lovasaik is.

Feljebbvalóik parancsát mindenkor képességeik legjavát adva teljesítik. Ha nem természetes ákadály állja útjukat, szétrombolják, legyen
az fatörzsek torlasza vagy roppant kövekből rakott fal; ha szorult helyzetbe kerülnek, az utolsó törpéig harcolnak, megadni sosem szokták
magukat.

Valamennyi törpe harcos számára adott az előmenetel lehetősége: hadijelvényeik alatt nincs más mérce, csakis a rátermettség.

Azok a törpék, akik fejüket kalandozásra adják, a harmadik megoldás mellett teszik le voksukat, mely kockázat tekintetében vetekszik ugyan
a másodikkal, viszont gyorsabb - és biztosabb - kiemelkedést tesz lehetővé az elsőnél. Északon gyakorta láthatók aranyaikat elmélyülten
számoló törpe kalandozók, Erionnál messzebbre azonban nem szívesen merészkednek, mert Dél emberközpontú birodalmai nem igazán az ő ízlésüknek
valók.

Ha további, nyugodt életük anyagi/erkölcsi feltételeit biztosítva látják, visszavonulnak otthonukba, melyet - minden tartozékával együtt -
egy rozsomák elszántságával védelmeznek. Előfordul persze, hogy egy - kezdetben csak anyagi érdekből kalandozó - törpe a nagyvilág, a kötetlen
munka és a kockázat szerelmesévé válik, s egész hosszú (kb. 800 év) életét ennek szenteli.

A törpék átlagos testmagassága 130 cm, alkatuk tömbszerű, nagy erőkifejtésre képesek, kitartásuk párját ritkítja. Arcuk széles; gyakorta
- de nem mindig - szakáll ékíti. Szemük sötét árnyalatú; az egészen ősi, beriqueli vérvonal képviselőié azonban gleccserkék is lehet.

Rendszerint csak egyszer házasodnak: a hűség fogalmának, az emberektől eltérő módon, csak egy változatát, a sírig tartót ismerik.
        `,
        kulonlegesKepessegek: `
- Időérzékük kiváló, a föld alatt, teljes sötétben is tisztában vannak vele, milyen napszak van éppen.
- A föld alatt - barlangrendszerben, kiépített pincékben és labirintusokban is (2 méter eltéréssel) meg tudják mondani, hogy milyen mélységben járnak. Ugyancsak tisztán érzik azt, hogy az út, amelyen haladnak, lejt vagy emelkedik, sőt jó közelítéssel megmondják a lejtés vagy emelkedés fokmértékét is.
- Képesek (plusz-mínusz 5 év eltéréssel) megmondani egy építményről, hogy mikor építették.        
        `
    },
    {
        id: 'udvariork',
        name: 'Udvari ork',
        kepessegek: {
            izom: 2,
            allokepesseg: 1,
            egeszseg: 2,
            erzekeles: 2,
            gondolkodas: -1,
            onuralom: -3
        },
        kepzettsegek: [
            {
                kepzettsegId: 'csapdafelfedezes',
                fok: 20
            }
        ],

        infralatas: 15,
        leiras: `
Mágikus beavatkozás eredményeképp létrejött faj, melynek egyedei az orkok legértékesebb tulajdonságait csillogtatják: a
makacsságig menő kitartást, a természetes, állati intelligenciát, a kérlelhetetlen vadságot - ezúttal az emberiség
céljai érdekében.

Az udvari - másképp nemesített - orkok Északon jelentek meg, első osztaguk egy ottani hatalmasság szolgálatában állt.
A „világhír", azaz inkább a koronás fők divathóbortja akkor kapta szárnyára őket, mikor kemény küzdelemben megmentették a
szorongatott nagyúr életét.

Alkotóik, mikor magasabb intelligenciával ruházták fel őket, csak bizonyos problémák kiküszöbölésére törekedtek, nem
szenteltek elég figyelmet az így létrehívott új faj asztrális és mentális adottságainak növelésére. Az emberi értelemben
vett érzelmek a „természetes körülmények" közt élő orkoknál sem mennek ritkaságszámba, az udvari orkok gondolatvilága azonban
olyannyira kifinomult, hogy ideális táptalajt jelent az öncélú lelki folyamatok - pl. szépelgés, melankólia - számára is.

Bármely udvari ork képes bonyolult gondolatfüzéreit akár egy álló héten át gombolyítani, mielőtt rászánná magát, hogy
végkövetkeztetéseit egy arra alkalmasnak látszó emberrel megossza. Ha megteszi, rendszerint csalódás az osztályrésze:
gondolatai hiába magvasak, szinte minden esetben sok ezer éve ismertek már, réges-rég papírra vetették őket azóta elporladt
tollforgatók. Az udvari orkok kisebbrendűségi érzése alighanem épp e szerencsétlen fáziseltolódás következménye. Filozófiáról,
művészetről egyszerűen képtelenek újat mondani alkotójuknak, az embernek - azt pedig, hogy személyiségük, személyük is értékek
hordozója lehet, nemigen tudják felfogni.

Az udvari orkok az Északi Szövetség országaiban mindenütt megtalálhatók, ám uraik kíséretében Ynev majd' minden tájára
eljuthatnak. Az utóbbi évszázadban vált általánossá az a gyakorlat, hogy a főnemesek kiemelkedő képességű udvari orkjaikat
taníttatják, netán szélnek is eresztik - ekkor jelentek meg a kontinensen a kalandkeresők között.

A kalandozók nem adnak sokat a külsőre, annál többet a belső értékekre: társaságuk ideális a gátlásoktól gyötört, melankóliára
hajlamos udvari orkok számára, akiket bizonyos idő elteltével biztosan helyre ráznak. Egy-egy kalandozócsapat roppant vegyes
összetételű lehet - Erion csapszékeiben hallani történeteket olyan „vitézi különítményről", melynek vezetője és „esze" udvari
orkként kezdte pályafutását.

Az udvari orkok átlagos testmagassága 180 cm, szőrzetük világosabb árnyalatú Káosz teremtette társaikénál, arcukon és nyakukon
kimondottan ritkás - és jó hogy az, mert a boldogtalanokat még ez is szégyenérzettel tölti el. Ha egy udvari ork kalandozó
társai nem ügyelnek eléggé, ha a férfiak nem tartják állandóan maguknál borotvájukat, egy reggel azon vehetik észre magukat, hogy
egy csupasz képű szörnyeteg az útitársuk... Az udvari orkok szeme savószínű, ritkábban földbarna. Kínosan tiszták - egy
természetes állapotú, közönséges ork éppúgy undorral tölti el őket, mint az embereket.

Az igazi orkokhoz fűződő viszonyuk egyébként is sajátságos: mindkét faj képviselői saját torzképüknek tekintik a másikat. Az
udvari orkok azért gyűlölik a vadon élőket, mert őket teszik felelőssé az emberek előítéleteiért - a vadon élő ork pedig faja
minden - amúgy kétes - értékének árulóját látja az udvariban. Keveredés a két faj között sosem fordul elő.
        `,
        kulonlegesKepessegek: `
- A Föld alatt - barlangrendszerben, kiépített pincékben, és labirintusokban is (4 méter eltéréssel) meg tudják mondani, milyen mélységben járnak. Ugyancsak tisztán érzik azt, hogy az út, melyen haladnak, lejt vagy emelkedik, sőt jó közelítéssel megmondják a lejtés vagy emelkedés százalékos mértékét is.
- Az udvari orkok szaglása igen kifinomult: ötször jobb, mint az embereké, így tájékozódni is kiválóan tudnak ez alapján. Számokban kifejezve:
  - 2 óránál frissebb nyomot 80% eséllyel képesek követni,
  - 4 óránál nem régebbi nyomot 60% eséllyel követnek,
  - 8 óránál frissebb nyomot 30%-ban képesek követni,
  - 12 óránál frissebbet 15%-ban követnek,
  - 24 óránál nem régebbit pedig 5% eséllyel követnek.
Egy napnál régebbi nyomra nem tudnak rábukkanni. A fenti esélyekre óránként kell dobni, s amennyiben a százalékértéknél kevesebb a dobás eredménye, az udvari ork képes követni a nyomot. Ha több, úgy elveszítette, de -10-es módosítóval újra próbálkozhat, egészen addig, míg meg nem leli a nyomot, vagy esélye nullára nem csökken.
        `
    },
    {
        id: 'amund',
        name: 'Amund',
        kepessegek: {
            izom: 1,
            allokepesseg: 1,
            empatia: -2,
            onuralom: -1
        },
        leiras: `
Az amundok, vagy ahogyan a Taba el Ibarában nevezik őket, az Ősi Nép, évezredeken át rejtőztek a sivatag mélyén. A pyarroni időszámítás előtti harmadik
évezredben vonultak vissza a történelem színpadáról, hogy félrehúzódva, más népektől és kultúráktól elzárkózva vészeljék át a viharos korszakokat.
Létezésükről nem árulkodott más, csak a sivatag szélén hátrahagyott templomromok, s az el qusarmai faúsztatók történetei a Shibara partján látott
különös, égszínkék szemű emberekről. Senki sem tudta, valóban élnek –e a sivatag mélyén, vagy csupán egy megrendítően valószerű legenda szereplői.
Az igazsághoz hozzátartozik, hogy rémtetteikkel mindent el is követtek elszigeteltségük érdekében.

Az elmúlt évtizedben azonban gyökeresen megváltozott minden. A sivatagszéli templomromoknál kezdődött: az oszlopcsarnokok árnyékában meghúzódó
utazók kísérteties suttogást véltek hallani a mélyből, évezredes álmukból riadó, túlvilági teremtmények hangját. Rövidesen bronzbőrű, égszínkék szemű
emberek jelentek meg a környéken, különös dolgok történtek, karavánok tűntek el nyomtalanul. A bölcsek félve suttogtak egy nevet: Amhe-Ramunét, a
már-már elfelejtett sivatagi istenét.

Amhe-Ramun visszatért, hogy elűzze a dzsenneket és az embereket, hogy helyreállítsa bujkáló népének dicsőségét. Vezetésével amund hordák törtek elő a
sivatag mélyéről, felégették a dzsad falvakat, porig rombolták az idegen templomokat, kardélre hányták vagy rabszolgasorba kényszerítették az embereket.
Legyőzhetetlenné tette őket Ynevre szállt istenük hatalma.

Az amund nép nem emberi faj. Más létsíkról érkeztek az idők kezdetén, s a mai napig megőrizték vérük tisztaságát. Ősi ellenségeikkel, a dzsennekkel már
más síkokon is pusztító háborúkat vívtak, mondáik szerint a háború pusztításai miatt kellett elhagyniuk ősi hazájukat. Amikor aztán Yneven is
összetalálkozott a két faj, a gyűlölet iszonyú és véres háborút eredményezett közöttük.

Az évezredes harcban kimerülve egyik nép sem tudott ellenállni az emberi faj térhódításának. A fennmaradás két ellentétes módját választották. A
dzsennek elkeveredtek az emberekkel, s azok vezetőivé váltak, míg az amundok visszahúzódtak a sivatag mélyére, Titkos Városaikba, s mindent elkövettek,
hogy távol tartsák maguktól az emberiséget. Titkon várakoztak legfiatalabb istenük, Amhe-Ramun visszatértére, hogy segítségével végérvényesen legyőzzék
ősi és új keletű ellenségeiket. Most, hogy az idő elérkezett, mégis akadnak közöttük néhányan, akik ezt nem így képzelték.

Az amund civilizáció eredetileg négy istent ismer. A főisten Themes (Theemeth), a Napisten; forró csókjának nyomát a mai napig testén viseli a
Földanya, Refis (R-eefith) – ez a rejtélyes opálmező, s itt áll a Nap Első Titkos Városa, Sonnion (Thon-nion). A csókból fogant Nesire (Nethiree), a
Vörös Hold, a Szerelem és a Szépség Istennője, valamint Amhe-Ramunm a Kékarcú, a Háború és az Egység Istensége. A dzsennekkel vívott három évezredes
háborúban a legifjabb és legkegyetlenebb isten, Amhe-Ramun alászállt Ynevre, ám Manifesztációja elpusztult. Újabb eljövetelét hat évezreddel későbbre
jósolták papjai. Hitét hosszú időre elfeledte az amund nép, ám az idő közeledtével lassanként újra templomokat emeltek a Kékarcú istenségnek, s papjai
egyre több befolyással bírtak.

Elsőként – a P.sz. IV. évezred hajnalán – Nesire veszítette el híveit. A Kékarcú papjai véres testvérháborút indítottak: Nesire papnőit meggyilkolták,
híveit erőszakkal áttérítették. A Nap Harmadik Titkos Városának romjait lassanként elnyelte a homok. Talasea (Thalatheia), Refis városa e század
derekán pusztult el, lakosságát a megerősödő Amhe-papság az utolsó szálig megölette. A főisten, Themes papjai, látva közelgő végzetüket, még tettek
néhány elkeseredett lépést hitük megmentésére, de idővel vagy behódoltak a futótűzként terjedő testvérhitnek, vagy mártírhalált haltak istenükért.
Mire a Manifesztáció ideje elérkezett, a Nap Titkos Városai közül már csak Sonnion állt, templomaiban pedig egyetlen istenhez fohászkodtak,
Amhe-Ramunhoz, aki, úgymond, elhozza népének az egységet és a hódító háborút.

Az amundok testi hasonulással hódolnak isteneiknek, az isteni tökéletességnek. Társadalmukban jelentős szerepet tölt be a küllem, minden amund ősi
szertartások szerint formálja testét az istenszobrokhoz hasonlatossá. Testük szoborszerűen szép. A férfiak atléta termetűek, a nők pedig szépségükkel a
dzsad hurikat is megszégyenítik. A nemesi származásúak (értsd: papok) a homokot taszító, illatos olajjal kölcsönöznek bársonyos, csillogó fényt
bronzbarna bőrüknek. Arcvonásaik lágyak, előkelőek, halántékig húzódó, keskeny vágású szemükben mély kékség honol; fekete, egyenes szálú hajukat körben
azonos hosszúra, nyaktőig vágják. Mivel földjükön a nap egész évben hevesen tűz, az Ősi Nép fiai és leányai mindössze hófehér ágyékkötőt viselnek és
remekmívű ékszereket – a papok aranyból, a közrendűek rézből. A csúfnak született vagy utóbb megnyomorodó amund – az évezredek során egyre ritkábban
esik meg ilyen szégyen - megajándékoztatik a halállal, azaz az újjászületés lehetőségével egy ép testben.

Az amund nép kifinomult, az emberitől idegen intellektussal rendelkezik. Elvont módon gondolkodnak, a gyakorlatiasság, a politikai érzék, az intrikus
hajlam teljességgel hiányzik belőlük. Logikájukban elfogadott tényezőm az érzelem: a szeretet, a harag, gyűlölet számukra egyenértékű a
legkikezdhetetlenebb érvekkel.

E sajátságuk alapján akár nemes lelkűek is lehetnének, ha nem fertőzné meg jellemüket a rosszindulat, a romlottság. Mindenkiben ellenséget látnak; aki
különbözik tőlük, azt lenézik. Különösen igaz ez az emberekre, akiket állatként tartanak számon, s mint ilyeneket, elsősorban rabszolgának és élelemnek
tekintik őket.

Az amund társadalom két kasztra osztható, a szolgák és az uralkodó-papok kasztjára. (Figyelem, ezek társadalmi és nem karakter kasztok!) Utóbbiba
tartoznak a négy amund istennek – illetve napjainkban már csak AmheRamunnak – a papjai. Ők irányítják az amund civilizációt, számtalan szolgával és
rabszolgával rendelkeznek, és rangjuktól függő pompában élnek. A leghatalmasabbak közülük a szó legszorosabb értelmében véve élet és halál urai.
Régebben gyakran előfordultak a kaszton belüli villongások, ám a Kékarcú ideje óta isteni törvény az Egység.

Az uralkodó-papok (hat-neb) kasztjába csak a születés jogán kerülhet bárki. Ez azonban nem a származáson, hanem a veleszületett képességeken múlik.
Uralkodó-papok gyermekei gyakorta születnek a szolgák kasztjába – habár kétségtelenül kiváltságos elbánásban részesülnek -, és egy szolga gyermekét is
haladéktalanul magához veszi nevelésre a papság, ha felfedezik rajta a keresett jegyeket. Hitvallásuk szerint maguk az istenek jelölik ki leendő
papjaikat: ha egy gyermek lát a templom-piramisok sötétjében (ultralátás!), az istenek jegyét viseli.

A szolgák kasztjába (hebet) tartozik az összes különleges képességek nélkül született amund, még az uralkodó-papok testőrei is. Az ide sorolt amundok
élete sem nevezhető keservesnek, mindössze meg kell tanulniuk együtt élni a kiszolgáltatottsággal. Az alávaló munkákat rabszolgákkal végeztetik, az
amund szolgákra csak felelősséggel járó, avagy művészi hajlamot igénylő feladatokat bíznak. 

A M.A.G.U.S.-ban játéktechnikailag külön kell választanunk az amund fajba tartozó Játékos és Nem Játékos Karaktereket. Igazi amund, akit népe nevelt
fel, s máig is közöttük él, csak NJK lehet. Az ilyen karakter – értelemszerűen – általában ellenfélként, ellenségként bukkan fel a kalandban, hiszen
az amundok megvetik az embereket, és a M.A.G.U.S. jelenében papjaik vezetésével szent háborút vívnak az emberiség ellen. Természetesen az eddig leírtak
alapján a KM sem igazodhat el tökéletesen az amund kultúrában, de éppen a háború miatt, amely napjainkban Ynev egyik legjelentősebb történése, szüksége
lehet amund NJK-kra.

A Játékos által megszemélyesített amund a kiszakadt elfhez hasonló. A Themes-papok, amikor közeledett a Manifesztáció időpontja, sok különleges
képességgel megáldott amund gyermeket – elsősorban saját ivadékaikat – menekítettek ki mágia segítségével az Amhepapok befolyása alá kerülő amund
civilizációból. A papnak alkalmas, de eltávolított gyermekek nem erősíthették tovább a Kékarcú kultuszát, de magukkal vitték annak lehetőségét, hogy
egyszer majd megismerjék apáik sorsát, és visszatérjenek ősi istenükhöz. A kitett árvák többsége odaveszett. De néhányra rátaláltak az emberek
– és ezen, emberek között nevelkedett amundok valamelyikével játszhat a játékos.

A JK amund keveset tud népéről, és saját képességeit, lehetőségeit sem ismeri. Mivel embernek nevelték, sok szempontból inkább embernek számít, mint
amundnak.

Természetesen külsejét nem vetkőzheti le, de nem amund módra öltözik, hanem emberi ruhákban jár, emberi fegyvereket használ, emberi szokások szerint
él. Jellemének két vonását őrzi csak meg: egyrészt előszeretettel hallgat az érzelmeire, másrészt sohasem tud tökéletesen azonosulni a jót hirdető
eszmékkel.

Lelke mélyén ott lappang a rosszakarat; ha a jó oldalt szolgálja is, gyakran folyamodik a gonosz eszközeihez. Elméletileg bármelyik karakterkaszt
tagja lehet, de a gyakorlatban, születésétől erős testalkata révén, általában fegyverforgató válik belőle.

A legismertebb kiszakadt amund – habár álarca miatt csak legközelebbi társai ismerik származását – a legendás kalandozó, Alex con Arvioni. 
        `,
        kulonlegesKepessegek: `
Az amundok Asztrál és Mentál testének felépítése alapvetően különbözik az emberekétől, ezért az emberek által használt Pszi-iskolák diszciplínái nem
hatnak rájuk, ugyanakkor nem is képesek elsajátítani azokat. Amund karakternek, legyen szó akár „igazi” (NJK), akár emberek által felnevelt „kiszakadt”
(JK) amund, soha nem lehet Pszi Képzettsége. Ugyanakkor az asztrális és mentális mágiák elleni védelem minden amund veleszületett képessége; olyan
képesség ez, amelyet idővel egyre magasabb szinten képesek alkalmazni. Elméjüket a Pszi Dinamikus pajzsához hasonló Asztrál és Mentál pajzs övezi.
Ezen a külső mágikus hatások szintúgy csak akkor képesek átjutni, ha erősségük meghaladja a pajzs erősségét. A pajzsok erőssége Tapasztalati
Szintenként növekszik, közrendű amundok esetében 4-gyel, uralkodó-papnak alkalmas, különleges képességekkel születetteknél pedig 5-tel. A pajzsok a
dinamikus pajzsokhoz hasonlóan bonthatók a Pszi idevonatkozó diszciplínájával. Az amundnak nem szükséges meditálnia lerombolt pajzsainak újraépítéséhez,
azok folyamatosan, maguktól regenerálódnak: az elveszített erősség (E) pontok a Pszi-pontokhoz hasonlóan térnek vissza.

Az amundok soha nem fejlesztették ki saját Pszi-iskolájukat, azt azonban felismerték, hogy rendelkeznek néhány velük született képességgel. Ezen
képességeket minden, népe körében felnőtt amund megtanulja használni, ám a kiszakadtaknak maguknak kell felismerniük és kitapasztalniuk adottságaikat.
Minden egyes különleges képesség esetében sikeres Gondolkodás-próba függvénye, hogy a karakter ismeri –e és használhatja –e azt; sikertelen próba
esetén a Játékos kénytelen lemondani az adott képesség nyújtotta előnyökről mindaddig, amíg egy másik, tapasztaltabb amund ki nem tanítja. Ekkor
minden gyakorlással töltött hónap végén megismételheti a próbát, amíg csak fáradozása sikerrel nem jár.

A fenti szabály alá az alábbi különleges képességek tartoznak:

1. **Telekinézis**: szintenként 10 kg súly mozgatható 10 percig, naponta egyszer.

    *A meditáció ideje: azonnali*

    *Agyi energiáink segítségével kisebb tárgyakat mozgathatunk látótávolságon belül. Elfordíthatunk a zárban egy kulcsot, a tőlünk távol heverő fegyvert
    magunkhoz húzhatjuk, vagy észrevétlen elcsenhetünk az ékszerészműhelyből némi drágaságot. A diszciplína alkalmazása taglejtéseket nem igényel, pusztán
    a mozgatni kívánt tárgyon kell tartani tekintetünket. Amint elfordulunk, vagy valami eltakarja a tárgyat, az mozdulatlanná válik, esetleg – ha a
    levegőben volt - lepottyan. A Telekinézis csak lassú mozgatásra alkalmas - egy futó ember sebességénél nagyobbat nem érhetünk el vele ezért ilyen
    módon fegyvert dobni, vagy sebesülést okozni szinte lehetetlen. A diszciplína kifejti hatását mágikus tárgyakra is.*

2. **Telepátia**: akit egy amund lát, azzal bármikor, bármilyen hosszan képes telepatikus úton üzeneteket közölni, elegendő a feladatra összpontosítania.
    Két amund esetében ez hosszú társalgást is jelenthet. Ha az üzenet küldője nem látja a címzettet, alaposan ismerniük kell egymást ahhoz, hogy az
    összeköttetés létrejöjjön.
    
    #### Telepátia (Gondolatátvitel)
    *A meditáció ideje: 3 kör*

    *Segítségével gondolati úton lehet beszélgetni, vagy
    az alkalmazó által felidézett képeket közölni. A
    Telepátia alkalmazásához a Gondolatátvitel
    megkezdőjének tökéletesen ismernie kell a
    gondolatokat fogadó személyt – ebben az esetben a
    távolság nem számít -, vagy látnia kell azt.
    Egyszerre legfeljebb két elme kapcsolható össze
    Telepátiával, tehát a gondolati úton történő
    beszélgetésbe nem lehet harmadik részről sem
    beleszólni, sem azt lehallgatni.
    Az egyetlen olyan diszciplína, mely megtalálja a
    módját, hogy hatása átszivárogjon a Statikus
    Pajzson, noha a Dinamikus Pajzs ezt is
    feltartóztatja. Ha egy efféle pajzsot viselőnek
    küldenek Telepátiával üzenetet, az csak azt fogja
    érzékelni, hogy kapcsolatot keresnek vele, ám a
    beszélgetés csupán a fogadó Dinamikus Pajzsának
    lebomlása után jöhet létre.*
    
3. **Perzselő tekintet**: ha összpontosít, az amund képes tekintete erejével egy kör alatt lángra lobbantani az éghető anyagokat.
    
    #### Perzselő tekintet
    
    *Sebzés: k6*  
    *Időtartam: 6 kör (1 perc)*  
    *Meditáció ideje: azonnali*  
    
    *Az időtartam lejártáig képes arra, hogy tekintetével
    megperzselje azokat a zónáján belül eső tárgyakat,
    amelyekre pillant. Ez az éghető anyagokat nyomban
    lángra lobbantja, a kevésbé éghetőeket pedig
    megperzseli, fémek felolvasztására nem alkalmas. A
    gyújtópontban a hőmérséklet megközelítőleg 150 C
    fok, amely az élőlényeknek K6 Sp sebet okoz
    körönként. A hatóideje alatt az amund szeme
    halvány vörös fénnyel
    parázslik.*
4. **Ultralátás**: az uralkodópapok kasztjába – azaz a különleges képességekkel – születettek 20 méter távolságig olyan tökéletesen látnak a legmélyebb
    sötétségben is, mint mások napfénynél. Az amundok lények képesek az ibolyántúli sugarak alapján tájékozódni. E nagyon rövid hullámhosszú sugarak
    segítségével még Éjközép idején és sötét, ablaktalan helységekben is tökéletes kép látható – akárcsak fényes nappal, normális látás esetén.

    Az ultralátás egyetlen hátránya, hogy használója számára minden kékes árnyalatú: a színek ilyenkor nem különböztethetők meg. Az ultratartományban
    szemlélődő amund legfeljebb húsz méterre lévő dolgokat láthat, az annál messzebbről érkező sugarak már nagyon gyengék.
        `

    },
    {
        id: 'dzsenn',
        name: 'Dzsenn',
        kepzettsegek: [{
            kepzettsegId: 'pszi:dzsenn',
            fok: 3
        },
        {
            kepzettsegId: 'pszi:pyarroni',
            fok: 3
        },
        {
            kepzettsegId: 'harcmodor:ketkes',
            fok: 3
        },
        ],
        kepessegek: {
            gondolkodas: 2,
            emlekezet: 2,
            osszpontositas: 2,
            hit: -2,
            empatia: -2
        },
        leiras: `

A dzsenn titokzatos nép. Habár nem emberek, emberek között, az emberi társadalom elválaszthatatlan
részeként élnek; már elképzelni sem tudnák, hogy önálló társadalmat alkossanak, mint egykoron. Hozzászoktak a
jóléthez, a szolgák seregéhez és a temérdek kincshez. A Taba el Ibara valódi urai ők, a dzsad világ igazi
hatalmasságai.

Számuk a kezdeti tízezrekhez képest az idők során riasztóan megcsappant, mára alig ezer főre tehető. Idegen
származásukkal nem kérkednek, legfeljebb egymás előtt fedik fel kilétüket. Vérük tisztaságára feltőnés nélkül, de
Kalandozók IV. Nyári Tábora Fanfár a Hősökért: Nesire Moso54.
gondosan vigyáznak; ősi uralkodócsaiádjaikból kerül ki a legtöbb dzsad emír és sejk, de a nagy bank– és
kereskedőházak tulajdonosai is.

A dzsadok természetesen tudnak létezésükről: egyes uralkodókról, nagyhatalmú kereskedőkről köztudott
dzsenn származásuk, megint másokról csak feltételezhető. Valójában jóval többen élnek a Taba el Ibarában, mint
bárki gondolná – rejtőzésük fő oka nagyszámú ellenségük. A dzsadok messziről tisztelik őket mint uralkodókat,
vezetőket, hiszen azok amúgy is megközelíthetetlenek, de a mindennapi életben rettegnek a dzsennektől könyörtelen logikájuk, számító, érzelmektől mentes gyakorlatiasságuk miatt.
Az ember számára a dzsenn kiszámíthatatlan. Hiába jószándékú, a magasabbrendü célok érdekében bármire
hajlandó – sosem tudni, fennkölt célja kinek az életébe, a vagyonába kerül. Ezért a dzsadok, ha kiderül valakiről
dzsenn származása, gyakorta végeznek vele titokban, mielőtt az illető bajt hozhatna környezetére.

Míg az amund rosszindulatú, érzelmeire vakon hallgató faj, a dzsemeket a számító logika, a fékentartott,
letisztult érzelmek és a jóakarat vezérli. A következetes gondolkodásnak, a logikának óriási és ősi hagyományai
vannak körükben. A különféle bizonyítási eljárásoknak, érveknek, ellenérveknek, gondolati utaknak, iskoláknak
és eszmefuttatásoknak könyvtárakat megtöltő irodalmával rendelkeznek. Elméleti tudásuk és született
képességük révén e téren úgyszólván felülmúlhatatlanok, a köznapi ember számára hihetetlen teljesítményre
képesek, épp ezért félelmetesek. Az emberek általában mentesnek gondolják őket az érzelmektől, holott csak
tökéletesen uralkodnak azokon. Nem jönnek ki a sodrukból, nem ragadtatják magukat heves cselekedetekre,
mindig megfontoltak és hővösek. Tartózkodnak minden élvezettől, mely józan eszük és mérlegelőképességük
elvesztését okozná: csak mértékkel isznak szeszt, és elutasítják a dzsadok által közkedvelt bódítószereket.
Ugyanakkor ha valamely érzelem – győlölet, szeretet, barátság, hőség vagy bosszúvágy – egyszer befészkelte
magát a lelkőkbe, többé nem távozik onnan. Ilyen tekintetben a dzsennek nem felejtenek; mint mindenben, az
érzelmeikben is megbízhatók.

Mikor őshazájukat odahagyva megérkeztek Ynevre, ősi ellenségeikkel az amundokkal találták magukat
szemben. Az újra fellángoló háborúból meggyengülve, de – mint Ynev térképére pillantva látható – győztesen
kerültek ki, legalábbis a Manifesztációs Háborúig.

A dzsennek egykor nem mágiájukkal, seregeikkel kerekedtek felül az amundokon, hanem az emberek
segítségével. A Taba el Ibara peremén feltőnő embernép akaratán kívül
segítette győzelemre őket, hiszen az amundok képtelenek voltak elviselni az emberek tömegét, harsány
életkedvét, s visszavonulni kényszerültek előlük. Ellenben a dzsennek természetüknél fogva társat, barátot láttak
az új fajban. Hamar megtanulták irányítani és kihasználni a náluk kevésbé eszes, érzelmektől lángoló embert.
Eleinte mértéktelenül keveredtek is velük – létrehozva a dzsadok népét –, ám idővel felismerték, utódaik alig
örökölnek valamit természetükből, s ezáltal veszélybe kerülhet fajuk fennmaradása. Ettől fogva a dzsennek
gondosan vigyázzák vérük tisztaságát. A fertőzött vérő utódokat kizárják maguk közül, csak kevésbé jelentős
feldatokra tartják őket alkalmasnak.

A dzsadok istenei, Galradzsa, Doldzsah és Dzsah eredetileg a dzsennek istenei voltak –, rnint kultúrájuk
számtalan vonását, ezt is örökül hagyták utódaikra. A dzsennek közeli, személyes kapcsolatban állnak
isteneikkel, imáikhoz, fohászaikhoz nem igénylik papok segítségét. Dzsenn soha nem teszi be a lábát dzsad
templomba, s ha mégis, nem érzi fennköltebbnek a helyet saját házánál.
Az átlagos dzsenn külsejét tekintve megkülönböztethetet-len a dzsad embertől. Bőre barna, haja hullámos,
olajos-fekete, orra merészen ívelő, gyakorta horgas, szeme sötét. Magas termető, elegáns megjelenéső, az
átlagosnál kifinomultabb arcú dzsadnak látszik. 

**Dzsenn szablya**

A dzsennek hagyományos és jellegzetes fegyvere a róluk elnevezett szablya. Alapvetően egykezes fegyver, de
markolata elég hosszú ahhoz, hogy olykor kétkézre foghassák. Forgatásának tecnikája, a mozdulatok
kimunkáltsága és a harcmodort átható szellemi többlet emlékeztet a harcmővészetekre. A keskeny, vékony,
hajlított pengéjő kardot mágiával kovácsolják páratlanul rugalmassá és törhetetlenné. Kovácsolásának fogásai, a
felhasznált fémek ötvöXési aránya szigorúan őrzőt titok, melyet a dzsenn kovácsmővészek apáról fiúra örökítenek.

A dzsenn szablya a dzsenn legfőbb ékessége, mégis gyakorta álcázza, jóval szélesebb, handzsárhoz,
hagyományos szablyához készült hüvelyben hordja, hogy ne váljon árulójává. Természetesen az uralkodó
családok sarjai büszkén viselik ősi fegyverüket, ahogyan számtalan hiú és vagyonos dzsad is dzsenn szablyát köt
az oldalára. Az efféle kérkedóket a dzsennek lenézik, ugyanakkor megbecsülésük legfőbb jeleként szablyát
ajándékoznak az erre érdemesnek. 
`
    },
    {
        id: 'khal',
        name: 'Khál',
        kepessegek: {
            izom: 3,
            allokepesseg: 2,
            egeszseg: 3,
            reflex: 2,
            erzekeles: 3,
            mozgaskoordinacio: 1,
            onuralom: -5
        },
        kepzettsegek: [
            {
                kepzettsegId: 'harcmodor:ketfegyver',
                fok: 2
            },
            {
                kepzettsegId: 'futas',
                fok: 3
            },
            {
                kepzettsegId: 'tuleles',
                fok: 2
            },
            {
                kepzettsegId: 'lopozas',
                fok: 30
            },
            {
                kepzettsegId: 'rejtozes',
                fok: 30
            },
            {
                kepzettsegId: 'eses',
                fok: 20
            },
            {
                kepzettsegId: 'maszas',
                fok: 20
            },
            {
                kepzettsegId: 'ugras',
                fok: 20
            },
            {
                kepzettsegId: 'zarnyitas',
                fok: -30
            },
            {
                kepzettsegId: 'zsebmetszes',
                fok: -50
            },
        ],
        leiras: `
A khálok a titokzatos Démonikus Óbirodalom uralkodóinak elkorcsosult ivadékai. Az ősi rituálékból mára már csak egy a nomádokéval rokon
vallás maradt fent.

A Déli hegységben, a világtól elzárkózva
él a khál nép. Őshazájukon kívül csak néhány ezren
tengetik létüket, királyok, uralkodók, nagyurak
testőreként. Olyan családok leszármazottai, akiket
hazájuk száműzött, ugyan ősi hagyományok szerint
élnek, de haza már nem térhetnek.

Jóval magasabbak az embernél, átlagos
magasságuk 2m feletti, testsúlyuk 140-200kg, barna
bőrüket világos- vagy sötétbarna ritkán fekete,
csillogó szőrzet fedi, sörényük (ápoltsága alapján
hajuk) hollófekete. Arcuk az emberi arc s a nagymacska pofájának harmonikus keveréke, néhány
jellemző bajuszszál kivételével csupasz. Fogaik tűhegyes tépőfogak, szemük borostyánszínű, szőrös
mancsuk kiereszthető karmokban végződik, farkuk
az oroszlánéra emlékeztet.

Állati ösztöneik kifinomultabbak, viselkedésükben gyakran állatinak tetsző indokok vezérlik
őket, holott intelligenciájuk emberi. Nagyon heves
vérmérséklet jellemzi őket: virtus, néha még a józan
ésszel szemben is inkább az ösztöneikre hallgatnak.
Másik kulcsszavuk: becsület. A khál szava szent,
hiszen becsületének megnyilvánulása. Kétszer is
meggondolja mire adja a szavát, de ha megtette, azt
többé sohasem szegi meg. Jellemük minden esetben
Rend és Élet, ritkábban Élet és Rend vagy csak
Élet.

Mindig feltűnést keltenek, ez olykor előny,
máskor ellenben leküzdhetetlen akadály. Kevesen
ismerik fajtájukat, de akik igen, azok szerfelett elővigyázatosak velük szemben. 
        `,
        kulonlegesKepessegek: `
- 2x látás
- 2x hallás
- 5x szaglás  
    2 óránál frissebb nyom: 80% eséllyel követik  
    4 óránál nem régebbi: 60% eséllyel követik  
    8 óránál frissebb nyom: 30% eséllyel követik  
    12 óránál frissebbet: 15% eséllyel követik  
    24 óránál nem régebbit 5% eséllyel követik  
    egy napnál régebbire nem tudnak rábukkanni  

    Az esélyeket óránként kell dobni, s amennyiben a
    százalékértéknél kevesebb a dobás eredménye, a
    khál képes követni a nyomot. Ha több, úgy elveszítette, de –10-es módosítóval újra próbálkozhat,
    egészen addig, míg meg nem leli a nyomot, vagy
    esélye nullára nem csökken.
- veszélyérzékelés: ösztönösen megérzik a veszélyt (20%), ha az életükre tör (40%)
- mancsuk sebzése k6 zúzó/vágó, KÉ: 10, TÉ: 20, VÉ: 20
- ordításával képes megvadítani az állatokat
- minden asztrális varázslat és diszciplína 2-vel nagyobb erősséggel hat rájuk
- Ψ-t csak 2. fokon képes elsajátítani (ha az Önuralom legalább 12!), 3. fokra csak a fejvadász vagy lovag kasztú fejlesztheti, tovább meg ők sem

- Fegyvereik:
    Ezekkel a tradicionális fegyverekkel a kitaszított khál is megtanul harcolni (3 Fegyverhasználat Af), de új hazájuk fegyvereinek
    forgatását is megtanulják, kivéve a harcművész kasztúak.

    **Ghon, a szarvkard**
    KÉ:10; TÉ:15; VÉ:25; Sebzés:k6+3 szúró/vágó;
    Forgatásához mindkét kéz szükséges,
    
    **Rakhar, a tőrkarom**
    KÉ:8; TÉ:12; VÉ:6; Sebzés:k6 szúró/vágó;
    
    Egymás mellé erősített görbe és egyenes tőrpengéből áll. Szúrásra, tépésre is jó.
    
    **Khrga, egykezes szarvkard**
    
    KÉ:7; TÉ:15; VÉ:14; Sebzés:k6+1 szúró/vágó;
    
    Két egykezes fegyverből álló készlet.
    
    **Harak (páncél)**
    SFÉ: 4; MGT: -1. Anyaga: acélbőr.
    
    Ezen kívül mást nem hordanak, ezt is csak csata előtt, ősi rítus keretében öltik magukra
`
    },
    {
        id: 'gnom',
        name: 'Gnóm',
        kepessegek: {
            izom: -2,
            mozgaskoordinacio: 2,
            egeszseg: 1,
            emlekezet: 1,
            erzekeles: 2,
        },
        infralatas: 30,
        kepzettsegek: [
            {
                kepzettsegId: 'mechanika',
                fok: 2
            },
            {
                kepzettsegId: 'terkepeszet',
                fok: 2
            }
        ],
        leiras: `

Nagymúltú, ősi faj, melynek legbelső titkai sohasem kerültek a nagy nyilvánosság elé, s amit az embernépek tudnak vagy tudni vélnek róluk, azt
jobbára ők maguk engedték kiszívárogni.

Ennek megfelelően számos tévképzet él róluk a köznép körében, bár érdemes megjegyezni, hogy akadnak Ynevnek olyan pontjai, ahol azt sem tudják,
mi fán terem ez u faj. Még néhány magasegyetem fóliánsai — és magiszterei — is azt állítják, hogy náluknál visszahúzódóbb és barátságosabb fajt
nem hordott hátán a föld. Ha ezek a tudósok valaha is szembekerülnének egy gnómmal, valószínűleg azonnal megváltoztatnák ebbéli véleményüket.

Való igaz ugyan, hogy ez a nép jobbára saját fajtársai között érzi magát otthon, s hogy ha csak lehet, szeret mindenkitől háborítatlanul
tevékenykedni, de minden gyámoltalanságukról és gyengeségükről szóló híresztelést megcáfolnak azok, akik személyes kapcsolatba kerültek velük
valaha is. Maguk a gnómok sem tagadják, hogy szinte az idők kezdete óta jelen vannak Yneven, ám azt a véleményt, miszerint a Káosz teremtményei
lennének, következetesen visszautasítják. Valóban egyidősek lehetnek az amundokkal és dzsennekkel, s néhányan közülük még arra is hajlanak, hogy
az elfek vagy az aguirok ís velük egykorúak. Ezt ma már sem cáfolni, sem megerősíteni nem lehet, ám az a tény, hogy egyik civilizációval sem
állnak szoros kapcsolatban, mégiscsak arra vall, hogy nem kötelezték el magukat annak idején egyik fél mellett sem, ami jelenlegi ismereteink
szerint akkortájt a lehetetlenséggel volt határos.

A túlélésnek is egészen más módját választották, mint más kevélyebb és hatalmasabb fajok. Nem szegültek szembe az újabb korok jövevényeivel, nem
vezettek gyilkos háborúkat ellenük: inkább alkalmazkodtak hozzájuk, kerülték a kihívó viselkedést, csendben és észrevétlenül elvegyültek közöttük.
Bizonyára ennek köszönhetik, hogy míg a többi ősfaj csillaga leáldozott, ők háborítatlanul sokasodtak Ynev-szerte, s hegyvidéki kolóniáik ma is
virágzanak.

Településeik a kontinens majd minden életre alkalmas zugában megtalálhatók. A zugok esetünkben szó szerint értendők: noha a gnómok ne vnultak a
föld alá, mint az aguirok vagy a törpék, városaikat, falvaikat hegyvidéki barlangrendszerekbe, vagy azok közvetlen közelébe építik.

Egyik legfontosabb tulajdonságuk az elővigyázatosság: ha hírét veszik, hogy sereg indult valamelyik fészkük ellen, s az ellenállás eleve
reménytelennek látszik, készek elhagyni sok évtizedes — vagy évszázados — munkával épített otthonukat, s másutt, a felfordulástól biztonságos
távolságban telepednek le újra.

Hogy mégis tartják a kapcsolatot a körülöttük élőkkel, azt mi sem jellemzi jobban, minthogy a szálláshelyüknek otthont adó kultúrkör
hordozónyelvét jobban-roszszabbul mindig beszéli egy-két gnóm az adott településen. (Ez általában 2., 3. fokú Nyelvtudás képzettséget jelent.)

Az embernépeknek mégsem sikerült sohasem megfejteniük a gnómok nyelvének rejtelmeit, s noha kötetekre rúg a nyelvtudósok által összeírt
tanulmányok sora, csupán abban egyeznek meg, hogy rendkívüli bonyolultsága és hangképzése gyakorlatilag lehetetlenné teszi annak más fajok által
történő elsajátítását.

Az igazi okra persze még véletlenül sem jöttek rá: ez a nyelv ugyanis a világ hajnalkorában született, és hatalomszavakat lehet megfogalmazni
rajta. A gnómok ősmágiája azonban kizárólag teremtésre, gyógyításra, a halott anyag alkotó célzatú megformálására alkalmas; ezért tartják őket
Ynev legjobb iparosainak és mesterembereinek. Hogy mindezt nem csak boszorkányos ügyességű ujjaiknak és csavaros észjárásukak köszönhetik, hanem
ősi hatalomszavaiknak is, az természetesen hétpecsétes titok, kívülállóknak nem kötik az orrára. Ebben is megnyilvánul józan gyakorlatiasságuk:
hiszen ha kiderülne róluk, hogy ősmágiát űznek, az utódfajok valószínűleg kiirtanák őket. Hogy ez mégsem tökéletesen igaz minden egyes gnómra,
azt a későbbiekben, a gómfajú játékos karakterek ismertetésénél pontosabban is látni fogjuk.

A tipikus gnóm kurta termetű — legtöbbjük alig haladja meg a másfél métert —, arányos felépítésű, hatalmas szemű, horgas orrú, sötét hajú és
testszőrzetű elfszabású lény. Ötujjú kezeik hihetetlen ügyességgel forgatnak bármilyen szerszámot. Akik nem tudnak róla, hogy hatalomszavak
használatára is képesek, azt híresztelik, a gnóm mesterek látják a kőben, fában, fémben megbúvó erővonalakat. Amennyire ismerjük őket, még
talán ez is igaz lehet.

Az általuk készített ötvösmunkák párjukat ritkítják Yneven, de kitűnnek különös, bonyolult mechanikájú szérkezeteikkel is — egyes feltevések
szerint Kahre technokratái tőlük tanulták művészetük alapjait. A legszívesebben nemesfémekkel, drágakövekkel dolgoznak, de nem vetik meg az
acélt sem: az általuk készített fegyverekért háromszoros árat sem sokallanak a tapasztalt kalandozók.

Természetükre nézve kiegyensúlyozottak, eleven eszűek és egyenesek, bár a faj hagyományaiban élő tapasztalatok kissé fanyarrá tették őket.
Talán ennek köszönhető, hogy a gnómok egyetlen ma Yneven ismert istent sem tüntetnek ki nemhogy imádatukkal, de még tisztelettükkel sem.
Számukra az ő mindenhatóik eltűntek, elsorvadtak, meglehet éppen amiatt, hogy annak idején elfordultak tőlük. Egyetlen istent imádnak: saját
munkájukat és annak gyümölcsét. A más népek felsőbbrendű lényeinek létét ugyan tudomásúl veszik, de magukra nézvést nem veszik kötelezőnek
azok bármifajta egyéb elismerését.

Talán innen adódhat, hogy kissé cinikusak és kiábrándultak. Nehezen kötnek barátságot fajtársaikon kívül bárkivel is. Legalábbis komoly
bizonyítékokkal kell annak szolgálnia, aki közelebb akar kerülni zárkózott szívükhöz.

Manapság az Ynev hegyvölgyeit bejáró kalandozók két fajtájukkal találkozhatnak. Akiknek megadatott ez a lehetőség, állítják, hogy szinte
tökéletes ellentétet tapasztaltak a két rassz között, mintha nem is egyazon felsőbbrendű lény akaratából születtek volna a világra. Nos, a
dolog magyarázatát természetesen a gnómok történelmében kell keresnünk. Pontos ismereteink ugyan nincsenek, ám az egyértelműen megállapítható,
hogy a gnóm közösségekben az utóbbi ezredévekben egyre több olyan poronty látta meg a napvilágot, amelyik képtelenné vált a testében megkötött
od szándékos felhasználására. Akadtak közösségek, ahol ezt inkább üdvözítőnek találták, semmint átoknak és nem nagyon törődtek a dologgal. Ez
később ellenükre fordult, s ezek a kolóniák az idők során végképp elveszítették a lehetőséget arra, hogy szavaik erejével erősítsék meg,
alakítsák át a környezetüket, Hatalmuk elsápadt, elszivárgott, s hamarosan nyoma sem maradt, csakúgy mint a közösségeknek.

Mások hibájából okulva, a többi gnóm település idővel ezeket a "korcsokat" eltávolította a közeléből, s később ezek a diaszpórák váltak a
hasonlóan "tehetségtelen" újszülöttek elsődleges befogadóhelyeivé. Meglepő az a hasonlatosság, ahogy a manapság hatalommal bíró gnómok és
Sirenar elfjei eljárnak, habár azt mindenképp el kell ismerni, hogy a hegyvidéki mester-faj sokkal kíméletesebben viseltetik az ily módon
testéből kiszakítottakkal, mint azt az elfek teszik.

Ezek a gnómok azok, akikkel a játékban JK-ként is találkozhatunk. Nem alakítottak önálló államokat, de kívülállásukat azóta is igyekeznek
megőrizni, s az elsorvadt kolóniákkal együtt vagy külön megkísérelték megtalálni a túlélés módozatait is. Ennek több módjára esküsznek, s a
játékosoknak is célszerű az alább felsoroltak közül választania.

**Maaghiták**

Az egyik első "renegát" gnómról, Teeriss Maagh su Suaaghról elhíresült eszmei irányzat, amely minden kapcsolatot megszakított az ercdeti
gnóm kolóniákkal. Ez ugyan csak abban az esetben helytálló, ha eltekintünk azoktól a kisebb hadjáratoktól, melynek során megkísérelnek
időről-időre asszonyokat rabolni a "tisztavérű" gnóm telepekről, ahol még vasmarokkal uralkodnak a faj tisztaságán. A maaghíták ily módon
látják biztosítva fennmardásukat, s teszik ezt még akkor is, ha ezzel gyakran az egész gnóm társadalom ellenszenvét kivívják, s azt
kockáztatják, hogy hovatartozásuk kiderülése esetén fajtársaik ellenük fordulnak.

Ennek megfelelően gyakorta magányosak, s csak elvétve fordul elő, hogy nagyobb közösségekbe szerveződnek. Ilyen településeik találhatók
azonban a Sheralban, a Kereskedő Hercegségek területén, Ediomadban, az Onporok között és Gianagban.

Nem keresik más fajúak társaságát, még akkor sem, ha azok nem akarják nyilvánvalóan megakadályozni legfőbb célkitűzésüket: hogy valamimód
megszerezzék azt a tudást, mely ismét a régi hatalmukhoz juttatná őket. A maaghiták között számosan akadnak, akik úgy vélik, ennek a
legmegfelelőbb módja, ha más ősnépek között kutatnak ezután.

**Vándorlók**

Hasonló elveket vallanak ugyan a felemelkedésről azok a gnómok is, akiket a fenti néven gyűjtenek csokorba a hozzáértők, ám ők egészen más
hozzáállást tanúsítanak az eredeti közösségekkel szemben, mint teszik azt a maaghiták.

Nem viseltetnek velük ennyire ellenszenvesen, sőt gyakran fel is keresik őket, hogy megosszák velük a kül- világban szerzett
tapasztalataikat. Így remélik ismét felvirágoztatni régóta pusztuló kultúrájukat és tudásukat. Úgy vélik, a külvilágban szerzett információk,
tapasztalatok hozzásegítetik az otthonmaradottakat, hogy megfejtsék a fajukat sújtó átok mibenlétét, s idővel megszabadulhassanak tőle.

Legnagyobb településeik a "tisztavérű" gnóm közösségek szomszédságaiban, tehát A Doardon hegységben, a Yian-Yiel keleti vonulatain, a
Larmaron-, és a Salumion-hegységekben találhatók.

**Elveszettek**

Ezen a néven ismertek azok a gnóm szakadárok — és ők vannak a legtöbben —, akik mindenféle kapcsolatot megszakítottak eredeti közöségeikkel,
és magányosan, saját kezük ügyességében bízva próbálnak meg alkalmazkodni a világ kihívásaihoz, Velük találkozhat a leggyakrabban a kalandozó,
ők települnek le az emberi civilizációkban, ők építik azokat a szerkezeteket, melyeket azután jó pénzért az embernépek gondjaira bíznak.
Az is előfordulhat, hogy nem maguk alapítanak műhelyeket, hanem szerződéssel szegődnek egy-egy nemesúr, város vagy klán szolgálatába, s busás
haszon fejében adják át nekik tapasztalataikat.
        `,
        kulonlegesKepessegek: `
- Ultralátás: a gnómok a legnagyobb sötétben is tökéletesen látnak 30 méter távolságig, bár színeket nem tudnak megkülönböztetni
- Kiváló emlékezőtehetségük miatt szinte sehol sem tévednek el, ahol pedig már jártak ott biztos, hogy nem.
        `
    },
    {
        id: 'goblin',
        name: 'Goblin',
        kepessegek: {
            izom: -2,
            reflex: 2,
            erzekeles: 2,
            egeszseg: 2,
            gondolkodas: -2
        },
        infralatas: 30,
        kepzettsegek: [
            {
                kepzettsegId: 'mellebeszeles',
                fok: 3
            }
        ],
        leiras: `
A goblinok — akár az orkok — a pyarroni istencsaládból kitaszított végzetistennő, Orwella teremtményei, és mint ilyenek, voltaképp a káoszlények
közé sorolhatók. Az emberfaj gondolkodói és tudósai felbukkanásuk, az Ötödkor alkonya óta jobbára így ís minősítik őket, fontos azonban
leszögeznünk, hogy a goblinok (minden velük kapcsolatos előítélet és téveszme dacára) küzdelemre termett lények, akiket alkotójuk a kontinens
északi felét hajdan uraló kyrek méltó ellenfeleinek szánt, és ennek megfelelő adottságokkal — köztük önálló értelemmel — ruházott fel.

Az Elátkozott Vidék röghegyeinek mélyén fogant kreatúrák közül ilyesmível csak az orkok rendelkeznek, robosztusabb felépítésük miatt azonban a
goblinoknál csekélyebb mértékben kényszerültek szellemi képességeik fejlesztésére: évezredes múltjuk ellenére megmaradtak ösztönlényeknek, a
goblinok esetében azonban már határozott — bár tág határok közt ingadozó — intelligenciáról beszélhetünk. A fentiekből már kiviláglott, hogy a
goblinok Észak-Yneven, közelebbről az ötödkori Kyria Elátkozott Vídékké gyalázott Rualan tartományában léptek a történelem színpadára. Már a
töredékes kyr források is szívós, gyors és apró — alig egy méter magas -, termetükhöz képest meglepő erejű harcosokként emlékeznek meg róluk.
Az első eleven goblinok a birodalmi légiók foglyaiként jutottak a külvilágba — innét feltételezhetően szökevényekként találtak utat a Sheralon
túlra, innét feltételezhetően szökevényekként találtak utat a Sheralon túlra és — nem mindennapi szaporaságuknak hála — csakhamar létrehozták
első, immár függetlennek nevezhető kolóniáikat.

E kolóniák a Hatodkor folyamán elvéreztek vagy kemény harcokban vívták ki a megmaradás jogát, Dél-Ynev goblin populációja azonban sosem
alkotott — és a Hetedkorban sem alkot — egységes államot: törzsei és kisebb csoportjai az elfszabásúak hatalmasabb civilizációinak árnyékában,
vagy épp Krán fekete határa mögött, csatlós- és rabszolgasorban küzdenek a túlélésért.

Az Észak-Yneven maradt goblinok az orkokkal és egyéb megmaradt káoszlényekkel osztoznak Gro-Ugon sztyeppéin és röghegyein, melyek
barlangjaiba — legendáik szerint legalábbis — a Farkas-szellem gyermekeit is megelőzve, igazi honfoglalóként települtek be, A nagyobb számú
ork törzsek mellett a Hetedkor folyamán másodhegedűsi szerepbe kényszerültek, hagyományaik azonban minden kényszer és megaláztatás dacára
elevenek maradtak — ezt mi sem bizonyítja fényesebben, mint a tény, hogy a nagyvilágba változatlanul idegen közvetitéssel — hadifogolyként
vagy rabszolgaként - kerülnek.

Ha nem kényszerülnek beilleszkedni az elfszabásúak egyéb civilizációiba, nemigen mutatkoznak fényes nappal. "Vad" törzseik nap közben leginkább
barlangok, bányák vagy romos épületek mélyén húzzák meg magukat. Portyázni is éjjel járnak, amikor kisebb falvakat, utazókat fosztanak ki.

A harchoz egyszerűbb fegyvereket használnak, baltát vagy buzogányt, ritkábban kardot. Ezek nagy része hadizsákmányként kerül hozzájuk, bár ők
maguk is konyítanak valamit a. fegyverkészítéshez. Nem jó céllövők: goblin íjászokról egyetlen valamirevaló legenda sem tesz említést. 

Alapvetően elfszabású lények, ám az embereknél — mint láttuk — jóval alacsonyabbak. Bőrük árnyalata az avarszínűtől a narancsvörösig terjed,
szemük szintén a sárga valamely árnyalata. Karjuk testükhöz viszonyítva aránytalanul hosszú, egészen térdig ér. Szemük jókora, szájuk széles,
füleik kicsik, nem ritkán hegyesek és elállóak.

Alapvetően társas lények, könnyen barátkoznak, s ha fajtársaikkal nem érintkezhetnek, szívfájdalom nélkül beérik másokal is. Bőbeszédű, fürge
észjárású teremtmények, akik átlagosnál gyorsabb életmódjukkal gyakorta hajszolják az őrület peremére mindazokat, akik jó előre nem készülnek
fel erre.

Mindazok, akik nem ismerik őket kellőképpen, hajlamosak gyávasággal, meggondolatlansággal, hovatovább hebeburgyasággal vádolni őket, ám ez nem
igaz. Szokatlannak tűnő megoldásaik mélyén mindig feltűnik valamely átgondolt — vagy átgondoltnak hitt — ötlet, s hétköznapinak nem nevezhető
fegyveres harcmodorukat is inkább a kényszer, s törékenyebb fizikumuk hívta életre, semmint az alattomos ártó szándék.

Mindazonáltal saját környezetükben igyekeznek távol tartani magukat mindattól, amit más népek a saját cívilizációjuknak neveznek, s ha a
goblinok időnként hasznot is akarnak húzni ebből, akkor azt elsősorban rablóportyák formájában vélik megvalósíthatónak.

Igazi túlélők. Bármely környezetben hamar feltalálják magukat, s a hirtelen környezetváltozás sem jelent számukra különösebb megerőltetést.
Hitvilágukat tekintve — bármit is állítsanak erről a hozzá nem értők — meglehetősen sarkos elképzeléseik vannak. Teremtőjüket, Orwellát — az
orkokhoz hasonlóan — gyűlölik, bár időről-időre híradás érkezik olyan törzseikről, amelyek a Kárhozat Asszonyához intézik imádságaikat. Sokkal
nagyobb a száma azonban azon goblinoknak, akik Meneglét imádják. Őt egyes hittudorok nem szívesen sorolják az istenek közé, ám hiba lenne
hatalmát ily messzemenően alábecsülni, Nevezzük azonban akár bálványnak, akár istennek, kétségtelen, hogy nem csekély hatalmat biztosít
híveinek, elsősorban azoknak a Boszorkánymestereknek, akik a goblin nép spirituális életét gondozzák értő kézzel.

A goblin fajú karakter a legvalószínűbben Gro-Ugonban, netán egy toroni rabszolgapiacon, boszorkánymesteri laboratóriumban, a Délvidék egy
ritkán 1akott zugában vagy egy vándorló állatsereglet sztárjaként kezdi pályafutását. A toroni flotta kisegítő járművein szolgálva a
Ouiron-tenger túlpartjára, háború idején, az ugoni sereg oldalvizében Észak, utóbb egész Ynev bármely pontjára eljuthat... mint tette azt
Graum Hedgrok, a Hetedkor stílusáról és baráti köréről elhíresült goblin kalandozója.
                `,
        kulonlegesKepessegek: `
- Hallásuk élessége kétszerese az emberének.
- Szaglásuk egészen kiváló, még az orkokét is felülmúlja.
- A föld alatt 5 méter eltéréssel meg  tudják mondani, hogy milyen mélységben járnak. Számokban kifejezve:
- 3 óránál frissebb nyomot 80% eséllyel képesek követni,
- 6 óránál nem régebbi nyomot 60% eséllyel követnek,
- 9 óránál frissebb nyomot 30%-ban képesek követni,
- 15 óránál frissebbet 20%-ban követnek,
- 30 óránál nem régebbit pedig 10% eséllyel követnek.
    Egy napnál régebbi nyomra nem tudnak rábukkanni. A fenti esélyekre óránként kell dobni, s amennyiben a százalékértéknél kevesebb a dobás eredménye, az udvari ork képes követni a nyomot. Ha több, úgy elveszítette, de -10-es módosítóval újra próbálkozhat, egészen addig, míg meg nem leli a nyomot, vagy esélye nullára nem csökken.
- Mivel legtöbbjüket a másfajúak nem tekintik komoly ellenfélnek, gyakorta előfordul, hogy meglephetik ellenlábasaikat egy gyors támadással. Mindehhez
    csupán sikeres Gyorsaság-próbát kell dobniuk az ellenfél Érzékelés-próbája ellen. Ha ellenfelük veszít, a goblin támadása meglepetésnek minősül.
    Nem alkalmazható a képesség azokkal szemben, akikkel akár ő, akár egy fajtársa már sikeresen próbálkozott, továbbá olyan szituációkban, amikor az
    ellenfél eleve számít a támadásra.
`
    },

];

export const Fajok = namedEntityArray(FAJOK);

