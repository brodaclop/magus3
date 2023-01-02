import Tooltip from 'rc-tooltip';
import React from 'react';
import { Calculation } from '../model/Calculation';
import { Karakter } from '../model/Karakter';
import { KarakterCalcResult } from '../model/KarakterCalculator';
import { Kepzettseg } from '../model/Kepzettseg';
import { Magia } from '../model/Magia';
import { CalculationWidget } from './CalculationWidget';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


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
                    <Tooltip placement='top' overlay={<ReactMarkdown remarkPlugins={[remarkGfm]}>{v.leiras}</ReactMarkdown>}>
                        <span>{v.name}</span>
                    </Tooltip>
                </td>
                <td>{v.psziPont}</td>
                <td>{'ke' in v ? <CalculationWidget calculation={v.ke} /> : v.varazslasIdeje}</td>
                <td>{v.idotartam}</td>
                <td>{Magia.mentodobasok.find(m => m.id === v.save)?.name} </td>
                <td>{Kepzettseg.name(`pszi:${v.iskola}`)} {v.fok}. fok</td>
            </tr>)}
        </tbody>
    </table>;
}