import { Karakter } from "./Karakter";
import { KarakterCalcResult } from "./KarakterCalculator";

export const HarciHelyzetek = [
    { id: 'chi-harc', name: 'Chi-harc' },
    { id: 'belharc', name: 'Belharc' },
    { id: 'hatulrol', name: 'Hátulról' },
    { id: 'felhatulrol', name: 'Félhátulról' },
    { id: 'meglepetes', name: 'Meglepetésből' },
    { id: 'magasabbrol', name: 'Magasabbról' },
    { id: 'mozgo_lorol', name: 'Mozgó lóról' },
    { id: 'vakon', name: 'Vakon/sötétben' },
    { id: 'felhomalyban', name: 'Félhomályban' },
    { id: 'helyhez_kotve', name: 'Helyhez kötve' },
    { id: 'fekve', name: 'Fekve' },
    { id: 'kabultan', name: 'Kábultan' },
    { id: 'benultan', name: 'Bénultan' },
    { id: 'gyulolettel', name: 'Gyűlölettel' },
    { id: 'felelemmel', name: 'Félelemmel' },
    { id: 'roham', name: 'Roham' },
    { id: 'vedekezo_harc_full', name: 'Védekező harc' },
    { id: 'vedekezo_harc_allva', name: 'Véd. harc helyben' }
] as const;

interface HarciHelyzetFegyverResult {
    ke: number,
    te: number,
    ve: number,
    sebzes: number,
    sebessegSzorzo: number
};

interface HarciHelyzetLoFegyverResult {
    ke: number,
    ce: number,
    sebessegSzorzo: number
}

export interface HarciHelyzetModositok {
    helyzet: typeof HarciHelyzetek[number],
    modositok: [HarciHelyzetFegyverResult, HarciHelyzetFegyverResult, HarciHelyzetLoFegyverResult];
};

const SzimplaHelyzetek: Partial<Record<typeof HarciHelyzetek[number]['id'], { ke: number, te: number, ve: number, ce: number }>> = {
    hatulrol: { ke: 5, te: 10, ve: 0, ce: 0 },
    felhatulrol: { ke: 2, te: 5, ve: 0, ce: 0 },
    meglepetes: { ke: 0, te: 30, ve: 0, ce: 10 },
    magasabbrol: { ke: 2, te: 5, ve: 0, ce: 5 },
    mozgo_lorol: { ke: 5, te: 10, ve: 20, ce: -20 }, //lovas ijaszat
    vakon: { ke: -20, te: -60, ve: -70, ce: -150 }, //vakharc
    felhomalyban: { ke: -15, te: -30, ve: -35, ce: -70 }, //vakharc
    helyhez_kotve: { ke: -20, te: -15, ve: -5, ce: 0 }, //harc helyhez kotve
    fekve: { ke: -10, te: -20, ve: -10, ce: 0 }, //foldharc
    kabultan: { ke: -15, te: -20, ve: -25, ce: -30 },
    benultan: { ke: -30, te: -40, ve: -35, ce: -15 },
    felelemmel: { ke: -10, te: -15, ve: 5, ce: -20 },
    gyulolettel: { ke: 3, te: 10, ve: -20, ce: -20 },
    roham: { ke: 0, te: 20, ve: -25, ce: -30 },
    vedekezo_harc_full: { ke: 0, te: 0, ve: 40, ce: 0 },
    vedekezo_harc_allva: { ke: 0, te: 0, ve: 15, ce: 0 },
};

const VAKHARC: Array<{ ke: number, te: number, ve: number, ce: number }> = [
    SzimplaHelyzetek.vakon!,
    { ke: -15, te: -30, ve: -40, ce: -150 },
    { ke: -10, te: -15, ve: -20, ce: -60 },
    { ke: -10, te: -10, ve: -15, ce: -50 },
    { ke: -5, te: -5, ve: -10, ce: -30 },
    { ke: 0, te: 0, ve: 0, ce: -20 },
];

