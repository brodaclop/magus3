import React, { useState } from 'react';
import { Calculation } from '../model/Calculation';
import { Karakter } from '../model/Karakter';
import { KarakterCalcResult } from '../model/KarakterCalculator';
import { Kasztok } from '../model/Kasztok';
import { CalculationWidget } from './CalculationWidget';

export const LifeWidget: React.FC<{
    calc: KarakterCalcResult,
    karakter: Karakter,
    levelUp: (id: string) => unknown,
    deleteKarakter: () => unknown
}> = ({ calc, karakter, levelUp, deleteKarakter }) => {

    const [ujKaszt, setUjKaszt] = useState<string>('');

    const kasztok = Karakter.szintek(karakter);

    return <table style={{ border: '3px solid black', borderCollapse: 'collapse' }}>
        <tbody>
            <tr>
                <th>Név</th>
                <td>{karakter.name}</td>
            </tr>
            <tr>
                <th>Faj</th>
                <td>{karakter.faj.name}</td>
            </tr>
            <tr>
                <th>Szint</th>
                <td>
                    <ul style={{ margin: 0 }}>
                        {Object.entries(kasztok).map(([kasztId, kaszt]) => <li>
                            {kaszt.name}: {kaszt.szint}
                            <button disabled={!!karakter.hm || calc.pendingKepzettsegekCount > 0} onClick={() => levelUp(kasztId)}>+</button>
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
            <tr>
                <td colSpan={2}><button onClick={deleteKarakter}>Töröl</button></td>
            </tr>
        </tbody>
    </table>;
}