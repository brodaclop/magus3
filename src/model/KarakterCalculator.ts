import { Calculation, CalculationArgument, CalculationBinary, CalculationValue } from "./Calculation";
import { Fegyver, FEGYVER_KEPZETTSEG_HARCERTEKEK, MASODIK_TAMADAS_KE, SebzesTipus } from "./Fegyver";
import { Harcertek } from "./Harcertek";
import { HarciHelyzet, HarciHelyzetModositok } from "./HarciHelyzet";
import { convertHarcmodorEffect, HarcmodorCalculation, HarcmodorEffect, HARCMODOR_EFFEKTEK } from "./Harcmodor";
import { Hatas } from "./Hatas";
import { Karakter, SzintInfo } from "./Karakter";
import { Kasztok } from "./Kasztok";
import { KockaDobas } from "./Kocka";
import { Lofegyver } from "./Lofegyver";
import { GyorsVarazslat, LassuVarazslat, Magia, MagiaKategoriak, Varazslat } from "./Magia";
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
    magiaEllenallas: {
        [key in 'asztral' | 'mental']: CalculationArgument;
    }
};

class KarakterCalculation {
    constructor(private readonly karakter: Karakter) { }

    szintCalc = (fn: (szint: SzintInfo) => number): Array<CalculationValue> =>
        this.karakter.szint.map((sz, i) => Calculation.value(`${sz.kaszt.name} ${i}. szint`, fn(sz)));

    aktivHatasok = (filter: (hatas: Hatas) => unknown) => this.karakter.hatasok.filter(h => h.aktiv && !!filter(h));

    kepessegek = () => transformRecord(this.karakter.kepessegek, (k, v) => v + (this.karakter.faj.kepessegek[k] ?? 0) + sumArray(this.aktivHatasok(h => h.kepesseg), h => h.kepesseg?.[k] ?? 0));

    normalKepzettsegek = () => this.karakter.szint.reduce((acc, curr) => {
        curr.kepzettsegek.normal.forEach(kepz => mergeToArray(acc, kepz, i => i.kepzettseg.id));
        return acc;
    }, [] as SzintInfo['kepzettsegek']['normal']);