const HHK: Array<{ ke: number, te: number, ve: number, ce: number }> = [
    SzimplaHelyzetek.helyhez_kotve!,
    { ke: -10, te: -10, ve: 0, ce: 0 },
    { ke: -10, te: -5, ve: 0, ce: 0 },
    { ke: -5, te: -2, ve: 0, ce: 0 },
    { ke: 0, te: 0, ve: 0, ce: 0 },
    { ke: 0, te: 0, ve: 0, ce: 0 },
];

const calculateModosito = (helyzet: typeof HarciHelyzetek[number]['id'], karakter: Karakter, kepzettsegek: KarakterCalcResult['kepzettsegek']['normal']): HarciHelyzetModositok['modositok'] => {
    switch (helyzet) {
        // eslint-disable-next-line no-lone-blocks
        case 'chi-harc': {
            if (kepzettsegek.some(k => k.kepzettseg.id === 'pszi:slan' && k.fok >= 1)) {
                const sor = Math.floor((karakter.szint.length - 2) / 2);
                const ke = 2 + sor * 2;
                const te = 10 + sor * 5;
                const ve = 10 + sor * 5;
                const sebzes = sor * 2 + 1;
                const sebessegSzorzo = sor <= 4 ? 1 - (sor + 1) / 10 : 0.4;
                return [
                    { ke, te, ve, sebzes, sebessegSzorzo },
                    { ke, te, ve, sebzes, sebessegSzorzo: 0 },
                    { ke: 0, ce: 0, sebessegSzorzo: 1 }
                ]
            } else {
                return [
                    { ke: 0, te: 0, ve: 0, sebzes: 0, sebessegSzorzo: 1 },
                    { ke: 0, te: 0, ve: 0, sebzes: 0, sebessegSzorzo: 1 },
                    { ke: 0, ce: 0, sebessegSzorzo: 1 }
                ]


            }
        };
        case 'belharc': {
            const belharcFok = kepzettsegek.find(k => k.kepzettseg.id === 'belharc')?.fok ?? 0;
            const ke = belharcFok === 5 ? 10 : 0;
            const te = belharcFok === 3 ? 5 : (belharcFok > 3 ? 15 : 0);

            return [
                { ke, te, ve: 0, sebzes: 0, sebessegSzorzo: 1 },
                { ke, te, ve: 0, sebzes: 0, sebessegSzorzo: 1 },
                { ke: 0, ce: 0, sebessegSzorzo: 1 }
            ]

        }
        case 'mozgo_lorol': {
            const fok = kepzettsegek.find(k => k.kepzettseg.id === 'lovas_ijaszat')?.fok ?? 0;
            if (fok === 4) {
                return [
                    { ke: SzimplaHelyzetek[helyzet]!.ke, te: SzimplaHelyzetek[helyzet]!.te, ve: SzimplaHelyzetek[helyzet]!.ve, sebzes: 0, sebessegSzorzo: 1 },
                    { ke: SzimplaHelyzetek[helyzet]!.ke, te: SzimplaHelyzetek[helyzet]!.te, ve: SzimplaHelyzetek[helyzet]!.ve, sebzes: 0, sebessegSzorzo: 1 },
                    { ke: SzimplaHelyzetek[helyzet]!.ke, ce: 0, sebessegSzorzo: 1 },
                ]

            }
            if (fok === 5) {
                return [
                    { ke: SzimplaHelyzetek[helyzet]!.ke, te: SzimplaHelyzetek[helyzet]!.te, ve: SzimplaHelyzetek[helyzet]!.ve + 20, sebzes: 0, sebessegSzorzo: 1 },
                    { ke: SzimplaHelyzetek[helyzet]!.ke, te: SzimplaHelyzetek[helyzet]!.te, ve: SzimplaHelyzetek[helyzet]!.ve + 20, sebzes: 0, sebessegSzorzo: 1 },
                    { ke: SzimplaHelyzetek[helyzet]!.ke, ce: 0, sebessegSzorzo: 1 },
                ]
            }
            break;
        }
        case 'vakon': {
            const fok = kepzettsegek.find(k => k.kepzettseg.id === 'vakharc')?.fok ?? 0;
            return [
                { ke: VAKHARC[fok].ke, te: VAKHARC[fok].te, ve: VAKHARC[fok].ve, sebzes: 0, sebessegSzorzo: 1 },
                { ke: VAKHARC[fok].ke, te: VAKHARC[fok].te, ve: VAKHARC[fok].ve, sebzes: 0, sebessegSzorzo: 1 },
                { ke: VAKHARC[fok].ke, ce: VAKHARC[fok].ce, sebessegSzorzo: 1 },
            ]
        }
        case 'helyhez_kotve': {
            const fok = kepzettsegek.find(k => k.kepzettseg.id === 'harc_helyhez_kotve')?.fok ?? 0;
            return [
                { ke: HHK[fok].ke, te: HHK[fok].te, ve: HHK[fok].ve, sebzes: 0, sebessegSzorzo: 1 },
                { ke: HHK[fok].ke, te: HHK[fok].te, ve: HHK[fok].ve, sebzes: 0, sebessegSzorzo: 1 },
                { ke: HHK[fok].ke, ce: HHK[fok].ce, sebessegSzorzo: 1 },
            ]
        }
        case 'felhomalyban': {
            let fok = kepzettsegek.find(k => k.kepzettseg.id === 'vakharc')?.fok ?? 0;
            if (fok > 0) {
                fok = Math.min(fok + 1, 5);
                return [
                    { ke: VAKHARC[fok].ke, te: VAKHARC[fok].te, ve: VAKHARC[fok].ve, sebzes: 0, sebessegSzorzo: 1 },
                    { ke: VAKHARC[fok].ke, te: VAKHARC[fok].te, ve: VAKHARC[fok].ve, sebzes: 0, sebessegSzorzo: 1 },
                    { ke: VAKHARC[fok].ke, ce: VAKHARC[fok].ce, sebessegSzorzo: 1 },
                ]
            }
            break;
        }
        case 'fekve': {
            const fok = kepzettsegek.find(k => k.kepzettseg.id === 'foldharc')?.fok ?? 0;
            if (fok >= 2) {
                return [
                    { ke: 0, te: fok >= 4 ? 10 : 0, ve: 0, sebzes: 0, sebessegSzorzo: 1 },
                    { ke: 0, te: fok >= 4 ? 10 : 0, ve: 0, sebzes: 0, sebessegSzorzo: 1 },
                    { ke: 0, ce: 0, sebessegSzorzo: 1 },
                ]
            }
            break;
        }
    }
    if (SzimplaHelyzetek[helyzet]) {
        return [
            { ke: SzimplaHelyzetek[helyzet]!.ke, te: SzimplaHelyzetek[helyzet]!.te, ve: SzimplaHelyzetek[helyzet]!.ve, sebzes: 0, sebessegSzorzo: 1 },
            { ke: SzimplaHelyzetek[helyzet]!.ke, te: SzimplaHelyzetek[helyzet]!.te, ve: SzimplaHelyzetek[helyzet]!.ve, sebzes: 0, sebessegSzorzo: 1 },
            { ke: SzimplaHelyzetek[helyzet]!.ke, ce: SzimplaHelyzetek[helyzet]!.ce, sebessegSzorzo: 1 },
        ]

    } else {
        console.error('Unknown harci helyzet', helyzet);
        return [
            { ke: 0, te: 0, ve: 0, sebzes: 0, sebessegSzorzo: 1 },
            { ke: 0, te: 0, ve: 0, sebzes: 0, sebessegSzorzo: 1 },
            { ke: 0, ce: 0, sebessegSzorzo: 1 }
        ]
    }

}
export const HarciHelyzet = {
    calculate: (helyzet: typeof HarciHelyzetek[number]['id'], karakter: Karakter, kepzettsegek: KarakterCalcResult['kepzettsegek']['normal']): HarciHelyzetModositok => {
        return {
            helyzet: HarciHelyzetek.find(h => h.id === helyzet) ?? ({ id: helyzet, name: '???' } as any),
            modositok: calculateModosito(helyzet, karakter, kepzettsegek)
        };
    }
}