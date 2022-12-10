import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { Fajok } from '../model/Fajok';
import { Karakter, KarakterTemplate } from '../model/Karakter';
import { Kasztok } from '../model/Kasztok';
import { DobasEredmeny } from '../model/Kocka';
import { DobasEredmenyWidget } from './DobasEredmenyWidget';
import { NamedEntitySelector } from './NamedEntitySelector';

export const KarakterTemplateWdiget: React.FC<{
    onCreate: (k: Karakter) => unknown
}> = ({ onCreate }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [template, setTemplate] = useState<KarakterTemplate>(Karakter.createTemplate());
    const [dobasok, setDobasok] = useState<Array<DobasEredmeny>>(Array(4).fill({ kocka: [], max: 0, osszeg: 0, eldobottak: [], plusz: 0 } as DobasEredmeny));
    const [karakter, setKarakter] = useState<Karakter>();

    const onFieldChange = (t: KarakterTemplate): void => {
        setKarakter(undefined);
        setDobasok(Array(4).fill({ kocka: [], max: 0, osszeg: 0, eldobottak: [], plusz: 0 } as DobasEredmeny));
        setTemplate({ ...t });
    }

    const onNameChange = (name: string): void => {
        setTemplate({ ...template, name });
        if (karakter) {
            setKarakter({ ...karakter, name });
        }
    }


    const karakterDob = () => {
        const r = Kasztok.kidob(template.kaszt);
        template.kepessegKategoriak = {
            Fizikum: r.Fizikum.osszeg,
            Ügyesség: r.Ügyesség.osszeg,
            Mentál: r.Mentál.osszeg,
            Asztrál: r.Asztrál.osszeg
        };
        setTemplate({ ...template });
        setDobasok([r.Fizikum, r.Ügyesség, r.Mentál, r.Asztrál]);
        setKarakter(Karakter.create(template));
    };

    return <>
        <button onClick={() => setOpen(true)}>Új karakter</button>
        <ReactModal style={{ content: { width: '400px', height: '200px' } }} isOpen={open} onRequestClose={() => setOpen(false)}>
            <table>
                <tbody>
                    <tr>
                        <th>Név</th>
                        <td colSpan={2}>
                            <input type='text' value={template.name} onChange={e => onNameChange(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <th>Kaszt/Faj</th>
                        <td>
                            <NamedEntitySelector nea={Kasztok} value={template.kaszt} onChange={kaszt => {
                                onFieldChange(Karakter.createTemplate({ ...template, kaszt }));

                            }} />
                        </td>
                        <td>
                            <NamedEntitySelector nea={Fajok} value={template.faj} onChange={faj => {
                                onFieldChange(Karakter.createTemplate({ ...template, faj }));
                            }} />
                        </td>
                    </tr>
                    {Object.entries(template.kaszt.kepessegDobas).map(([kategoria, dobas], idx) => <tr>
                        <th>{kategoria}</th>
                        <td>{dobas}</td>
                        <td><DobasEredmenyWidget {...dobasok[idx]} /></td>
                    </tr>)}
                </tbody>
            </table>
            <button onClick={karakterDob}>Dob</button>
            <button onClick={() => {
                if (karakter) {
                    onCreate(karakter);
                    setTemplate(Karakter.createTemplate());
                    setDobasok(Array(4).fill({ kocka: [], max: 0, osszeg: 0, eldobottak: [], plusz: 0 } as DobasEredmeny));
                }
                setOpen(false);
            }}>OK</button>
        </ReactModal>
    </>;
};