    szazalekosKepzettsegek = () => this.karakter.szint.reduce((acc, curr) => {
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

    harcmodor = (normalKepzettsegek: SzintInfo['kepzettsegek']['normal']) => {
        const harcmodor = HARCMODOR_EFFEKTEK.find(e => e.isAvailable(this.karakter.kezek.map(k => k?.ob) as any));
        const harcmodorKepzettseg = normalKepzettsegek.find(k => k.kepzettseg.id === `harcmodor:${harcmodor?.id}`);
        return {
            harcmodor,
            harcmodorHatasok: convertHarcmodorEffect(harcmodor?.szintek[harcmodorKepzettseg?.fok ?? 0] ?? [])
        };
    }

    mgt = (normalKepzettsegek: SzintInfo['kepzettsegek']['normal'], harcmodorHatasok: Record<HarcmodorEffect, boolean>) => {
        const pancelMgt = this.karakter.pancel?.ob.mgt ?? 0;
        const pajzsMgt = this.karakter.kezek[1]?.ob.mgt ?? 0;
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

        return Calculation.plusz(...mgtCalc);
    }

    pillKep = (kepessegek: Record<string, number>, mgt: CalculationArgument) => {
        const pillanatnyiKepessegek = transformRecord(kepessegek, k => {
            if (k === 'mozgaskoordinacio' || k === 'reflex') {
                return Calculation.max(Calculation.value('Minimum', 10), Calculation.plusz(Calculation.value('Normál', kepessegek[k]), Calculation.value('MGT', -Calculation.calculate(mgt))));
            }
            return Calculation.value('Normál', kepessegek[k]);
        });

        return {
            pillKepCalc: pillanatnyiKepessegek,
            pillKep: transformRecord(pillanatnyiKepessegek, k => Calculation.calculate(pillanatnyiKepessegek[k]))
        };
    }

    harcertek = (pillKep: Record<string, number>): KarakterCalcResult['harcertek'] => {
        const reflex = Calculation.tizFolottiResz(pillKep, 'reflex');
        const mozgaskoordinacio = Calculation.tizFolottiResz(pillKep, 'mozgaskoordinacio');
        const osszpontositas = Calculation.tizFolottiResz(pillKep, 'osszpontositas');
        const izom = Calculation.tizFolottiResz(pillKep, 'izom');
        const he = (x: keyof Harcertek) => this.szintCalc(sz => sz.harcertek[x] ?? 0);
        const heHatas = (x: keyof Harcertek) => this.aktivHatasok(h => h.harcertek).map(h => Calculation.value(`Hatás: ${h.name}`, h.harcertek?.[x] ?? 0));
        return {
            ke: Calculation.plusz(reflex, osszpontositas, ...he('ke'), ...heHatas('ke')),
            te: Calculation.plusz(reflex, izom, mozgaskoordinacio, ...he('te'), ...heHatas('te')),
            ve: Calculation.plusz(reflex, mozgaskoordinacio, ...he('ve'), ...heHatas('ve')),
            ce: Calculation.plusz(mozgaskoordinacio, osszpontositas, ...he('ce'), ...heHatas('ce')),
            sebzes: Calculation.plusz(...he('sebzes'), ...heHatas('sebzes'))
        };
    };
    isVeteran = () => Object.entries(Karakter.szintek(this.karakter)).some(([kasztId, { szint }]) => Kasztok.kasztInfo(kasztId, szint).kasztSpec?.includes('otodikSzintenGyorsTamadas') && szint >= 5);

    helyzetek = (normalKepzettsegek: SzintInfo['kepzettsegek']['normal']) => this.karakter.temporary.harciHelyzet.map(h => HarciHelyzet.calculate(h, this.karakter, normalKepzettsegek));

    fegyverCalc = (
        idx: 0 | 1,
        harcmodorHatasok: Record<HarcmodorEffect, boolean>,
        normalKepzettsegek: SzintInfo['kepzettsegek']['normal'],
        harcertek: KarakterCalcResult['harcertek'],
        helyzetek: Array<HarciHelyzetModositok>,
        pillKep: Record<string, number>,
        isVeteran: boolean
    ): CalcFegyver & { ke: CalculationArgument, ve: CalculationArgument } | undefined => {
        const fegyver = this.karakter.kezek[idx]?.ob;
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
            const noAttack = helyzetek.some(h => h.modositok[idx].sebessegSzorzo === 0);
            const te = (noAttack || (idx === 1 && harcmodorHatasok.kez1NoAttack)) ? undefined : Calculation.plusz(Calculation.value('Fegyver nélkül', Calculation.calculate(harcertek.te)), Calculation.value(fegyver.name, fegyver.te), Calculation.value('Képzettség', kepzettseg.te), ...helyzetek.map(h => Calculation.value(h.helyzet.name, h.modositok[idx].te)));
            const ve = Calculation.plusz(Calculation.value('Fegyver nélkül', Calculation.calculate(harcertek.ve)), Calculation.value(fegyver.name, fegyver.ve), Calculation.value('Képzettség', kepzettseg.ve), ...helyzetek.map(h => Calculation.value(h.helyzet.name, h.modositok[idx].ve)));

            const erobonuszHatar = fegyver.erobonusz ?? fegyver.kategoria.erobonusz;
            const erobonusz = erobonuszHatar === 0 ? 0 : Math.max(0, pillKep.izom - erobonuszHatar);

            const fegyverSebesseg = Calculation.value('Fegyver', - MASODIK_TAMADAS_KE[fegyver.sebesseg]);

            const csak1Tamadas = (idx === 1 && (harcmodorHatasok.kez1SingleAttack || harcmodorHatasok.kez1NoAttack)) ? Calculation.value('Harcmodor', 0) : undefined;

            const tobbTamadasKe = Calculation.mul(fegyverSebesseg, isVeteran ? Calculation.value('Veterán', 0.8) : undefined, csak1Tamadas, ...helyzetek.map(h => Calculation.value(h.helyzet.name, h.modositok[idx].sebessegSzorzo)));

            const sebzes: KockaDobas = {
                ...fegyver.sebzes,
                plusz: fegyver.sebzes.plusz + Calculation.calculate(harcertek.sebzes) + erobonusz + sumArray(helyzetek.map(h => h.modositok[idx].sebzes))
            }
            return { ke, te, ve, sebzes, tobbTamadasKe };
        }
    };

    fegyverrel = (
        harcertek: KarakterCalcResult['harcertek'],
        harcmodorHatasok: Record<HarcmodorEffect, boolean>,
        normalKepzettsegek: SzintInfo['kepzettsegek']['normal'],
        helyzetek: Array<HarciHelyzetModositok>,
        pillKep: Record<string, number>,
        isVeteran: boolean
    ): KarakterCalcResult['fegyverrel'] => {
        const kezek = [
            this.fegyverCalc(0, harcmodorHatasok, normalKepzettsegek, harcertek, helyzetek, pillKep, isVeteran),
            this.fegyverCalc(1, harcmodorHatasok, normalKepzettsegek, harcertek, helyzetek, pillKep, isVeteran),
        ] as [ReturnType<KarakterCalculation['fegyverCalc']>, ReturnType<KarakterCalculation['fegyverCalc']>];
        let ke = undefined;
        let ve = undefined;
        if (kezek[0] && kezek[1]) {
            if (harcmodorHatasok.kez1NoAttack) {
                ke = kezek[0].ke;
            } else {
                ke = Calculation.min(kezek[0].ke, kezek[1].ke);
            }
            if (harcmodorHatasok.mindketVE) {
                ve = Calculation.plusz(kezek[0].ve, Calculation.remove(kezek[1].ve as CalculationBinary, 'Fegyver nélkül', 'Képzettség', 'Chi-harc'));
            } else {
                ve = Calculation.max(kezek[0].ve, kezek[1].ve);
            }
            if (harcmodorHatasok.mindketTE) {
                const uj0 = Calculation.plusz(kezek[0].te, Calculation.remove(kezek[1].te as CalculationBinary, 'Fegyver nélkül', 'Képzettség', 'Chi-harc'));
                const uj1 = Calculation.plusz(kezek[1].te, Calculation.remove(kezek[0].te as CalculationBinary, 'Fegyver nélkül', 'Képzettség', 'Chi-harc'));
                kezek[0].te = uj0;
                kezek[1].te = uj1;
            } else if (harcmodorHatasok.shiensuTE) {
                const uj0 = Calculation.plusz(kezek[0].te, Calculation.remove(kezek[1].te as CalculationBinary, 'Fegyver nélkül', 'Chi-harc'));
                const uj1 = Calculation.plusz(kezek[1].te, Calculation.remove(kezek[0].te as CalculationBinary, 'Fegyver nélkül', 'Chi-harc'));
                kezek[0].te = uj0;
                kezek[1].te = uj1;
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

    lofegyverCalc = (
        normalKepzettsegek: SzintInfo['kepzettsegek']['normal'],
        harcertek: KarakterCalcResult['harcertek'],
        helyzetek: Array<HarciHelyzetModositok>,
        pillKep: Record<string, number>,
        isVeteran: boolean
    ): KarakterCalcResult['lofegyverrel'] | undefined => {
        if (!this.karakter.lofegyver?.ob) {
            return;
        }
        const fegyver = this.karakter.lofegyver.ob;
        const kepzettseg = Fegyver.kepzettseg(normalKepzettsegek, fegyver, 0);
        const ke = Calculation.plusz(Calculation.value('Fegyver nélkül', Calculation.calculate(harcertek.ke)), Calculation.value(fegyver.name, fegyver.ke), Calculation.value('Képzettség', kepzettseg[0].ke), ...helyzetek.map(h => Calculation.value(h.helyzet.name, h.modositok[2].ke)));
        const ce = Calculation.plusz(Calculation.value('Fegyver nélkül', Calculation.calculate(harcertek.ce)), Calculation.value(fegyver.name, fegyver.ce), Calculation.value('Képzettség', kepzettseg[0].ce), ...helyzetek.map(h => Calculation.value(h.helyzet.name, h.modositok[2].ce)));
        const sebzes = fegyver.tipus !== 'ij' ? fegyver.sebzes : Lofegyver.calculateIj(pillKep.izom, kepzettseg[1], fegyver).sebzes;
        const lotav = fegyver.tipus !== 'ij' ? fegyver.lotav : Lofegyver.calculateIj(pillKep.izom, kepzettseg[1], fegyver).lotav;

        const fegyverSebesseg = Calculation.value('Fegyver', - MASODIK_TAMADAS_KE[fegyver.sebesseg]);

        const tobbTamadasKe = Calculation.mul(fegyverSebesseg, isVeteran ? Calculation.value('Veterán', 0.8) : undefined, ...helyzetek.map(h => Calculation.value(h.helyzet.name, h.modositok[2].sebessegSzorzo)))

        return {
            ke, ce, sebzes, lotav, tobbTamadasKe
        }
    }

    magiaKategoriak = () => this.karakter.szint.reduce((acc, curr) => {
        curr.kaszt.magiaKategoriak?.forEach(k => acc.add(k));
        return acc;
    }, new Set<typeof MagiaKategoriak[number]['id']>());

    mana = (
        normalKepzettsegek: SzintInfo['kepzettsegek']['normal'],
        pillKep: Record<string, number>,
    ) => {

        const ret = Calculation.max(Calculation.plusz(...this.karakter.szint.slice(1).flatMap((szint, idx) => {
            let pontok = 0;
            if (szint.kaszt.mana && szint.mana > 0) {
                pontok += szint.mana;
                pontok += Math.max(pillKep[szint.kaszt.mana.kepesseg] - 10, 0);
                if (szint.kaszt.mana.mennyiseg === 'kevés') {
                    pontok /= 2;
                }
            }
            return [
                Calculation.value(`${idx + 1}. szint: ${szint.kaszt.name}`, pontok),
                ...this.aktivHatasok(h => h.manaPerSzint).map(h => Calculation.value(`${idx + 1}. szint: ${h.name}`, h.manaPerSzint ?? 0))
            ];
        })), Calculation.value(Magia.hasznalatKepzettseg.name, Magia.magiaHasznalatMana(normalKepzettsegek)));

        return Calculation.plusz(ret, ...this.aktivHatasok(h => h.mana).map(h => Calculation.value(h.name, h.mana ?? 0)));
    }

    pszi = (pillKep: Record<string, number>) => {
        const psziKepz: SzintInfo['kepzettsegek']['normal'] = [];
        const psziPontok = this.karakter.szint.map((szint, idx) => {
            szint.kepzettsegek.normal.forEach(kepz => mergeToArray(psziKepz, kepz, i => i.kepzettseg.id));
            return idx === 0 ? 0 : Pszi.psziPont(psziKepz);
        }).slice(1);

        return sumArray(psziPontok) > 0 ? Calculation.plusz(
            Calculation.tizFolottiResz(pillKep, 'osszpontositas'),
            ...this.aktivHatasok(h => h.pszi).map(h => Calculation.value(h.name, h.pszi ?? 0)),
            ...this.karakter.szint.slice(1).flatMap((szint, idx) =>
                [
                    Calculation.value(`${idx + 1}. szint: ${szint.kaszt.name}`, psziPontok[idx]),
                    ...this.aktivHatasok(h => h.psziPerSzint).map(h => Calculation.value(`${idx + 1}. szint: ${h.name}`, h.psziPerSzint ?? 0)),
                ])
        ) : Calculation.value('Nincs pszi', 0);
    }

    psziDiszciplinak = (
        normalKepzettsegek: SzintInfo['kepzettsegek']['normal'],
        harcertek: KarakterCalcResult['harcertek'],
    ) => {
        const hatasDiszciplinak = this.aktivHatasok(h => h.psziDiszciplina).flatMap(h => h.psziDiszciplina ?? []);
        return Pszi.lista.filter(d => {
            const kepzettseg = normalKepzettsegek.find(k => k.kepzettseg.id === `pszi:${d.iskola}`);
            const fok = kepzettseg?.fok ?? 0;
            return hatasDiszciplinak.includes(d.id) || d.fok <= fok;
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
        })
    };

    varazslatok = (
        normalKepzettsegek: SzintInfo['kepzettsegek']['normal'],
        harcertek: KarakterCalcResult['harcertek'],
        magiaKategoriak: Set<typeof MagiaKategoriak[number]['id']>
    ) => {
        const hatasVarazslatok = this.aktivHatasok(h => h.varazslat).flatMap(h => h.varazslat ?? []);
        return Magia.lista.filter(v => {
            const kepzettsegek = normalKepzettsegek.filter(k => v.kepzettsegek.includes(k.kepzettseg.id as Varazslat['kepzettsegek'][number]));
            const fok = Math.max(0, ...kepzettsegek.map(k => k.fok));
            const kategoriaOK = v.kategoriak?.every(k => magiaKategoriak.has(k)) ?? true;
            return hatasVarazslatok.includes(v.id) || (kategoriaOK && v.fok <= fok);
        }).map(v => {
            if ('ke' in v) {
                const kepzettsegek = normalKepzettsegek.filter(k => v.kepzettsegek.includes(k.kepzettseg.id as Varazslat['kepzettsegek'][number]));
                const fok = Math.max(0, ...kepzettsegek.map(k => k.fok));
                return {
                    ...v,
                    ke: Calculation.plusz(Calculation.value('Fegyver nélkül', Calculation.calculate(harcertek.ke)), Calculation.value('Képzettség', fok * 5), Calculation.value('Varázslat', v.ke))
                }
            } else {
                return v;
            }
        });
    };

    fp = (kepessegek: Record<string, number>) => Calculation.plusz(
        Calculation.tizFolottiResz(kepessegek, 'allokepesseg'),
        Calculation.tizFolottiResz(kepessegek, 'onuralom'),
        ...this.karakter.szint.flatMap((sz, i) =>
            [
                Calculation.value(`${sz.kaszt.name} ${i}. szint`, sz.fp),
                ...this.aktivHatasok(h => h.fpPerSzint).map(h => Calculation.value(`${i + 1}. szint: ${h.name}`, h.fpPerSzint ?? 0)),
            ]),
        ...this.aktivHatasok(h => h.fp).map(h => Calculation.value(h.name, h.fp ?? 0))
    );

    ep = (kepessegek: Record<string, number>, fp: CalculationArgument) => Calculation.plusz(
        Calculation.tizFolottiResz(kepessegek, 'egeszseg'),
        Calculation.value('Alap ÉP', this.karakter.ep),
        Calculation.value('FP/50', Math.floor(Calculation.calculate(fp) / 50)),
        ...this.aktivHatasok(h => h.ep).map(h => Calculation.value(h.name, h.ep ?? 0)));

    magiaEllenallas = (kepessegek: Record<string, number>): KarakterCalcResult['magiaEllenallas'] => {
        const asztral = Calculation.plusz(
            Calculation.tizFolottiResz(kepessegek, 'onuralom'),
            Calculation.value('Statikus pajzs', this.karakter.temporary.pajzs.asztral.statikus),
            Calculation.value('Dinamikus pajzs', this.karakter.temporary.pajzs.asztral.dinamikus),
            Calculation.value('Egyéb', this.karakter.temporary.pajzs.asztral.egyeb),
            ...this.aktivHatasok(h => h.asztral).map(h => Calculation.value(h.name, h.asztral ?? 0))
        );
        const mental = Calculation.plusz(
            Calculation.tizFolottiResz(kepessegek, 'osszpontositas'),
            Calculation.value('Statikus pajzs', this.karakter.temporary.pajzs.mental.statikus),
            Calculation.value('Dinamikus pajzs', this.karakter.temporary.pajzs.mental.dinamikus),
            Calculation.value('Egyéb', this.karakter.temporary.pajzs.mental.egyeb),
            ...this.aktivHatasok(h => h.mental).map(h => Calculation.value(h.name, h.mental ?? 0))
        );
        return { asztral, mental };

    }

}

export const KarakterCalculator = {
    calc: (karakter: Karakter): KarakterCalcResult => {
        const kc = new KarakterCalculation(karakter);

        const kepessegek = kc.kepessegek();
        const normalKepzettsegek = kc.normalKepzettsegek();
        const { harcmodor, harcmodorHatasok } = kc.harcmodor(normalKepzettsegek);
        const mgt = kc.mgt(normalKepzettsegek, harcmodorHatasok);
        const { pillKepCalc, pillKep } = kc.pillKep(kepessegek, mgt);
        const harcertek = kc.harcertek(pillKep);
        const isVeteran = kc.isVeteran();
        const helyzetek = kc.helyzetek(normalKepzettsegek);
        const magiaKategoriak = kc.magiaKategoriak();
        const fp = kc.fp(kepessegek);
        const ep = kc.ep(kepessegek, fp);

        return {
            kepessegek,
            fp,
            ep,
            harcertek,
            harcmodor,
            fegyverrel: kc.fegyverrel(harcertek, harcmodorHatasok, normalKepzettsegek, helyzetek, pillKep, isVeteran),
            lofegyverrel: kc.lofegyverCalc(normalKepzettsegek, harcertek, helyzetek, pillKep, isVeteran),
            kepzettsegek: {
                normal: normalKepzettsegek,
                szazalekos: kc.szazalekosKepzettsegek(),
            },
            sfe: karakter.pancel?.ob.sfe ?? { zuzo: 0, szuro: 0, vago: 0 },
            mgt,
            pillanatnyiKepessegek: pillKepCalc,
            pszi: kc.pszi(pillKep),
            psziDiszciplinak: kc.psziDiszciplinak(normalKepzettsegek, harcertek),
            mana: kc.mana(normalKepzettsegek, pillKep),
            findNormalKepzettseg: id => normalKepzettsegek.find(k => k.kepzettseg.id === id),
            pendingKepzettsegekCount: sumArray(karakter.szint, sz => sz.pendingKepzettsegek.length),
            varazslatok: kc.varazslatok(normalKepzettsegek, harcertek, magiaKategoriak),
            magiaKategoriak,
            magiaEllenallas: kc.magiaEllenallas(kepessegek)
        };
    }
}
