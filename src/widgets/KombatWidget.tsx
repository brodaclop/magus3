import React from 'react';
import { Calculation } from '../model/Calculation';
import { Karakter } from '../model/Karakter';
import { KarakterCalcResult } from '../model/KarakterCalculator';
import { printKocka } from '../model/Kocka';
import { CalculationWidget } from './CalculationWidget';
import { FegyverSelection } from './FegyverSelection';

export const KombatWidget: React.FC<{ karakter: Karakter, calc: KarakterCalcResult, onChange: (karakter: Karakter) => unknown }> = ({ karakter, calc, onChange }) => {
    return <table>
        <tbody>
            <tr style={{ textAlign: 'center' }}>
                <td colSpan={2}><CalculationWidget calculation={calc.fegyverrel.ke}>KÉ</CalculationWidget>: {Calculation.calculate(calc.fegyverrel.ke)}</td>
            </tr>
            <tr>
                <td>
                    <p><FegyverSelection enabled current={karakter.kezek[0]} onChange={f => {
                        karakter.kezek[0] = f;
                        onChange(karakter);
                    }} /></p>
                </td>
                <td>
                    <p><FegyverSelection enabled current={karakter.kezek[1]} onChange={f => {
                        karakter.kezek[1] = f;
                        onChange(karakter);
                    }} /></p>
                </td>
            </tr>
            <tr>
                <td>
                    {calc.fegyverrel.kezek[0] && <>
                        <p><CalculationWidget calculation={calc.fegyverrel.kezek[0].te}>TÉ</CalculationWidget>: {Calculation.calculate(calc.fegyverrel.kezek[0].te)} </p>
                        <p>Sebzés: {printKocka(calc.fegyverrel.kezek[0].sebzes)}</p>
                    </>}
                </td>
                <td>
                    {calc.fegyverrel.kezek[1] && <>
                        <p><CalculationWidget calculation={calc.fegyverrel.kezek[1].te}>TÉ</CalculationWidget>: {Calculation.calculate(calc.fegyverrel.kezek[1].te)} </p>
                        <p>Sebzés: {printKocka(calc.fegyverrel.kezek[1].sebzes)}</p>
                    </>}
                </td>
            </tr>
            <tr style={{ textAlign: 'center' }}>
                <td colSpan={2}><CalculationWidget calculation={calc.fegyverrel.ve}>VÉ</CalculationWidget>: {Calculation.calculate(calc.fegyverrel.ve)}</td>
            </tr>
        </tbody>
    </table>;
}