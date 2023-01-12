import Tooltip from 'rc-tooltip';
import React from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CalcVarazslat } from '../../model/KarakterCalculator';
import { Kepzettseg } from '../../model/Kepzettseg';
import { MagiaKategoriak, Mentodobasok } from '../../model/Magia';
import { arrayName } from '../../model/util';
import { CalculationWidget } from './../CalculationWidget';

export const VarazslatLeiras: React.FC<{ v: CalcVarazslat, inline?: boolean }> = ({ v, inline }) => {
    const psziTable =
        <div style={{ overflowY: inline ? 'auto' : 'scroll', pointerEvents: 'auto', maxHeight: inline ? 'none' : '30rem' }}>
            <table className='bordered' style={{ width: '23rem' }}>
                <thead>
                    <tr style={{ textAlign: 'center' }}>
                        <th colSpan={2}>
                            <span>{v.name}</span> {v.kategoriak && v.kategoriak.length > 0 && <>({v.kategoriak.map(k => arrayName(MagiaKategoriak, k)).join(', ')})</>}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Képzettség</th>
                        <td>{v.kepzettsegek.map(k => Kepzettseg.name(k)).join(', ')} {v.fok}.fok</td>
                    </tr>
                    <tr>
                        <th>MP</th>
                        <td>{v.mp}</td>
                    </tr>
                    {'ke' in v ?
                        <tr>
                            <th>KÉ</th>
                            <td><CalculationWidget calculation={v.ke} /></td>
                        </tr> :
                        <tr>
                            <th>Varázslás ideje</th>
                            <td>{v.varazslasIdeje}</td>
                        </tr>
                    }
                    <tr>
                        <th>Időtartam</th>
                        <td>{v.idotartam}</td>
                    </tr>
                    <tr>
                        <th>Hatótáv</th>
                        <td>{v.range === 'self' ? 'önmaga' : v.range === 'touch' ? 'érintés' : `${v.range} m`}</td>
                    </tr>
                    <tr>
                        <th>Mentődobás</th>
                        <td>{arrayName(Mentodobasok, v.save)}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {v.leiras}
                            </ReactMarkdown>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>;

    return inline ? psziTable : <Tooltip placement='right' overlay={psziTable}>
        <span>{v.name}</span>
    </Tooltip>;
}