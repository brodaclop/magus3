import React, { useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { ReactNode } from 'react-markdown/lib/ast-to-react';
import { v4 } from 'uuid';
import { Hatas } from '../model/Hatas';
import { Karakter } from '../model/Karakter';
import { Kepessegek } from '../model/Kepessegek';
import { Magia } from '../model/Magia';
import { Pszi } from '../model/Pszi';
import { mergeToArray } from '../model/util';
import { PsziDiszciplinaLeiras } from './entities/PsziDiszciplinaLeiras';
import { VarazslatLeiras } from './entities/VarazslatLeiras';
import { ModalWindow } from './ModalWindow';
import { NamedEntitySelector } from './NamedEntitySelector';


export const HatasBuilderWidget: React.FC<{ id?: string; karakter: Karakter, onChange: (k: Karakter) => unknown, children?: ReactNode }> = ({ id, karakter, onChange, children }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [hatas, setHatas] = useState<Hatas>({
        aktiv: true,
        id: id ?? v4(),
        name: '',
        note: ''
    });

    useEffect(() => {
        setHatas(karakter.hatasok.find(h => h.id === id) ?? {
            aktiv: true,
            id: id ?? v4(),
            name: '',
            note: ''
        });
    }, [id, karakter]);

    const build = () => {
        mergeToArray(karakter.hatasok, hatas, h => h.id);
        onChange(karakter);
        setOpen(false);
    };

    return <ModalWindow open={open} setOpen={setOpen} button={children ?? <CiEdit />} buttonAlt='Hatás szerkesztése'>
        <div className='bordered'>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <table className='bordered'>
                    <tbody>
                        <tr>
                            <th>Név</th>
                            <td><input type='text' value={hatas.name} onChange={e => setHatas({ ...hatas, name: e.target.value })} /> </td>
                        </tr>
                        <tr>
                            <th>Aktív</th>
                            <td><input type='checkbox' checked={hatas.aktiv} onChange={e => setHatas({ ...hatas, aktiv: e.target.checked })} /> </td>
                        </tr>
                        <tr>
                            <th>Leírás</th>
                            <td><textarea rows={10} value={hatas.note} style={{ width: '95%' }} onChange={e => setHatas({ ...hatas, note: e.target.value })} /> </td>
                        </tr>
                    </tbody>
                </table>
                <table className='bordered'>
                    <thead>
                        <tr>
                            <th colSpan={2}>Képességek</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Kepessegek.lista.map(k => <tr>
                            <th>{k.name}</th>
                            <td>
                                <input type='number' value={hatas.kepesseg?.[k.id]} onChange={e => {
                                    const kepesseg = hatas.kepesseg ?? {};
                                    kepesseg[k.id] = Number(e.target.value);
                                    setHatas({ ...hatas, kepesseg });
                                }} />
                            </td>
                        </tr>)}
                    </tbody>
                </table>
                <table className='bordered'>
                    <thead>
                        <tr>
                            <th colSpan={2}>Harcértékek</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>KÉ</th>
                            <td><input type='number' value={hatas.harcertek?.ke} onChange={e => {
                                const harcertek = hatas.harcertek ?? {};
                                harcertek.ke = Number(e.target.value);
                                setHatas({ ...hatas, harcertek });
                            }} /></td>
                        </tr>
                        <tr>
                            <th>TÉ</th>
                            <td><input type='number' value={hatas.harcertek?.te} onChange={e => {
                                const harcertek = hatas.harcertek ?? {};
                                harcertek.te = Number(e.target.value);
                                setHatas({ ...hatas, harcertek });
                            }} /></td>
                        </tr>
                        <tr>
                            <th>VÉ</th>
                            <td><input type='number' value={hatas.harcertek?.ve} onChange={e => {
                                const harcertek = hatas.harcertek ?? {};
                                harcertek.ve = Number(e.target.value);
                                setHatas({ ...hatas, harcertek });
                            }} /></td>
                        </tr>
                        <tr>
                            <th>CÉ</th>
                            <td><input type='number' value={hatas.harcertek?.ce} onChange={e => {
                                const harcertek = hatas.harcertek ?? {};
                                harcertek.ce = Number(e.target.value);
                                setHatas({ ...hatas, harcertek });
                            }} /></td>
                        </tr>
                        <tr>
                            <th>Sebzés</th>
                            <td><input type='number' value={hatas.harcertek?.sebzes} onChange={e => {
                                const harcertek = hatas.harcertek ?? {};
                                harcertek.sebzes = Number(e.target.value);
                                setHatas({ ...hatas, harcertek });
                            }} /></td>
                        </tr>
                    </tbody>
                </table>
                <table className='bordered'>
                    <thead>
                        <tr>
                            <th colSpan={2}>Pszi diszciplinák</th>
                        </tr>
                        <tr>
                            <th colSpan={2}>
                                <NamedEntitySelector nea={Pszi} onChange={item => {
                                    if (item) {
                                        const psziDiszciplina = hatas.psziDiszciplina ? [...hatas.psziDiszciplina] : [];;
                                        psziDiszciplina.push(item.id);
                                        setHatas({ ...hatas, psziDiszciplina });
                                    }
                                }} />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {hatas.psziDiszciplina?.map(d => <tr>
                            <td><PsziDiszciplinaLeiras d={Pszi.find(d)} /> </td>
                            <td><button onClick={() => {
                                const psziDiszciplina = hatas.psziDiszciplina!.filter(i => i !== d);
                                setHatas({ ...hatas, psziDiszciplina });
                            }}>x</button></td>
                        </tr>)}
                    </tbody>
                </table>
                <table className='bordered'>
                    <thead>
                        <tr>
                            <th colSpan={2}>Varázslatok</th>
                        </tr>
                        <tr>
                            <th colSpan={2}>
                                <NamedEntitySelector nea={Magia} onChange={item => {
                                    if (item) {
                                        const varazslat = hatas.varazslat ? [...hatas.varazslat] : [];;
                                        varazslat.push(item.id);
                                        setHatas({ ...hatas, varazslat });
                                    }
                                }} />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {hatas.varazslat?.map(v => <tr>
                            <td><VarazslatLeiras v={Magia.find(v)} /> </td>
                            <td><button onClick={() => {
                                const varazslat = hatas.varazslat!.filter(i => i !== v);
                                setHatas({ ...hatas, varazslat });
                            }}>x</button></td>
                        </tr>)}
                    </tbody>
                </table>
                <table className='bordered'>
                    <thead>
                        <tr>
                            <th colSpan={2}>Mágiaellenállás</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Asztrál</th>
                            <td><input type='number' value={hatas.mana} onChange={e => setHatas({ ...hatas, asztral: Number(e.target.value) })} /> </td>
                        </tr>
                        <tr>
                            <th>Mentál</th>
                            <td><input type='number' value={hatas.manaPerSzint} onChange={e => setHatas({ ...hatas, mental: Number(e.target.value) })} /> </td>
                        </tr>
                    </tbody>
                </table>
                <table className='bordered'>
                    <thead>
                        <tr>
                            <th colSpan={2}>Egyéb</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>MP</th>
                            <td><input type='number' value={hatas.mana} onChange={e => setHatas({ ...hatas, mana: Number(e.target.value) })} /> </td>
                        </tr>
                        <tr>
                            <th>MP/szint</th>
                            <td><input type='number' value={hatas.manaPerSzint} onChange={e => setHatas({ ...hatas, manaPerSzint: Number(e.target.value) })} /> </td>
                        </tr>
                        <tr>
                            <th>ΨP</th>
                            <td><input type='number' value={hatas.pszi} onChange={e => setHatas({ ...hatas, pszi: Number(e.target.value) })} /> </td>
                        </tr>
                        <tr>
                            <th>ΨP/szint</th>
                            <td><input type='number' value={hatas.psziPerSzint} onChange={e => setHatas({ ...hatas, psziPerSzint: Number(e.target.value) })} /> </td>
                        </tr>
                        <tr>
                            <th>ÉP</th>
                            <td><input type='number' value={hatas.ep} onChange={e => setHatas({ ...hatas, ep: Number(e.target.value) })} /> </td>
                        </tr>
                        <tr>
                            <th>FP</th>
                            <td><input type='number' value={hatas.fp} onChange={e => setHatas({ ...hatas, fp: Number(e.target.value) })} /> </td>
                        </tr>
                        <tr>
                            <th>FP/szint</th>
                            <td><input type='number' value={hatas.fpPerSzint} onChange={e => setHatas({ ...hatas, fpPerSzint: Number(e.target.value) })} /> </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button style={{ width: '100%' }} onClick={build}>OK</button>
        </div>
    </ModalWindow>;
}
