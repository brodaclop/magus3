import React, { useState } from 'react';
import { Fajok } from '../model/Fajok';
import { Karakter, KarakterTemplate } from '../model/Karakter';
import { Kasztok } from '../model/Kasztok';
import { DobasEredmeny } from '../model/Kocka';
import { DobasEredmenyWidget } from './DobasEredmenyWidget';
import { NamedEntitySelector } from './NamedEntitySelector';

export const KarakterTemplateWdiget: React.FC<{
    template: KarakterTemplate,
    onChange: (t: KarakterTemplate) => unknown,
    onCreate: (k: Karakter) => unknown
}> = ({ template, onChange, onCreate }) => {
    const [dobasok, setDobasok] = useState<Array<DobasEredmeny>>(Array(4).fill({ kocka: [], max: 0, osszeg: 0, eldobottak: [], plusz: 0 } as DobasEredmeny));

    const karakterDob = () => {
        const r = Kasztok.kidob(template.kaszt);
        template.kepessegKategoriak = {
            Fizikum: r.Fizikum.osszeg,
            Ügyesség: r.Ügyesség.osszeg,
            Mentál: r.Mentál.osszeg,
            Asztrál: r.Asztrál.osszeg
        };

        setDobasok([r.Fizikum, r.Ügyesség, r.Mentál, r.Asztrál]);
        onChange({ ...template });
        onCreate(Karakter.create(template));
    }

    return <div>
        <NamedEntitySelector nea={Kasztok} value={template.kaszt} onChange={k => {
            onChange(Karakter.createTemplate({ kaszt: k, faj: template.faj }));

        }} />
        <NamedEntitySelector nea={Fajok} value={template.faj} onChange={f => {
            onChange(Karakter.createTemplate({ kaszt: template.kaszt, faj: f }));
        }} />
        <table>
            <tbody>
                {Object.entries(template.kaszt.kepessegDobas).map(([kategoria, dobas], idx) => <tr>
                    <td>{kategoria}</td>
                    <td>{dobas}</td>
                    <td><DobasEredmenyWidget {...dobasok[idx]} /></td>
                </tr>)}
            </tbody>
        </table>
        <button onClick={karakterDob}>Dob</button>
    </div>
};