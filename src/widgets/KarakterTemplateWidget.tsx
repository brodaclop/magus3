import React, { useState } from 'react';

import { Fajok } from '../model/Fajok';
import { Karakter, KarakterTemplate } from '../model/Karakter';
import { Kasztok } from '../model/Kasztok';
import { KepessegKategoria, KepessegKategoriaSorrend } from '../model/Kepessegek';
import { DobasEredmeny } from '../model/Kocka';
import { DobasEredmenyWidget } from './DobasEredmenyWidget';
import { FajLeiras } from './entities/FejLeiras';
import { KasztLeiras } from './entities/KasztLeiras';
import { KasztSelectorWidget } from './KasztSelectorWidget';
import { ModalWindow } from './ModalWindow';
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

    const onJellemChange = (jellem: string): void => {
        setTemplate({ ...template, jellem });
        if (karakter) {
            setKarakter({ ...karakter, jellem });
        }
    }


    const karakterDob = () => {
        const r = Kasztok.kidob(Kasztok.kasztInfo(template.kaszt, 0));
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

    const kaszt = Kasztok.kasztInfo(template.kaszt, 0);

    return <ModalWindow button='Új karakter' open={open} setOpen={setOpen}>
        <div className='justifiedFlexRow'>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Név</th>
                            <td>
                                <input type='text' value={template.name} onChange={e => onNameChange(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <th>Jellem</th>
                            <td>
                                <input type='text' value={template.jellem} onChange={e => onJellemChange(e.target.value)} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <table>
                    <tbody>
                        {Object.entries(kaszt.kepessegDobas).sort(([a], [b]) => KepessegKategoriaSorrend[a as KepessegKategoria] - KepessegKategoriaSorrend[b as KepessegKategoria]).map(([kategoria, dobas], idx) => <tr>
                            <th>{kategoria}</th>
                            <td>{dobas}</td>
                            <td><DobasEredmenyWidget {...dobasok[idx]} /></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                <button
                    disabled={!karakter || !karakter.name || !karakter.jellem}
                    onClick={() => {
                        if (karakter) {
                            onCreate(karakter);
                            setTemplate(Karakter.createTemplate());
                            setDobasok(Array(4).fill({ kocka: [], max: 0, osszeg: 0, eldobottak: [], plusz: 0 } as DobasEredmeny));
                        }
                        setOpen(false);
                    }}>Elkészít</button>
                <button onClick={karakterDob}>Dob</button>
            </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <div style={{ flexBasis: '50%' }}>
                Faj: <NamedEntitySelector nea={Fajok} value={template.faj} onChange={faj => {
                    onFieldChange(Karakter.createTemplate({ ...template, faj }));
                }} />

                <FajLeiras faj={template.faj} inline />
            </div>
            <div style={{ flexBasis: '50%' }}>
                Kaszt: <KasztSelectorWidget kaszt={template.kaszt} onChange={kaszt => {
                    onFieldChange(Karakter.createTemplate({ ...template, kaszt }));
                }} />
                <KasztLeiras kaszt={kaszt} inline />
            </div>
        </div>
    </ModalWindow>;
};