import Tooltip from 'rc-tooltip';
import React from 'react';
import { Kepzettseg } from '../model/Kepzettseg';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FcCheckmark } from "react-icons/fc";

export const KepzettsegLeiras: React.FC<{ kepzettseg: Kepzettseg, fok?: number, inline?: boolean, truncateUnknown?: boolean }> = ({ kepzettseg, fok, inline, truncateUnknown }) => {
    const kepzettsegTable =
        <div style={{ overflowY: inline ? 'auto' : 'scroll', pointerEvents: 'auto', maxHeight: inline ? 'none' : '30rem' }}>
            <table className='bordered' style={{ width: '23rem' }}>
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
                    {kepzettseg.fajta === 'normal' && kepzettseg.szintleiras.filter((i, idx) => !truncateUnknown || (idx < (fok ?? 0))).map((l, idx) => <tr>
                        <th style={{ whiteSpace: 'nowrap', fontWeight: (idx < (fok ?? 0)) ? 'bold' : 'normal' }}>{idx + 1}. fok{!truncateUnknown && (idx < (fok ?? 0)) && <FcCheckmark />} </th>
                        <td style={{ textAlign: 'justify' }}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {l}
                            </ReactMarkdown>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>;

    return inline ? kepzettsegTable : <Tooltip placement='right' overlay={kepzettsegTable}>
        <span>{kepzettseg.name} {fok !== undefined && <>{fok}{kepzettseg.fajta === 'normal' ? <>. fok</> : <>%</>}</>}</span>
    </Tooltip>;
}