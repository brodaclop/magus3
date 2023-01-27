import Tooltip from 'rc-tooltip';
import React from 'react';
import { Link } from 'react-router-dom';
import { CalcDiszciplina } from '../../model/KarakterCalculator';
import { Mentodobasok } from '../../model/Magia';
import { PsziDiszciplina, PsziIskolak } from '../../model/Pszi';
import { arrayName, entityDivStyle } from '../../model/util';
import { CalculationWidget } from '../CalculationWidget';
import { MarkdownText } from '../MarkdownText';

export const PsziDiszciplinaLeiras: React.FC<{ d: CalcDiszciplina | PsziDiszciplina, inline?: boolean }> = ({ d, inline }) => {
    const psziTable =
        <div style={entityDivStyle(inline)}>
            <table className='bordered'>
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
                        <td><Link to={`/entity/pszi:${d.iskola}`}>{arrayName(PsziIskolak, d.iskola)} {d.fok}.fok</Link></td>
                    </tr>
                    <tr>
                        <th>Ψ-pont</th>
                        <td>{d.psziPont}</td>
                    </tr>
                    {'ke' in d ?
                        <tr>
                            <th>KÉ</th>
                            <td>{typeof d.ke === 'number' ? d.ke : <CalculationWidget calculation={d.ke} />}</td>
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
                            <MarkdownText>{d.leiras}</MarkdownText>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>;

    return inline ? psziTable : <Tooltip placement='right' overlay={psziTable}>
        <Link to={`/entity/${d.id}`}>{d.name}</Link>
    </Tooltip>;
}