import React from 'react';
import { KarakterTemplate } from '../model/Karakter';
import { KarakterCalcResult } from '../model/KarakterCalculator';
import { Kepesseg, Kepessegek, KepessegKategoria } from '../model/Kepessegek';
import { CalculationWidget } from './CalculationWidget';

export const KepessegWidget: React.FC<{
    kategoriak: KarakterTemplate['kepessegKategoriak'],
    karakterCalc: KarakterCalcResult,
    eloszt: (k: KepessegKategoria) => unknown;
    minusz: (k: Kepesseg) => unknown;
    plusz: (k: Kepesseg) => unknown;
}> = ({
    kategoriak,
    karakterCalc,
    eloszt,
    minusz,
    plusz
}) => {
        return <table style={{ border: '3px solid black', borderCollapse: 'collapse' }}>
            <thead>
                <th>Kategória</th>
                <th />
                <th>Képesség</th>
                <th />
            </thead>
            <tbody>
                {Kepessegek.lista.map((rd, idx) => <tr style={{ borderTop: idx % 3 === 0 ? '1px black solid' : '', borderBottom: idx % 3 === 2 ? '1px black solid' : '' }}>
                    {idx % 3 === 0 && <td rowSpan={3}>{rd.kategoria}</td>}
                    {idx % 3 === 0 && <td rowSpan={3} style={{ borderRight: '1px black solid' }}>{kategoriak[rd.kategoria]}
                        <button onClick={() => eloszt(rd.kategoria)}>Eloszt</button>
                    </td>}
                    <td>{rd.name}</td>
                    <td>
                        <button onClick={e => minusz(rd)}>-</button>
                        <span style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>{karakterCalc.kepessegek[rd.id]}</span>
                        /
                        <span style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}><CalculationWidget calculation={karakterCalc.pillanatnyiKepessegek[rd.id]} /></span>
                        <button onClick={e => plusz(rd)}>+</button>
                    </td>
                </tr>)}
            </tbody>
        </table>
    }