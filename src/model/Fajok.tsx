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
        leiras: `Ez egy ember.`
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
        }
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
        }
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
        }
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
        infralatas: 30
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
    },

];

export const Fajok = namedEntityArray(FAJOK);

