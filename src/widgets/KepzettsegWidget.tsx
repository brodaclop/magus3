import React, { useState } from 'react';
import { Karakter } from '../model/Karakter';
import { KarakterCalcResult } from '../model/KarakterCalculator';
import { Kepzettseg } from '../model/Kepzettseg';

export const KepzettsegWidget: React.FC<{ karakter: Karakter, calc: KarakterCalcResult, onChange: (karakter: Karakter) => unknown }> = ({ karakter, onChange, calc }) => {
    const [ujkepzettseg, setUjKepzettseg] = useState<string>('');
    const felvesz = () => {
        Kepzettseg.kpEloszt(calc.kepzettsegek.normal, karakter.szint[karakter.szint.length - 1].kepzettsegek.normal, calc.kepessegek, Kepzettseg.find(ujkepzettseg), 1, true);
        karakter.kp--;
        onChange(karakter);
    };
    return <table style={{ border: '3px solid black', borderCollapse: 'collapse' }}>
        <thead>
            <tr>
                <th><h3>Képzettségek</h3></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    KP: {karakter.kp} <select onChange={e => setUjKepzettseg(e.target.value)} value={ujkepzettseg}>
                        {!ujkepzettseg && <option value=''></option>}
                        {Kepzettseg.lista.map(k => <option value={k.id}>{k.name}</option>)}
                    </select>
                    <button disabled={(!ujkepzettseg) || (karakter.kp < 1)} onClick={felvesz}>+1 KP</button>
                </td>
            </tr>
            <tr>
                <td>
                    <p>%: {karakter.szazalek}</p>
                </td>
            </tr>
            {calc.kepzettsegek.normal.map(k => <tr>
                <td style={{ border: '1px solid black' }}>
                    {k.kepzettseg.name}: {k.fok} ({k.kp}/{Kepzettseg.kpFokhoz(calc.kepessegek, k.kepzettseg, k.fok + 1)} kp)
                </td>
            </tr>)}

        </tbody>
    </table>;
}