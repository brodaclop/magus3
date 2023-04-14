import fileDownload from "js-file-download";
import { Calculation } from "../model/Calculation";
import { Karakter } from "../model/Karakter";
import { KarakterCalcResult, KarakterCalculator } from "../model/KarakterCalculator";
import { Character, Message, NumberProp } from "./InternalTypes";
import { convertInternalToExternal as convertToTablePlop } from "./TPConverter";

const te = (calc: KarakterCalcResult, idx: 0 | 1) => {
    const _te = calc.fegyverrel.kezek[idx]?.te;
    return _te ? Calculation.calculate(_te) : 0;
}

const ce = (calc: KarakterCalcResult) => {
    const _ce = calc.lofegyverrel?.ce;
    return _ce ? Calculation.calculate(_ce) : 0;
}


const sebzes = (calc: KarakterCalcResult, idx: 0 | 1 | 2, resz: 0 | 1 | 2) => {
    const _te = idx === 2 ? calc.lofegyverrel?.ce : calc.fegyverrel.kezek[idx]?.te;
    if (!_te) {
        return 0;
    };
    const dobas = idx === 2 ? calc.lofegyverrel!.sebzes : calc.fegyverrel.kezek[idx]!.sebzes;
    switch (resz) {
        case 0: return dobas.darab;
        case 1: return dobas.kocka;
        case 2: return dobas.plusz;
        default: throw new Error('ilyen nincs és mégis van');
    }
}
const sebzestipus = (calc: KarakterCalcResult, idx: 0 | 1 | 2) => {
    const _te = idx === 2 ? calc.lofegyverrel?.ce : calc.fegyverrel.kezek[idx]?.te;
    if (!_te) {
        return 0;
    };
    const _st = idx === 2 ? calc.lofegyverrel!.sebzesTipus : calc.fegyverrel.kezek[idx]!.sebzesTipus;
    let ret = 0;
    if (_st.includes('szuro')) {
        ret += 1;
    }
    if (_st.includes('vago')) {
        ret += 2;
    }
    if (_st.includes('zuzo')) {
        ret += 4;
    }
    return ret;
}

const ST = ['', 'Szúró', 'Vágó', 'Szúró/Vágó', 'Zúzó', 'Szúró/Zúzó', 'Vágó/Zúzó', 'Szúró/Vágó/Zúzó'];

const sebzesTipusFormula = (field: string): string => {
    let ret = '';
    for (let i = 1; i < 8; i++) {
        ret += field + '==' + i + ' ? \'' + ST[i] + '\':'
    }
    return ret + '\'\'';
}

