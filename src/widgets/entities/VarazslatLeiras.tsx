import Tooltip from 'rc-tooltip';
import React from 'react';
import { Link } from 'react-router-dom';
import { CalcVarazslat } from '../../model/KarakterCalculator';
import { Kepzettseg } from '../../model/Kepzettseg';
import { Magia, MagiaKategoriak, Mentodobasok, Varazslat } from '../../model/Magia';
import { arrayName, entityDivStyle } from '../../model/util';
import { MarkdownText } from '../MarkdownText';
import { CalculationWidget } from './../CalculationWidget';

export const VarazslatLeiras: React.FC<{ v: CalcVarazslat | Varazslat, inline?: boolean }> = ({ v, inline }) => {
    const psziTable =
        <div style={entityDivStyle(inline)}>
            <table className='bordered'>
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
                        <td>{v.kepzettsegek?.map(k => Kepzettseg.name(k)).join(', ')} {v.fok}.fok</td>
                    </tr>
                    <tr>
                        <th>MP</th>
                        <td>{v.mp}</td>
                    </tr>
                    {'ke' in v ?
                        <tr>
                            <th>KÉ</th>
                            <td>{typeof v.ke === 'number' ? v.ke : <CalculationWidget calculation={v.ke} />}</td>
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
                        <td>{Magia.formatRange(v.range)}</td>
                    </tr>
                    <tr>
                        <th>Mentődobás</th>
                        <td>{v.save && arrayName(Mentodobasok, v.save)}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <MarkdownText>{v.leiras}</MarkdownText>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>;

    return inline ? psziTable : <Tooltip placement='right' overlay={psziTable}>
        <Link to={`/entity/${v.id}`}>{v.name}</Link>
    </Tooltip>;
}