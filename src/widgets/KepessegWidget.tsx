import React from 'react';
import { Karakter } from '../model/Karakter';
import { KarakterCalcResult } from '../model/KarakterCalculator';
import { Kepesseg, Kepessegek, KepessegKategoria } from '../model/Kepessegek';
import { CalculationWidget } from './CalculationWidget';

export const KepessegWidget: React.FC<{
    karakter: Karakter;
    calc: KarakterCalcResult;
    eloszt: (k: KepessegKategoria) => unknown;
    minusz: (k: Kepesseg) => unknown;
    plusz: (k: Kepesseg) => unknown;
    lezar: () => unknown;
}> = ({
    karakter,
    calc,
    eloszt,
    minusz,
    plusz,
    lezar
}) => {
        return <table className='bordered'>
            <thead>
                <th>Kategória</th>
                <th />
                <th>Képesség</th>
                <th />
            </thead>
            <tbody>
                {Kepessegek.lista.map((rd, idx) => <tr style={{ borderTop: idx % 3 === 0 ? '1px black solid' : '', borderBottom: idx % 3 === 2 ? '1px black solid' : '' }}>
                    {idx % 3 === 0 && <td rowSpan={3}>{rd.kategoria}</td>}
                    {idx % 3 === 0 && <td rowSpan={3} style={{ borderRight: '1px black solid' }}>
                        {!karakter.elosztva && <>{karakter.kepessegKategoriak[rd.kategoria]} <button onClick={() => eloszt(rd.kategoria)}>Eloszt</button></>}
                    </td>}
                    <td>{rd.name}</td>
                    <td style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {!karakter.elosztva && <button onClick={e => minusz(rd)}>-</button>}
                        <span style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>
                            {calc.kepessegek[rd.id]}
                            /
                            <CalculationWidget calculation={calc.pillanatnyiKepessegek[rd.id]} />
                        </span>
                        {!karakter.elosztva && <button onClick={e => plusz(rd)}>+</button>}
                    </td>
                </tr>)}
            </tbody>
            {!karakter.elosztva && <tbody>
                <tr>
                    <td colSpan={4} style={{ backgroundColor: 'lightpink' }}>
                        <button
                            onClick={lezar}
                            disabled={karakter.kepessegKategoriak.Fizikum + karakter.kepessegKategoriak.Ügyesség + karakter.kepessegKategoriak.Asztrál + karakter.kepessegKategoriak.Mentál > 0}
                            className='fullWidth'>
                            Elosztás befejezése
                        </button>
                    </td>
                </tr>
            </tbody>}
        </table>
    }