const harcertekek = (karakter: Karakter): Array<NumberProp> => {
    const calc = KarakterCalculator.calc(karakter);


    return [
        {
            type: 'number',
            name: 'VE',
            value: 0,
            formula: bekeszitFormula(karakter, calc => Calculation.calculate(calc.fegyverrel.ve)) + Calculation.calculate(calc.fegyverrel.ve)
        },
        {
            type: 'number',
            name: `internal-KE`,
            value: 0,
            formula: bekeszitFormula(karakter, calc => Calculation.calculate(calc.fegyverrel.ke)) + Calculation.calculate(calc.fegyverrel.ke)
        },
        {
            type: 'number',
            name: `internal-MTKE`,
            value: 0,
            formula: bekeszitFormula(karakter, calc => Calculation.calculate(calc.fegyverrel.mtke)) + Calculation.calculate(calc.fegyverrel.mtke)
        },
        {
            type: 'number',
            name: `internal-LoKE`,
            value: 0,
            formula: bekeszitFormula(karakter, calc => Calculation.calculate(calc.lofegyverrel?.ke ?? Calculation.value('nincs', 0))) + Calculation.calculate(calc.lofegyverrel?.ke ?? Calculation.value('nincs', 0))
        },
        {
            type: 'number',
            name: `internal-LoMTKE`,
            value: 0,
            formula: bekeszitFormula(karakter, calc => Calculation.calculate(calc.lofegyverrel?.tobbTamadasKe ?? Calculation.value('nincs', 0))) + Calculation.calculate(calc.lofegyverrel?.tobbTamadasKe ?? Calculation.value('nincs', 0))
        },
        {
            type: 'number',
            name: 'internal-jobbTE',
            value: 0,
            formula: bekeszitFormula(karakter, calc => te(calc, karakter.balkezes ? 1 : 0)) + te(calc, karakter.balkezes ? 1 : 0)
        },
        {
            type: 'number',
            name: 'internal-jobbSDarab',
            value: 0,
            formula: bekeszitFormula(karakter, calc => sebzes(calc, karakter.balkezes ? 1 : 0, 0)) + sebzes(calc, karakter.balkezes ? 1 : 0, 0)
        },
        {
            type: 'number',
            name: 'internal-jobbSKocka',
            value: 0,
            formula: bekeszitFormula(karakter, calc => sebzes(calc, karakter.balkezes ? 1 : 0, 1)) + sebzes(calc, karakter.balkezes ? 1 : 0, 1)
        },
        {
            type: 'number',
            name: 'internal-jobbSPlusz',
            value: 0,
            formula: bekeszitFormula(karakter, calc => sebzes(calc, karakter.balkezes ? 1 : 0, 2)) + sebzes(calc, karakter.balkezes ? 1 : 0, 2)
        },
        {
            type: 'number',
            name: 'internal-jobbSTipus',
            value: 0,
            formula: bekeszitFormula(karakter, calc => sebzestipus(calc, karakter.balkezes ? 1 : 0)) + sebzestipus(calc, karakter.balkezes ? 1 : 0)
        },
        {
            type: 'number',
            name: 'internal-balTE',
            value: 0,
            formula: bekeszitFormula(karakter, calc => te(calc, karakter.balkezes ? 0 : 1)) + te(calc, karakter.balkezes ? 0 : 1)
        },
        {
            type: 'number',
            name: 'internal-balSDarab',
            value: 0,
            formula: bekeszitFormula(karakter, calc => sebzes(calc, karakter.balkezes ? 0 : 1, 0)) + sebzes(calc, karakter.balkezes ? 0 : 1, 0)
        },
        {
            type: 'number',
            name: 'internal-balSKocka',
            value: 0,
            formula: bekeszitFormula(karakter, calc => sebzes(calc, karakter.balkezes ? 0 : 1, 1)) + sebzes(calc, karakter.balkezes ? 0 : 1, 1)
        },
        {
            type: 'number',
            name: 'internal-balSPlusz',
            value: 0,
            formula: bekeszitFormula(karakter, calc => sebzes(calc, karakter.balkezes ? 0 : 1, 2)) + sebzes(calc, karakter.balkezes ? 0 : 1, 2)
        },
        {
            type: 'number',
            name: 'internal-balSTipus',
            value: 0,
            formula: bekeszitFormula(karakter, calc => sebzestipus(calc, karakter.balkezes ? 0 : 1)) + sebzestipus(calc, karakter.balkezes ? 0 : 1)
        },
        {
            type: 'number',
            name: 'internal-CE',
            value: 0,
            formula: bekeszitFormula(karakter, calc => ce(calc)) + ce(calc)
        },
        {
            type: 'number',
            name: 'internal-LoSDarab',
            value: 0,
            formula: bekeszitFormula(karakter, calc => sebzes(calc, 2, 0)) + sebzes(calc, 2, 0)
        },
        {
            type: 'number',
            name: 'internal-LoSKocka',
            value: 0,
            formula: bekeszitFormula(karakter, calc => sebzes(calc, 2, 1)) + sebzes(calc, 2, 1)
        },
        {
            type: 'number',
            name: 'internal-LoSPlusz',
            value: 0,
            formula: bekeszitFormula(karakter, calc => sebzes(calc, 2, 2)) + sebzes(calc, 2, 2)
        },
        {
            type: 'number',
            name: 'internal-LoSTipus',
            value: 0,
            formula: bekeszitFormula(karakter, calc => sebzestipus(calc, 2)) + sebzestipus(calc, 2)
        },
    ];
}

const bekeszitFormula = (karakter: Karakter, fn: (calc: KarakterCalcResult) => number | ''): string => karakter.bekeszitve?.map(k => {
    const ujkarakter: Karakter = JSON.parse(JSON.stringify(karakter));
    ujkarakter.kezek = [...k.kezek];
    ujkarakter.lofegyver = k.lofegyver;
    const calc = KarakterCalculator.calc(ujkarakter);

    return `Bekészít-${k.name} ? ${fn(calc)} : `
})?.join('') ?? '';


