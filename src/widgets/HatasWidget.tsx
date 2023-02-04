import React from 'react';
import { Karakter } from '../model/Karakter';
import { KarakterCalcResult } from '../model/KarakterCalculator';
import { HatasBuilderWidget } from './HatasBuilderWidget';

export const HatasWidget: React.FC<{ karakter: Karakter, calc: KarakterCalcResult, onChange: (karakter: Karakter) => unknown }> = ({ karakter, calc, onChange }) => {
    return <table className='bordered'>
        <thead>
            <tr>
                <th colSpan={3}>Hatás</th>
            </tr>
        </thead>
        <tbody>
            {karakter.hatasok.map(h => <tr>
                <td>{h.name}</td>
                <td><input type='checkbox' checked={h.aktiv} onChange={e => {
                    h.aktiv = e.target.checked;
                    onChange(karakter);
                }} /></td>
                <td><HatasBuilderWidget id={h.id} karakter={karakter} onChange={onChange} /></td>
            </tr>)}
        </tbody>
    </table>;
}