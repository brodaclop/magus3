import React from 'react';
import { Calculation } from '../model/Calculation';
import { Karakter } from '../model/Karakter';
import { KarakterCalcResult } from '../model/KarakterCalculator';
import { Kepzettseg } from '../model/Kepzettseg';
import { Magia } from '../model/Magia';
import { arrayName } from '../model/util';
import { CalculationWidget } from './CalculationWidget';
import { VarazslatLeiras } from './tooltips/VarazslatLeiras';


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
                <th>Mentődobás</th>
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
                <td>{v.range === 'self' ? 'önmaga' : v.range === 'touch' ? 'érintés' : `${v.range} m`} </td>
                <td>{v.idotartam}</td>
                <td>{arrayName(Magia.mentodobasok, v.save)} </td>
                <td>{v.kepzettsegek.map(k => Kepzettseg.name(k)).join(', ')} {v.fok}.fok</td>
                <td style={{ whiteSpace: 'pre-wrap' }}>{v.kategoriak.map(k => arrayName(Magia.kategoriak, k)).join('\n')}</td>
            </tr>)}
        </tbody>
    </table>;
}