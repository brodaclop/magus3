import React, { useState } from 'react';
import { Calculation } from '../model/Calculation';
import { Karakter } from '../model/Karakter';
import { KarakterCalcResult } from '../model/KarakterCalculator';
import { Kasztok } from '../model/Kasztok';
import { CalculationWidget } from './CalculationWidget';

export const LifeWidget: React.FC<{ calc: KarakterCalcResult, karakter: Karakter, levelUp: (id: string) => unknown }> = ({ calc, karakter, levelUp }) => {

    const [ujKaszt, setUjKaszt] = useState<string>('');

    const kasztok = karakter.szint.slice(1).reduce((acc, curr) => {
        acc[curr.kaszt.name] = (acc[curr.kaszt.id] ?? 0) + 1
        return acc;
    }, {} as Record<string, number>);

    return <table style={{ border: '3px solid black', borderCollapse: 'collapse' }}>
        <tbody>
            <tr>
                <th>Faj</th>
                <td>{karakter.faj.name}</td>
            </tr>
            <tr>
                <th>Szint</th>
                <td>
                    <ul style={{ margin: 0 }}>
                        {Object.entries(kasztok).map(([kaszt, szint]) => <li>
                            {Kasztok.find(kaszt).name}: {szint}
                            <button disabled={!!karakter.hm || calc.pendingKepzettsegekCount > 0} onClick={() => levelUp(kaszt)}>+</button>
                        </li>)}
                        <li>
                            <select value={ujKaszt} onChange={e => setUjKaszt(e.target.value)}>
                                {ujKaszt === '' && <option value=''>Másik kaszt</option>}
                                {Kasztok.lista.filter(k => !Object.keys(kasztok).includes(k.id)).map(k => <option value={k.id}>{k.name}</option>)}
                            </select>
                            <button disabled={!!karakter.hm || calc.pendingKepzettsegekCount > 0 || ujKaszt === ''} onClick={() => {
                                levelUp(ujKaszt);
                                setUjKaszt('');
                            }}>+</button>
                        </li>
                    </ul>
                </td>
            </tr>
            <tr>
                <th>ÉP</th>
                <td><CalculationWidget calculation={calc.ep}>{Calculation.calculate(calc.ep)}</CalculationWidget></td>
            </tr>
            <tr>
                <th>FP</th>
                <td><CalculationWidget calculation={calc.fp}>{Calculation.calculate(calc.fp)}</CalculationWidget></td>
            </tr>
        </tbody>
    </table>;
}