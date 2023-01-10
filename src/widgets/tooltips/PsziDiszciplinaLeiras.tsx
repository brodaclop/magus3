import Tooltip from 'rc-tooltip';
import React from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CalcDiszciplina } from '../../model/KarakterCalculator';
import { Mentodobasok } from '../../model/Magia';
import { PsziIskolak } from '../../model/Pszi';
import { arrayName } from '../../model/util';
import { CalculationWidget } from '../CalculationWidget';

export const PsziDiszciplinaLeiras: React.FC<{ d: CalcDiszciplina, inline?: boolean }> = ({ d, inline }) => {
    const psziTable =
        <div style={{ overflowY: inline ? 'auto' : 'scroll', pointerEvents: 'auto', maxHeight: inline ? 'none' : '30rem' }}>
            <table className='bordered' style={{ width: '23rem' }}>
                <thead>
                    <tr style={{ textAlign: 'center' }}>
                        <th colSpan={2}>
                            <span>{d.name}</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Iskola</th>
                        <td>{arrayName(PsziIskolak, d.iskola)} {d.fok}.fok</td>
                    </tr>
                    <tr>
                        <th>Ψ-pont</th>
                        <td>{d.psziPont}</td>
                    </tr>
                    {'ke' in d ?
                        <tr>
                            <th>KÉ</th>
                            <td><CalculationWidget calculation={d.ke} /></td>
                        </tr> :
                        <tr>
                            <th>Meditáció ideje</th>
                            <td>{d.varazslasIdeje}</td>
                        </tr>
                    }
                    <tr>
                        <th>Időtartam</th>
                        <td>{d.idotartam}</td>
                    </tr>
                    <tr>
                        <th>Mentődobás</th>
                        <td>{arrayName(Mentodobasok, d.save)}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {d.leiras}
                            </ReactMarkdown>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>;

    return inline ? psziTable : <Tooltip placement='right' overlay={psziTable}>
        <span>{d.name}</span>
    </Tooltip>;
}