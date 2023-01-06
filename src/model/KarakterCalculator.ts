import { Calculation, CalculationArgument, CalculationBinary, CalculationValue } from "./Calculation";
import { Fegyver, FEGYVER_KEPZETTSEG_HARCERTEKEK, MASODIK_TAMADAS_KE, SebzesTipus } from "./Fegyver";
import { Harcertek } from "./Harcertek";
import { HarciHelyzet, HarciHelyzetModositok } from "./HarciHelyzet";
import { convertHarcmodorEffect, HarcmodorCalculation, HarcmodorEffect, HARCMODOR_EFFEKTEK } from "./Harcmodor";
import { Karakter, SzintInfo } from "./Karakter";
import { Kasztok } from "./Kasztok";
import { KockaDobas } from "./Kocka";
import { Lofegyver } from "./Lofegyver";
import { GyorsVarazslat, LassuVarazslat, Magia, MagiaKategoriak } from "./Magia";
import { GyorsPsziDiszicplina, LassuPsziDiszciplina, Pszi } from "./Pszi";
import { mergeToArray, sumArray, transformRecord } from "./util";

export interface CalcFegyver {
    te?: CalculationArgument,
    //TODO: kocka calculation?
    sebzes: KockaDobas,
    tobbTamadasKe: CalculationArgument,
}

export type CalcVarazslat = ((Omit<GyorsVarazslat, 'ke'> & { ke: CalculationArgument }) | LassuVarazslat);

export type CalcDiszciplina = ((Omit<GyorsPsziDiszicplina, 'ke'> & { ke: CalculationArgument }) | LassuPsziDiszciplina);

export interface KarakterCalcResult {
    fp: CalculationArgument;
    ep: CalculationArgument;
    kepessegek: Record<string, number>;
    pillanatnyiKepessegek: Record<string, CalculationArgument>;
    harcertek: Record<keyof Harcertek, CalculationArgument>;
    harcmodor?: HarcmodorCalculation;
    fegyverrel: {
        ke: CalculationArgument,
        ve: CalculationArgument,
        kezek: [CalcFegyver?, CalcFegyver?]
    },
    lofegyverrel?: {
        ke: CalculationArgument,
        ce: CalculationArgument,
        sebzes: KockaDobas,
        lotav: number,
        tobbTamadasKe: CalculationArgument,
    },
    kepzettsegek: SzintInfo['kepzettsegek'],
    sfe: Record<typeof SebzesTipus[number]['id'], number>;
    mgt: CalculationArgument;
    findNormalKepzettseg: (id: string) => SzintInfo['kepzettsegek']['normal'][number] | undefined;
    pendingKepzettsegekCount: number;
    mana: CalculationArgument;
    varazslatok: Array<CalcVarazslat>;
    pszi: CalculationArgument;
    psziDiszciplinak: Array<CalcDiszciplina>;
    magiaKategoriak: Set<typeof MagiaKategoriak[number]['id']>;
};


const szintCalc = (karakter: Karakter, fn: (szint: SzintInfo) => number): Array<CalculationValue> =>
    karakter.szint.map((sz, i) => Calculation.value(`${sz.kaszt.name} ${i}. szint`, fn(sz)));

