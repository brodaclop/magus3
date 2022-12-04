import React from 'react';
import { SebzesTipus, SEBZESTIPUS_LABEL } from '../model/Fegyver';
import { Karakter } from '../model/Karakter';
import { KarakterCalcResult } from '../model/KarakterCalculator';
import { PancelBuilderWidget } from './PancelBuilderWidget';


export const PancelWidget: React.FC<{ karakter: Karakter, calc: KarakterCalcResult, onChange: (k: Karakter) => unknown }> = ({ karakter, onChange, calc }) => {

    return <table style={{ border: '3px solid black', borderCollapse: 'collapse' }}>
        <thead>
            <tr>
                <th>
                    Páncél
                </th>
                <th>
                    {karakter.pancel?.name ?? '&nbsp;'}
                </th>
                <th>
                    <PancelBuilderWidget karakter={karakter} onChange={onChange} />
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th colSpan={2}>MGT</th>
                <td>{karakter.pancel?.mgt}</td>
            </tr>
            <tr>
                <th rowSpan={4}>SFÉ</th>
            </tr>
            {Object.keys(SEBZESTIPUS_LABEL).map(st => <tr>
                <th>{SEBZESTIPUS_LABEL[st as SebzesTipus]}</th>
                <td>{karakter.pancel?.sfe[st as SebzesTipus]}</td>
            </tr>
            )}

        </tbody>
    </table>
}