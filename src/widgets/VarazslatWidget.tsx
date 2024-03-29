import React from 'react';
import { Calculation } from '../model/Calculation';
import { Karakter } from '../model/Karakter';
import { KarakterCalcResult } from '../model/KarakterCalculator';
import { Kepzettseg } from '../model/Kepzettseg';
import { Magia } from '../model/Magia';
import { arrayName } from '../model/util';
import { CalculationWidget } from './CalculationWidget';
import { VarazslatLeiras } from './entities/VarazslatLeiras';


export const VarazslatWidget: React.FC<{ karakter: Karakter, calc: KarakterCalcResult, onChange: (karakter: Karakter) => unknown }> = ({ karakter, onChange, calc }) => {

    const mp = Calculation.calculate(calc.mana);

    return <table className='bordered fullWidth'>
        <thead>
            <tr>
                <th colSpan={8}>Varázslatok</th>
            </tr>
            <tr>
                <th>Név</th>
                <th>MP</th>
                <th>Varázslás ideje</th>
                <th>Hatótáv</th>
                <th>Időtartam</th>
                <th>Mentő</th>
                <th>Képzettség</th>
                <th>Kategóriák</th>
            </tr>
        </thead>
        <tbody>
            {calc.varazslatok.map(v => <tr style={{ fontWeight: mp >= v.mp ? 'bold' : 'normal' }}>
                <td>
                    <VarazslatLeiras v={v} />
                </td>
                <td>{v.mp}</td>
                <td>{'ke' in v ? <CalculationWidget calculation={v.ke} /> : v.varazslasIdeje}</td>
                <td>{Magia.formatRange(v.range)} </td>
                <td>{v.idotartam}</td>
                <td>{arrayName(Magia.mentodobasok, v.save)} </td>
                <td>
                    <table>
                        <tbody>
                            {v.kepzettsegek.map((k, idx) => <tr>
                                <td>{Kepzettseg.name(k)}</td>
                                {idx === 0 && <td rowSpan={v.kepzettsegek.length}>{v.fok}.fok</td>}
                            </tr>)}
                        </tbody>
                    </table>
                </td>
                <td>{v.kategoriak?.map(k => arrayName(Magia.kategoriak, k))?.map(n => <div>{n}</div>)}</td>
            </tr>)}
        </tbody>
    </table>;
}