export const KarakterCalculator = {
    calc: (karakter: Karakter): KarakterCalcResult => {
        const kepessegek = transformRecord(karakter.kepessegek, (k, v) => v + (karakter.faj.kepessegek[k] ?? 0));

        const normalKepzettsegek = karakter.szint.reduce((acc, curr) => {
            curr.kepzettsegek.normal.forEach(kepz => mergeToArray(acc, kepz, i => i.kepzettseg.id));
            return acc;
        }, [] as SzintInfo['kepzettsegek']['normal']);

        const szazalekosKepzettsegek = karakter.szint.reduce((acc, curr) => {
            curr.kepzettsegek.szazalekos.forEach(kepz => {
                const previous = acc.find(k => k.kepzettseg.id === kepz.kepzettseg.id);
                if (previous === undefined) {
                    acc.push(structuredClone(kepz));
                } else {
                    previous.szazalek += kepz.szazalek;
                }
            });
            return acc;
        }, [] as SzintInfo['kepzettsegek']['szazalekos']);

        const harcmodor = HARCMODOR_EFFEKTEK.find(e => e.isAvailable(karakter.kezek.map(k => k?.ob) as any));
        const harcmodorKepzettseg = normalKepzettsegek.find(k => k.kepzettseg.id === `harcmodor:${harcmodor?.id}`);
        const harcmodorHatasok = convertHarcmodorEffect(harcmodor?.szintek[harcmodorKepzettseg?.fok ?? 0] ?? []);

        const pancelMgt = karakter.pancel?.ob.mgt ?? 0;
        const pajzsMgt = karakter.kezek[1]?.ob.mgt ?? 0;
        const vertviselet = normalKepzettsegek.find(k => k.kepzettseg.id === 'vertviselet')?.fok ?? 0;
        const mgtCalc: Array<CalculationValue> = [];
        if (pancelMgt) {
            mgtCalc.push(Calculation.value('Páncél', pancelMgt));
        }
        if (pajzsMgt) {
            mgtCalc.push(Calculation.value('Pajzs', pajzsMgt));
        }
        if (vertviselet > 0 && pancelMgt > 0) {
            mgtCalc.push(Calculation.value('Vértviselet', - Math.min(vertviselet, pancelMgt)));
        }
        if (harcmodorHatasok.noMGT) {
            mgtCalc.push(Calculation.value('Harcmodor', - pajzsMgt));
        }

        const mgt = Calculation.plusz(...mgtCalc);

        const pillanatnyiKepessegek = transformRecord(kepessegek, k => {
            if (k === 'mozgaskoordinacio' || k === 'reflex') {
                return Calculation.max(Calculation.value('Minimum', 10), Calculation.plusz(Calculation.value('Normál', kepessegek[k]), Calculation.value('MGT', -Calculation.calculate(mgt))));
            }
            return Calculation.value('Normál', kepessegek[k]);
        });

        const pillKep = transformRecord(pillanatnyiKepessegek, k => Calculation.calculate(pillanatnyiKepessegek[k]));

        const harcertek: KarakterCalcResult['harcertek'] = {
            ke: Calculation.plusz(Calculation.tizFolottiResz(pillKep, 'reflex'), Calculation.tizFolottiResz(pillKep, 'osszpontositas'), ...szintCalc(karakter, sz => sz.harcertek.ke ?? 0)),
            te: Calculation.plusz(Calculation.tizFolottiResz(pillKep, 'reflex'), Calculation.tizFolottiResz(pillKep, 'izom'), Calculation.tizFolottiResz(pillKep, 'mozgaskoordinacio'), ...szintCalc(karakter, sz => sz.harcertek.te ?? 0)),
            ve: Calculation.plusz(Calculation.tizFolottiResz(pillKep, 'reflex'), Calculation.tizFolottiResz(pillKep, 'mozgaskoordinacio'), ...szintCalc(karakter, sz => sz.harcertek.ve ?? 0)),
            ce: Calculation.plusz(Calculation.tizFolottiResz(pillKep, 'mozgaskoordinacio'), Calculation.tizFolottiResz(pillKep, 'osszpontositas'), ...szintCalc(karakter, sz => sz.harcertek.ce ?? 0)),
            sebzes: Calculation.plusz(...szintCalc(karakter, sz => sz.harcertek.sebzes ?? 0))
        };

        const gyorsTamadas = Object.entries(Karakter.szintek(karakter)).some(([kasztId, { szint }]) => Kasztok.find(kasztId).kasztSpec?.includes('otodikSzintenGyorsTamadas') && szint >= 5);

        const helyzetek = karakter.temporary.harciHelyzet.map(h => HarciHelyzet.calculate(h, karakter, normalKepzettsegek));

        const fegyverCalc = (idx: 0 | 1): CalcFegyver & { ke: CalculationArgument, ve: CalculationArgument } | undefined => {
            const fegyver = karakter.kezek[idx]?.ob;
            if (!fegyver) {
                return undefined;
            } else {
                let fokMinusz = 0;
                if ((idx === 0 && harcmodorHatasok.kez0minusz3) || (idx === 1 && harcmodorHatasok.kez1minusz3)) {
                    fokMinusz = 3;
                }
                if ((idx === 0 && harcmodorHatasok.kez0minusz2) || (idx === 1 && harcmodorHatasok.kez1minusz2)) {
                    fokMinusz = 2;
                }
                if ((idx === 0 && harcmodorHatasok.kez0minusz1) || (idx === 1 && harcmodorHatasok.kez1minusz1)) {
                    fokMinusz = 1;
                }
                const kepzettseg = (idx === 1 && harcmodorHatasok.kez1pont2)
                    ? FEGYVER_KEPZETTSEG_HARCERTEKEK[2]
                    : Fegyver.kepzettseg(normalKepzettsegek, fegyver, fokMinusz)[0];
                const ke = Calculation.plusz(Calculation.value('Fegyver nélkül', Calculation.calculate(harcertek.ke)), Calculation.value(fegyver.name, fegyver.ke), Calculation.value('Képzettség', kepzettseg.ke), ...helyzetek.map(h => Calculation.value(h.helyzet.name, h.modositok[idx].ke)));
                const te = (idx === 1 && harcmodorHatasok.kez1NoAttack) ? undefined : Calculation.plusz(Calculation.value('Fegyver nélkül', Calculation.calculate(harcertek.te)), Calculation.value(fegyver.name, fegyver.te), Calculation.value('Képzettség', kepzettseg.te), ...helyzetek.map(h => Calculation.value(h.helyzet.name, h.modositok[idx].te)));
                const ve = Calculation.plusz(Calculation.value('Fegyver nélkül', Calculation.calculate(harcertek.ve)), Calculation.value(fegyver.name, fegyver.ve), Calculation.value('Képzettség', kepzettseg.ve), ...helyzetek.map(h => Calculation.value(h.helyzet.name, h.modositok[idx].ve)));

                const erobonuszHatar = fegyver.erobonusz ?? fegyver.kategoria.erobonusz;
                const erobonusz = erobonuszHatar === 0 ? 0 : Math.max(0, pillKep.izom - erobonuszHatar);

                const fegyverSebesseg = Calculation.value('Fegyver', - MASODIK_TAMADAS_KE[fegyver.sebesseg]);

                const csak1Tamadas = (idx === 1 && (harcmodorHatasok.kez1SingleAttack || harcmodorHatasok.kez1NoAttack)) ? Calculation.value('Harcmodor', 0) : undefined;

                const tobbTamadasKe = Calculation.mul(fegyverSebesseg, gyorsTamadas ? Calculation.value('Veterán', 0.8) : undefined, csak1Tamadas, ...helyzetek.map(h => Calculation.value(h.helyzet.name, h.modositok[idx].sebessegSzorzo)));

                const sebzes: KockaDobas = {
                    ...fegyver.sebzes,
                    plusz: fegyver.sebzes.plusz + Calculation.calculate(harcertek.sebzes) + erobonusz + sumArray(helyzetek.map(h => h.modositok[idx].sebzes))
                }
                return { ke, te, ve, sebzes, tobbTamadasKe };
            }
        };

        const lofegyverCalc = (): KarakterCalcResult['lofegyverrel'] | undefined => {
            if (!karakter.lofegyver?.ob) {
                return;
            }
            const fegyver = karakter.lofegyver.ob;
            const kepzettseg = Fegyver.kepzettseg(normalKepzettsegek, fegyver, 0);
            const ke = Calculation.plusz(Calculation.value('Fegyver nélkül', Calculation.calculate(harcertek.ke)), Calculation.value(fegyver.name, fegyver.ke), Calculation.value('Képzettség', kepzettseg[0].ke), ...helyzetek.map(h => Calculation.value(h.helyzet.name, h.modositok[2].sebessegSzorzo)));
            const ce = Calculation.plusz(Calculation.value('Fegyver nélkül', Calculation.calculate(harcertek.ce)), Calculation.value(fegyver.name, fegyver.ce), Calculation.value('Képzettség', kepzettseg[0].ce), ...helyzetek.map(h => Calculation.value(h.helyzet.name, h.modositok[2].ce)));
            const sebzes = fegyver.tipus !== 'ij' ? fegyver.sebzes : Lofegyver.calculateIj(pillKep.izom, kepzettseg[1], fegyver).sebzes;
            const lotav = fegyver.tipus !== 'ij' ? fegyver.lotav : Lofegyver.calculateIj(pillKep.izom, kepzettseg[1], fegyver).lotav;

            const fegyverSebesseg = Calculation.value('Fegyver', - MASODIK_TAMADAS_KE[fegyver.sebesseg]);

            const tobbTamadasKe = Calculation.mul(fegyverSebesseg, gyorsTamadas ? Calculation.value('Veterán', 0.8) : undefined, ...helyzetek.map(h => Calculation.value(h.helyzet.name, h.modositok[2].sebessegSzorzo)))

            return {
                ke, ce, sebzes, lotav, tobbTamadasKe
            }
        }

        const magiaKategoriak = karakter.szint.reduce((acc, curr) => {
            curr.kaszt.magiaKategoriak?.forEach(k => acc.add(k));
            return acc;
        }, new Set<typeof MagiaKategoriak[number]['id']>());

        const mana = Calculation.max(Calculation.plusz(...karakter.szint.slice(1).map((szint, idx) => {
            let pontok = 0;
            if (szint.kaszt.mana && szint.mana > 0) {
                pontok += szint.mana;
                pontok += Math.max(pillKep[szint.kaszt.mana.kepesseg] - 10, 0);
                if (szint.kaszt.mana.mennyiseg === 'kevés') {
                    pontok /= 2;
                }
            }
            return Calculation.value(`${idx + 1}. szint: ${szint.kaszt.name}`, pontok);
        })), Calculation.value(Magia.hasznalatKepzettseg.name, Magia.magiaHasznalatMana(normalKepzettsegek)));

        const psziKepz: SzintInfo['kepzettsegek']['normal'] = [];
        const psziPontok = karakter.szint.map((szint, idx) => {
            szint.kepzettsegek.normal.forEach(kepz => mergeToArray(psziKepz, kepz, i => i.kepzettseg.id));
            return idx === 0 ? 0 : Pszi.psziPont(psziKepz);
        }).slice(1);

        const pszi = sumArray(psziPontok) > 0 ? Calculation.plusz(Calculation.tizFolottiResz(pillKep, 'osszpontositas'), ...karakter.szint.slice(1).map((szint, idx) => Calculation.value(`${idx + 1}. szint: ${szint.kaszt.name}`, psziPontok[idx]))) : Calculation.value('Nincs pszi', 0);

        const psziDiszciplinak = Pszi.lista.filter(d => {
            const kepzettseg = normalKepzettsegek.find(k => k.kepzettseg.id === `pszi:${d.iskola}`);
            const fok = kepzettseg?.fok ?? 0;
            return d.fok <= fok;
        }).map(v => {
            if ('ke' in v) {
                const kepzettseg = normalKepzettsegek.find(k => k.kepzettseg.id === `pszi:${v.iskola}`);
                const fok = kepzettseg?.fok ?? 0;
                return {
                    ...v,
                    ke: Calculation.plusz(Calculation.value('Fegyver nélkül', Calculation.calculate(harcertek.ke)), Calculation.value('Képzettség', fok * 5), Calculation.value('Diszciplina', v.ke))
                }
            } else {
                return v;
            }
        });

        const varazslatok = Magia.lista.filter(v => {
            const kepzettseg = normalKepzettsegek.find(k => k.kepzettseg.id === `magia:${v.kepzettseg}`);
            const fok = kepzettseg?.fok ?? 0;
            const kategoriaOK = v.kategoriak.every(k => magiaKategoriak.has(k))
            return kategoriaOK && v.fok <= fok;
        }).map(v => {
            if ('ke' in v) {
                const kepzettseg = normalKepzettsegek.find(k => k.kepzettseg.id === `magia:${v.kepzettseg}`);
                const fok = kepzettseg?.fok ?? 0;
                return {
                    ...v,
                    ke: Calculation.plusz(Calculation.value('Fegyver nélkül', Calculation.calculate(harcertek.ke)), Calculation.value('Képzettség', fok * 5), Calculation.value('Varázslat', v.ke))
                }
            } else {
                return v;
            }
        });

        const fp = Calculation.plusz(Calculation.tizFolottiResz(kepessegek, 'allokepesseg'), Calculation.tizFolottiResz(kepessegek, 'onuralom'), ...szintCalc(karakter, sz => sz.fp));

        return {
            kepessegek,
            fp,
            ep: Calculation.plusz(Calculation.tizFolottiResz(kepessegek, 'egeszseg'), Calculation.value('Alap ÉP', karakter.ep), Calculation.value('FP/50', Math.floor(Calculation.calculate(fp) / 50))),
            harcertek,
            harcmodor,
            fegyverrel: calculateFegyverrel(harcertek, [fegyverCalc(0), fegyverCalc(1)], harcmodorHatasok),
            lofegyverrel: lofegyverCalc(),
            kepzettsegek: {
                normal: normalKepzettsegek,
                szazalekos: szazalekosKepzettsegek,
            },
            sfe: karakter.pancel?.ob.sfe ?? { zuzo: 0, szuro: 0, vago: 0 },
            mgt,
            pillanatnyiKepessegek,
            pszi,
            psziDiszciplinak,
            mana,
            findNormalKepzettseg: id => normalKepzettsegek.find(k => k.kepzettseg.id === id),
            pendingKepzettsegekCount: sumArray(karakter.szint, sz => sz.pendingKepzettsegek.length),
            varazslatok,
            magiaKategoriak
        };
    }
}

