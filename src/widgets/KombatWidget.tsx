import React from 'react';
import { Calculation } from '../model/Calculation';
import { KOZELHARCI_FEGYVEREK, SebzesTipus } from '../model/Fegyver';
import { Karakter } from '../model/Karakter';
import { KarakterCalcResult } from '../model/KarakterCalculator';
import { printKocka } from '../model/Kocka';
import { CalculationWidget } from './CalculationWidget';
import { FegyverSelection } from './FegyverSelection';


const SEBZESTIPUS_LABEL: Record<SebzesTipus, string> = {
    szuro: 'Szúró',
    vago: 'Vágó',
    zuzo: 'Zúzó'
};

export const formatSebzesTipus = (t: SebzesTipus | Array<SebzesTipus>): string =>
    (typeof t === 'string' ? [t] : t).sort().map(o => SEBZESTIPUS_LABEL[o]).join('/') || '-';



export const KombatWidget: React.FC<{ karakter: Karakter, calc: KarakterCalcResult, onChange: (karakter: Karakter) => unknown }> = ({ karakter, calc, onChange }) => {
    return <table>
        <tbody>
            <tr>
                <td>
                    <p><FegyverSelection
                        fegyverek={KOZELHARCI_FEGYVEREK.filter(f => Karakter.megfoghato(karakter, 0, f))}
                        emptyEnabled={false}
                        current={karakter.kezek[0]}
                        onChange={f => {
                            karakter.kezek[0] = f;
                            onChange(karakter);
                        }} /></p>
                </td>
                <td>
                    <p><FegyverSelection
                        fegyverek={KOZELHARCI_FEGYVEREK.filter(f => Karakter.megfoghato(karakter, 1, f))}
                        emptyEnabled={Karakter.megfoghato(karakter, 1, undefined)}
                        current={karakter.kezek[1]}
                        onChange={f => {
                            karakter.kezek[1] = f;
                            onChange(karakter);
                        }} /></p>
                </td>
            </tr>
            <tr style={{ textAlign: 'center' }}>
                <td colSpan={2}><CalculationWidget calculation={calc.fegyverrel.ke}>KÉ</CalculationWidget>: {Calculation.calculate(calc.fegyverrel.ke)}</td>
            </tr>
            <tr>
                <td>
                    {calc.fegyverrel.kezek[0] && <>
                        <p><CalculationWidget calculation={calc.fegyverrel.kezek[0].te}>TÉ</CalculationWidget>: {Calculation.calculate(calc.fegyverrel.kezek[0].te)} </p>
                        <p>Sebzés: {printKocka(calc.fegyverrel.kezek[0].sebzes)} {formatSebzesTipus(karakter.kezek[0]?.sebzestipus ?? [])}</p>
                    </>}
                </td>
                <td>
                    {calc.fegyverrel.kezek[1] && <>
                        <p><CalculationWidget calculation={calc.fegyverrel.kezek[1].te}>TÉ</CalculationWidget>: {Calculation.calculate(calc.fegyverrel.kezek[1].te)} </p>
                        <p>Sebzés: {printKocka(calc.fegyverrel.kezek[1].sebzes)} {formatSebzesTipus(karakter.kezek[1]?.sebzestipus ?? [])} </p>
                    </>}
                </td>
            </tr>
            <tr style={{ textAlign: 'center' }}>
                <td colSpan={2}><CalculationWidget calculation={calc.fegyverrel.ve}>VÉ</CalculationWidget>: {Calculation.calculate(calc.fegyverrel.ve)}</td>
            </tr>
        </tbody>
    </table>;
}