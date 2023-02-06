import React from 'react';
import { Karakter } from '../model/Karakter';
import { KarakterCalcResult } from '../model/KarakterCalculator';
import { CalculationWidget } from './CalculationWidget';

export const MagiaEllenallasWidget: React.FC<{
    calc: KarakterCalcResult,
    karakter: Karakter,
    onChange: (karakter: Karakter) => unknown,
}> = ({ calc, karakter, onChange }) => {
    return <table className='bordered'>
        <thead>
            <tr>
                <th colSpan={3}>Mágiaellenállás</th>
            </tr>
            <tr>
                <th>&nbsp;</th>
                <th>Asztrál</th>
                <th>Mentál</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>Statikus</th>
                <td><input type='number' value={karakter.temporary.pajzs.asztral.statikus} onChange={e => {
                    karakter.temporary.pajzs.asztral.statikus = Number(e.target.value);
                    onChange(karakter);
                }} /> </td>
                <td><input type='number' value={karakter.temporary.pajzs.mental.statikus} onChange={e => {
                    karakter.temporary.pajzs.mental.statikus = Number(e.target.value);
                    onChange(karakter);
                }} /> </td>
            </tr>
            <tr>
                <th>Dinamikus</th>
                <td><input type='number' value={karakter.temporary.pajzs.asztral.dinamikus} onChange={e => {
                    karakter.temporary.pajzs.asztral.dinamikus = Number(e.target.value);
                    onChange(karakter);
                }} /> </td>
                <td><input type='number' value={karakter.temporary.pajzs.mental.dinamikus} onChange={e => {
                    karakter.temporary.pajzs.mental.dinamikus = Number(e.target.value);
                    onChange(karakter);
                }} /> </td>
            </tr>
            <tr>
                <th>Egyéb</th>
                <td><input type='number' value={karakter.temporary.pajzs.asztral.egyeb} onChange={e => {
                    karakter.temporary.pajzs.asztral.egyeb = Number(e.target.value);
                    onChange(karakter);
                }} /> </td>
                <td><input type='number' value={karakter.temporary.pajzs.mental.egyeb} onChange={e => {
                    karakter.temporary.pajzs.mental.egyeb = Number(e.target.value);
                    onChange(karakter);
                }} /> </td>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <th>Összesen</th>
                <td><CalculationWidget calculation={calc.magiaEllenallas.asztral} /></td>
                <td><CalculationWidget calculation={calc.magiaEllenallas.mental} /></td>
            </tr>
        </tbody>
    </table>;
}