const calculateFegyverrel = (
    harcertek: KarakterCalcResult['harcertek'],
    kezek: [((CalcFegyver & { ke: CalculationArgument; ve: CalculationArgument; }) | undefined), ((CalcFegyver & { ke: CalculationArgument; ve: CalculationArgument; }) | undefined)],
    harcmodorHatasok: Record<HarcmodorEffect, boolean>,
): KarakterCalcResult['fegyverrel'] => {
    let ke = undefined;
    let ve = undefined;
    if (kezek[0] && kezek[1]) {
        if (harcmodorHatasok.kez1NoAttack) {
            ke = kezek[0].ke;
        } else {
            ke = Calculation.min(kezek[0].ke, kezek[1].ke);
        }
        if (harcmodorHatasok.mindketVE) {
            ve = Calculation.plusz(kezek[0].ve, Calculation.remove(kezek[1].ve as CalculationBinary, 'Fegyver nélkül', 'Képzettség'));
        } else {
            ve = Calculation.max(kezek[0].ve, kezek[1].ve);
        }
        if (harcmodorHatasok.mindketTE) {
            kezek[0].te = Calculation.plusz(kezek[0].te, Calculation.remove(kezek[1].te as CalculationBinary, 'Fegyver nélkül', 'Képzettség'));
            kezek[1].te = Calculation.plusz(kezek[1].te, Calculation.remove(kezek[0].te as CalculationBinary, 'Fegyver nélkül', 'Képzettség'));
        } else if (harcmodorHatasok.shiensuTE) {
            kezek[0].te = Calculation.plusz(kezek[0].te, Calculation.remove(kezek[1].te as CalculationBinary, 'Fegyver nélkül'));
            kezek[1].te = Calculation.plusz(kezek[1].te, Calculation.remove(kezek[0].te as CalculationBinary, 'Fegyver nélkül'));
        }
    } else if (kezek[0]) {
        ke = kezek[0].ke;
        ve = kezek[0].ve;
    } else {
        ke = harcertek.ke;
        ve = harcertek.ve;
    }

    return {
        kezek,
        ke,
        ve
    };
}
