import { Karakter } from "./Karakter";
import { KarakterCalcResult } from "./KarakterCalculator";

export const HarciHelyzetek = [
    { id: 'chi-harc', name: 'Chi-harc' },
    { id: 'harc_magasabbrol', name: 'Harc magasabbról' },
    { id: 'belharc', name: 'Belharc' }
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

export const HarciHelyzet = {
    calculate: (helyzet: typeof HarciHelyzetek[number]['id'], karakter: Karakter, kepzettsegek: KarakterCalcResult['kepzettsegek']['normal']): HarciHelyzetModositok => {
        switch (helyzet) {
            // eslint-disable-next-line no-lone-blocks
            case 'chi-harc': {
                if (kepzettsegek.some(k => k.kepzettseg.id === 'pszi:slan' && k.fok >= 1)) {
                    const sor = Math.floor((karakter.szint.length - 1) / 2);
                    const ke = 2 + sor * 2;
                    const te = 10 + sor * 5;
                    const ve = 10 + sor * 5;
                    const sebzes = sor * 2 + 1;
                    const sebessegSzorzo = sor <= 4 ? 1 - (sor + 1) / 10 : 0.4;
                    return {
                        helyzet: HarciHelyzetek.find(h => h.id === helyzet)!,
                        modositok: [
                            { ke, te, ve, sebzes, sebessegSzorzo },
                            { ke, te, ve, sebzes, sebessegSzorzo: 0 },
                            { ke: 0, ce: 0, sebessegSzorzo: 1 }
                        ]
                    }
                } else {
                    return {
                        helyzet: HarciHelyzetek.find(h => h.id === helyzet)!,
                        modositok: [
                            { ke: 0, te: 0, ve: 0, sebzes: 0, sebessegSzorzo: 1 },
                            { ke: 0, te: 0, ve: 0, sebzes: 0, sebessegSzorzo: 1 },
                            { ke: 0, ce: 0, sebessegSzorzo: 1 }
                        ]
                    }

                }
            };
            case 'harc_magasabbrol': {
                return {
                    helyzet: HarciHelyzetek.find(h => h.id === helyzet)!,
                    modositok: [
                        { ke: 2, te: 5, ve: 0, sebzes: 0, sebessegSzorzo: 1 },
                        { ke: 2, te: 5, ve: 0, sebzes: 0, sebessegSzorzo: 1 },
                        { ke: 2, ce: 5, sebessegSzorzo: 1 },
                    ]
                };
            }
            case 'belharc': {
                const belharcFok = kepzettsegek.find(k => k.kepzettseg.id === 'belharc')?.fok ?? 0;
                const ke = belharcFok === 5 ? 10 : 0;
                const te = belharcFok === 3 ? 5 : (belharcFok > 3 ? 15 : 0);

                return {
                    helyzet: HarciHelyzetek.find(h => h.id === helyzet)!,
                    modositok: [
                        { ke, te, ve: 0, sebzes: 0, sebessegSzorzo: 1 },
                        { ke, te, ve: 0, sebzes: 0, sebessegSzorzo: 1 },
                        { ke: 0, ce: 0, sebessegSzorzo: 1 }
                    ]
                }

            }
        }
    }
}