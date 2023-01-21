import Tooltip from 'rc-tooltip';
import React from 'react';
import { Kepzettseg, NormalKepzettseg } from '../../model/Kepzettseg';
import { FcCheckmark } from "react-icons/fc";
import { Kepessegek } from '../../model/Kepessegek';
import { MarkdownText } from '../MarkdownText';
import { entityDivStyle, printNumber } from '../../model/util';
import { Link } from 'react-router-dom';

export const KepzettsegLeiras: React.FC<{ kepzettseg: Kepzettseg, fok?: number, inline?: boolean, truncateUnknown?: boolean }> = ({ kepzettseg, fok, inline, truncateUnknown }) => {


    const findLinking = (kepzettseg: Kepzettseg): Array<NormalKepzettseg> => Kepzettseg.lista.filter(k => k.fajta === 'normal' && k.linked?.some(linked => linked.id === kepzettseg.id)) as Array<NormalKepzettseg>;


    const kepzettsegTable =
        <div style={entityDivStyle(inline)}>
            <table className='bordered'>
                <thead>
                    <tr style={{ textAlign: 'center' }}>
                        <th colSpan={2}>
                            <div className='justifiedFlexRow' >
                                <span style={{ fontWeight: 'normal', fontStyle: 'italic' }}>{kepzettseg.fajta === 'normal' && fok !== undefined && fok > 0 && <>{fok}. fok</>}</span>
                                <span>{kepzettseg.name}</span>
                                <span style={{ fontWeight: 'normal', fontStyle: 'italic' }}>{kepzettseg.fajta === 'normal' && <>({Kepessegek.name(kepzettseg.kepesseg)})</>}</span>
                            </div>
                        </th>
                    </tr>
                    <tr style={{ textAlign: 'center' }}>
                        <th colSpan={2}>
                            <div className='justifiedFlexRow' >
                                <div style={{ fontWeight: 'normal', fontStyle: 'italic', textAlign: 'left' }}>
                                    <b>Ezek segítik:</b>
                                    {kepzettseg.fajta === 'normal' && kepzettseg.linked?.map(k => <div><KepzettsegLeiras kepzettseg={Kepzettseg.find(k.id)} />→{printNumber(k.strength)}</div>)}
                                </div>
                                <span></span>
                                <div style={{ fontWeight: 'normal', fontStyle: 'italic', textAlign: 'left' }}>
                                    <b>Ezeket segíti:</b>
                                    {findLinking(kepzettseg).map(k => <div><KepzettsegLeiras kepzettseg={Kepzettseg.find(k.id)} />←{k.linked.find(linkBack => linkBack.id === kepzettseg.id)?.strength}</div>)}
                                </div>
                            </div>
                        </th>
                    </tr>
                    <tr style={{ textAlign: 'justify' }}>
                        <th colSpan={2}>
                            <MarkdownText>{kepzettseg.leiras}</MarkdownText>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {kepzettseg.fajta === 'normal' && kepzettseg.szintleiras.filter((i, idx) => !truncateUnknown || (idx < (fok ?? 0))).map((l, idx) => <tr>
                        <th style={{ whiteSpace: 'nowrap', fontWeight: (idx < (fok ?? 0)) ? 'bold' : 'normal' }}>{idx + 1}. fok{!truncateUnknown && (idx < (fok ?? 0)) && <FcCheckmark />} </th>
                        <td style={{ textAlign: 'justify' }}>
                            <MarkdownText>{l}</MarkdownText>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>;

    return inline ? kepzettsegTable : <Tooltip placement='right' overlay={kepzettsegTable}>
        <Link to={`/entity/${kepzettseg.id}`}>{kepzettseg.name} {fok !== undefined && <>{fok}{kepzettseg.fajta === 'normal' ? <>. fok</> : <>%</>}</>}</Link>
    </Tooltip>;
}