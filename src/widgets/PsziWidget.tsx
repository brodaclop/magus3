import React from 'react';
import { Calculation } from '../model/Calculation';
import { Karakter } from '../model/Karakter';
import { KarakterCalcResult } from '../model/KarakterCalculator';
import { Kepzettseg } from '../model/Kepzettseg';
import { Magia } from '../model/Magia';
import { arrayName } from '../model/util';
import { CalculationWidget } from './CalculationWidget';
import { PsziDiszciplinaLeiras } from './tooltips/PsziDiszciplinaLeiras';


export const PsziWidget: React.FC<{ karakter: Karakter, calc: KarakterCalcResult, onChange: (karakter: Karakter) => unknown }> = ({ karakter, onChange, calc }) => {

    const pszi = Calculation.calculate(calc.pszi);

    return <table className='bordered fullWidth'>
        <thead>
            <tr>
                <th colSpan={8}>Pszi diszciplinák</th>
            </tr>
            <tr>
                <th>Név</th>
                <th>ΨP</th>
                <th>Meditáció ideje</th>
                <th>Időtartam</th>
                <th>Mentődobás</th>
                <th>Iskola</th>
            </tr>
        </thead>
        <tbody>
            {calc.psziDiszciplinak.map(v => <tr style={{ fontWeight: pszi >= v.psziPont ? 'bold' : 'normal' }}>
                <td>
                    <PsziDiszciplinaLeiras d={v} />
                </td>
                <td>{v.psziPont}</td>
                <td>{'ke' in v ? <CalculationWidget calculation={v.ke} /> : v.varazslasIdeje}</td>
                <td>{v.idotartam}</td>
                <td>{arrayName(Magia.mentodobasok, v.save)} </td>
                <td>{Kepzettseg.name(`pszi:${v.iskola}`)} {v.fok}. fok</td>
            </tr>)}
        </tbody>
    </table>;
}