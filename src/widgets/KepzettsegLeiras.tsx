import Tooltip from 'rc-tooltip';
import React from 'react';
import { Kepzettseg } from '../model/Kepzettseg';

export const KepzettsegLeiras: React.FC<{ kepzettseg: Kepzettseg, fok: number }> = ({ kepzettseg, fok = 0 }) => {
    const kepzettsegTable = <table style={{ width: '20rem' }}>
        <thead>
            <tr style={{ textAlign: 'center' }}>
                <th colSpan={2}>
                    {kepzettseg.name} {kepzettseg.fajta === 'normal' && fok > 0 && <>{fok}. fok</>}
                </th>
            </tr>
            <tr style={{ textAlign: 'justify' }}>
                <th colSpan={2}>
                    {kepzettseg.leiras}
                </th>
            </tr>
        </thead>
        <tbody>
            {kepzettseg.fajta === 'normal' && kepzettseg.szintleiras.map((l, idx) => <tr>
                <th>{idx + 1}. fok</th>
                <td style={{ whiteSpace: 'pre-wrap', textAlign: 'justify', fontWeight: idx < fok ? 'bold' : 'normal' }}>
                    {l}
                </td>
            </tr>)}
        </tbody>
    </table>;

    return <Tooltip placement='right' overlay={kepzettsegTable}>
        <span>{kepzettseg.name} {fok}{kepzettseg.fajta === 'normal' ? <>. fok</> : <>%</>}</span>
    </Tooltip>;
}