export const exportTPCSV = (karakter: Karakter, calc: KarakterCalcResult) => {
    if (!karakter.tableplop) {
        return;
    }

    const psziKE = calc.psziDiszciplinak.filter(d => 'ke' in d).map(d => {
        if ('ke' in d && d.ke) {
            return {
                type: 'message',
                name: `KÉ - ${d.name}`,
                message: `KÉ: {kezdemeny = ${Calculation.calculate(d.ke)}+1d10} {initiative = kezdemeny}`
            } as Message
        }
        throw new Error('ilyen nincs és mégis van')
    });

    const varKE = calc.varazslatok.filter(d => 'ke' in d).map(d => {
        if ('ke' in d && d.ke) {
            return {
                type: 'message',
                name: `KÉ - ${d.name}`,
                message: `KÉ: {kezdemeny = ${Calculation.calculate(d.ke)}+1d10} {initiative = kezdemeny}`
            } as Message
        }
        throw new Error('ilyen nincs és mégis van')
    });


    const internalChar: Character = {
        id: karakter.tableplop.characterId,
        private: karakter.tableplop.private,
        appearance: karakter.tableplop.tokenURL,
        tabs: [
            {
                type: 'tab-section',
                title: 'Karakter',
                children: [
                    {
                        type: 'text',
                        name: 'Név',
                        value: karakter.name,
                    },
                    {
                        type: 'text',
                        name: 'Faj',
                        value: karakter.faj.name,
                    },
                    {
                        type: 'text',
                        name: 'Jellem',
                        value: karakter.jellem,
                    },
                    {
                        type: 'title-section',
                        title: 'SFÉ',
                        collapsed: true,
                        children: [
                            {
                                type: 'number',
                                name: 'sfe-szuro',
                                value: calc.sfe.szuro,
                            },
                            {
                                type: 'number',
                                name: 'sfe-vago',
                                value: calc.sfe.vago,
                            },
                            {
                                type: 'number',
                                name: 'sfe-zuzo',
                                value: calc.sfe.zuzo,
                            },
                            {
                                type: 'number',
                                name: 'mgt',
                                value: Calculation.calculate(calc.mgt),
                            }
                        ]
                    },
                    {
                        type: 'title-section',
                        title: 'Nepiszka',
                        collapsed: true,
                        private: true,
                        children: [
                            {
                                type: 'number',
                                name: 'kezdemeny',
                                local: true,
                                value: 0,
                            },
                            ...harcertekek(karakter)
                        ]
                    }
                ]
            },
            {
                type: 'tab-section',
                title: 'Dobás',
                children: [
                    {
                        type: 'message',
                        name: 'KÉ',
                        message: `KÉ: {kezdemeny = @:internal-KE:+1d10} {initiative = kezdemeny}`
                    },
                    {
                        type: 'message',
                        name: 'Köv. támadás',
                        message: `Következő támadás KÉ-je: {kezdemeny = kezdemeny + @:internal-MTKE:} {initiative = kezdemeny}`
                    },
                    {
                        type: 'message',
                        name: `Támadás - Jobb kéz`,
                        message: `Támadás - Jobb kéz| TÉ: {@:internal-jobbTE: + 1d100} / Sebzés: {@:internal-jobbSDarab:d@:internal-jobbSKocka: + @:internal-jobbSPlusz:} {${sebzesTipusFormula('internal-jobbSTipus')}}`
                    },
                    {
                        type: 'message',
                        name: `Támadás - Bal kéz`,
                        message: `Támadás - Bal kéz| TÉ: {@:internal-balTE: + 1d100} / Sebzés: {@:internal-balSDarab:d@:internal-balSKocka: + @:internal-balSPlusz:} {${sebzesTipusFormula('internal-balSTipus')}}`
                    },
                    {
                        type: 'message',
                        name: `KÉ - lövés`,
                        message: `KÉ: {kezdemeny = @:internal-LoKE:+1d10} {initiative = kezdemeny}`
                    },
                    {
                        type: 'message',
                        name: `Köv. lövés`,
                        message: `Következő lövés KÉ-je: {kezdemeny = kezdemeny + @:internal-LoMTKE:} {initiative = kezdemeny}`
                    },
                    {
                        type: 'message',
                        name: `Lövés`,
                        message: `Lövés| CÉ: {@:internal-CE: + 1d100} / Sebzés: {@:internal-LoSDarab:d@:internal-LoSKocka:! + @:internal-LoSPlusz:} {${sebzesTipusFormula('internal-LoSTipus')}}`
                    },
                    ...psziKE,
                    ...varKE
                ]
            },
            {
                type: 'tab-section',
                title: 'Fegyver',
                children: karakter.bekeszitve?.map(k => ({
                    type: 'checkbox',
                    name: `Bekészít-${k.name}`,
                    value: false
                })) ?? []
            },
            {
                type: 'tab-section',
                title: 'Pont',
                children: [
                    {
                        type: 'health',
                        name: 'ÉP',
                        max: Calculation.calculate(calc.ep),
                        curr: karakter.temporary.ep,
                        temp: 0
                    },
                    {
                        type: 'health',
                        name: 'FP',
                        max: Calculation.calculate(calc.fp),
                        curr: karakter.temporary.fp,
                        temp: 0
                    },
                    {
                        type: 'health',
                        name: 'MP',
                        max: Calculation.calculate(calc.mana),
                        curr: karakter.temporary.mana,
                    },
                    {
                        type: 'health',
                        name: 'ΨP',
                        max: Calculation.calculate(calc.pszi),
                        curr: karakter.temporary.pszi,
                    },
                ]
            }
        ]
    };

    if (karakter.tableplop.appearanceBlock) {
        internalChar.tabs[0].children.push({
            type: 'appearance',
            data: karakter.tableplop.appearanceBlock
        });
    }

    const ret = convertToTablePlop(internalChar);

    fileDownload(JSON.stringify(ret), `${karakter.name}-tableplop.json`, 'text/json');
}