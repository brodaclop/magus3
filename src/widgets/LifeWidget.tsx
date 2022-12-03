import React from 'react';
import { Calculation } from '../model/Calculation';
import { Karakter } from '../model/Karakter';
import { KarakterCalcResult } from '../model/KarakterCalculator';
import { CalculationWidget } from './CalculationWidget';

export const LifeWidget: React.FC<{ calc: KarakterCalcResult, karakter: Karakter, levelUp: () => unknown }> = ({ calc, karakter, levelUp }) => {
    return <table style={{ border: '3px solid black', borderCollapse: 'collapse' }}>
        <tbody>
            <tr>
                <th>ÉP</th>
                <td><CalculationWidget calculation={calc.ep}>{Calculation.calculate(calc.ep)}</CalculationWidget></td>
            </tr>
            <tr>
                <th>FP</th>
                <td><CalculationWidget calculation={calc.fp}>{Calculation.calculate(calc.fp)}</CalculationWidget></td>
            </tr>
            <tr>
                <th>Szint</th>
                <td>{karakter.szint.length - 1} <button disabled={!!karakter.hm} onClick={levelUp}>+</button></td>
            </tr>
        </tbody>
    </table>;
}