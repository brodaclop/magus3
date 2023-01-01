import Tooltip from 'rc-tooltip';
import React from 'react';
import { Kepzettseg } from '../model/Kepzettseg';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const KepzettsegLeiras: React.FC<{ kepzettseg: Kepzettseg, fok?: number }> = ({ kepzettseg, fok }) => {
    const kepzettsegTable =
        <div style={{ overflowY: 'scroll', pointerEvents: 'auto', maxHeight: '30rem' }}>
            <table className='bordered' style={{ width: '25rem' }}>
                <thead>
                    <tr style={{ textAlign: 'center' }}>
                        <th colSpan={2}>
                            {kepzettseg.name} {kepzettseg.fajta === 'normal' && fok !== undefined && fok > 0 && <>{fok}. fok</>}
                        </th>
                    </tr>
                    <tr style={{ textAlign: 'justify' }}>
                        <th colSpan={2}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {kepzettseg.leiras}
                            </ReactMarkdown>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {kepzettseg.fajta === 'normal' && kepzettseg.szintleiras.map((l, idx) => <tr>
                        <th>{idx + 1}. fok</th>
                        <td style={{ textAlign: 'justify', fontWeight: (fok !== undefined && idx < fok) ? 'bold' : 'normal' }}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {l}
                            </ReactMarkdown>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>;

    return <Tooltip placement='right' overlay={kepzettsegTable}>
        <span>{kepzettseg.name} {fok !== undefined && <>{fok}{kepzettseg.fajta === 'normal' ? <>. fok</> : <>%</>}</>}</span>
    </Tooltip>;
}