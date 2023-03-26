import fileDownload from "js-file-download";
import { Calculation } from "../model/Calculation";
import { Karakter } from "../model/Karakter";
import { KarakterCalcResult } from "../model/KarakterCalculator";
import { KockaDobas, printKocka } from "../model/Kocka";
import { formatSebzesTipus } from "../widgets/KombatWidget";
import { convertInternalToExternal, InternalTPCharacter, InternalTPChild, TPCharacter } from "./Model";







export const exportTPCSV = (karakter: Karakter, calc: KarakterCalcResult) => {
    if (!karakter.tableplop) {
        return;
    }

    const formatRoll = (d: KockaDobas, ijasz?: boolean) => printKocka(d, ijasz).replace('k', 'd');

    const fegyverrel: Array<InternalTPChild> = calc.fegyverrel.kezek.filter(i => !!(i?.te)).map((kez, idx) => ({
        type: 'message',
        name: `TÉ - ${karakter.kezek[idx]?.ob.name}`,
        message: `Támadás - ${karakter.kezek[idx]?.ob.name}: TÉ: {${Calculation.calculate(kez!.te!)} + 1d100} / Sebzés: {${formatRoll(kez!.sebzes)}} ${formatSebzesTipus(karakter.kezek[idx]?.ob.sebzestipus!)}`
    }));

    const lofegyverrel: Array<InternalTPChild> = calc.lofegyverrel ? [{
        type: 'message',
        name: `KÉ - ${karakter.lofegyver?.ob.name}`,
        message: `KÉ: {kezdemeny = ${Calculation.calculate(calc.lofegyverrel.ke)}+1d10} {initiative = kezdemeny}`
    },
    {
        type: 'message',
        name: `Köv. támadás - ${karakter.lofegyver?.ob.name}`,
        message: `Következő támadás KÉ-je: {kezdemeny = kezdemeny + ${Calculation.calculate(calc.lofegyverrel.tobbTamadasKe)}} {initiative = kezdemeny}`
    },
    {
        type: 'message',
        name: `CÉ - ${karakter.lofegyver?.ob.name}`,
        message: `Lövés - ${karakter.lofegyver?.ob.name}: CÉ: {${Calculation.calculate(calc.lofegyverrel.ce)} + 1d100} / Sebzés: {${formatRoll(calc.lofegyverrel.sebzes, true)}} ${formatSebzesTipus(karakter.lofegyver?.ob.sebzestipus!)}`
    }
    ] : [];

    const internalChar: InternalTPCharacter = {
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
                        type: 'number',
                        name: 'kezdemeny',
                        local: true,
                        value: 0,
                    },
                ]
            },
            {
                type: 'tab-section',
                title: 'Dobások',
                children: [
                    {
                        type: 'message',
                        name: 'KÉ',
                        message: `KÉ: {kezdemeny = ${Calculation.calculate(calc.fegyverrel.ke)}+1d10} {initiative = kezdemeny}`
                    },
                    {
                        type: 'message',
                        name: 'Köv. támadás',
                        message: `Következő támadás KÉ-je: {kezdemeny = kezdemeny + ${Calculation.calculate(calc.fegyverrel.mtke)}} {initiative = kezdemeny}`
                    },
                    ...fegyverrel,
                    ...lofegyverrel
                ]
            },
            {
                type: 'tab-section',
                title: 'Pontok',
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

    debugger;

    const ret: TPCharacter = convertInternalToExternal(internalChar);

    fileDownload(JSON.stringify(ret), `${karakter.name}.json`, 'text/json');
}