import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { v4 } from 'uuid';
import { Fegyver, KozelharcFegyver, FEGYVER_KATEGORIAK } from '../../model/Fegyver';
import { Karakter } from '../../model/Karakter';
import { Kepessegek } from '../../model/Kepessegek';
import { parseKocka, printKocka } from '../../model/Kocka';

export const FegyverBuilderWidget: React.FC<{ karakter: Karakter, onChange: (k: Karakter) => unknown }> = ({ karakter, onChange }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [fegyver, setFegyver] = useState<Partial<KozelharcFegyver>>({});
    const [sebzes, setSebzes] = useState<string>();

    const build = () => {
        karakter.inventory.push({
            id: v4(),
            tipus: 'fegyver',
            ob: {
                ...fegyver as KozelharcFegyver,
                sebzes: parseKocka(sebzes ?? '0')
            },
            quantity: 1
        });
        onChange(karakter);
        setOpen(false);
    };

    return <>
        <button onClick={() => setOpen(true)}>Új fegyver</button>
        <ReactModal style={{ content: { width: '50em', height: '30em' } }} isOpen={open} onRequestClose={() => setOpen(false)} >
            <table className='bordered' style={{ textAlign: 'justify' }}>
                <tbody>
                    <tr>
                        <th>Alapfegyver</th>
                        <td>
                            <select value={fegyver.id ?? ''} onChange={e => {
                                const alapFegyver = Fegyver.find(e.target.value);
                                setFegyver(structuredClone(alapFegyver));
                                setSebzes(printKocka(alapFegyver.sebzes));
                            }}>
                                {!fegyver && <option value='' disabled></option>}
                                {Fegyver.lista.filter(f => f.flags !== 'pusztakez').map(f => <option value={f.id}>{f.name}</option>)}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>Név</th>
                        <td><input type='text' value={fegyver.name ?? ''} onChange={e => setFegyver({ ...fegyver, name: e.target.value })} /> </td>
                    </tr>
                    <tr>
                        <th>KÉ</th>
                        <td><input type='number' value={fegyver.ke ?? 0} onChange={e => setFegyver({ ...fegyver, ke: Number(e.target.value) })} /> </td>
                    </tr>
                    <tr>
                        <th>TÉ</th>
                        <td><input type='number' value={fegyver.te ?? 0} onChange={e => setFegyver({ ...fegyver, te: Number(e.target.value) })} /> </td>
                    </tr>
                    <tr>
                        <th>VÉ</th>
                        <td><input type='number' value={fegyver.ve ?? 0} onChange={e => setFegyver({ ...fegyver, ve: Number(e.target.value) })} /> </td>
                    </tr>
                    <tr>
                        <th>Sebzés</th>
                        <td><input type='text' value={sebzes ?? ''} onChange={e => setSebzes(e.target.value)} /> </td>
                    </tr>
                    <tr>
                        <th>Sebzéstipus</th>
                        <td><select multiple value={typeof fegyver.sebzestipus === 'string' ? [fegyver.sebzestipus] : fegyver.sebzestipus ?? []} onChange={e => setFegyver({ ...fegyver, sebzestipus: Array.from(e.target.selectedOptions, o => o.value) as any })}>
                            <option value='szuro'>Szúró</option>
                            <option value='vago'>Vágó</option>
                            <option value='zuzo'>Zúzó</option>
                        </select>
                        </td>
                    </tr>
                    {!fegyver.kepesseg && <tr>
                        <th>Kategória</th>
                        <td>
                            <select value={fegyver.kategoria?.id ?? ''} onChange={e => setFegyver({ ...fegyver, kategoria: FEGYVER_KATEGORIAK[e.target.value] as any })}>
                                <option value=''>Nincs</option>
                                {Object.entries(FEGYVER_KATEGORIAK).map(([id, kat]) => <option value={id}>{kat.nev}</option>)}
                            </select>
                        </td>
                    </tr>}
                    {!fegyver.kategoria && <tr>
                        <th>Képesség</th>
                        <td>
                            <select value={fegyver.kepesseg ?? ''} onChange={e => setFegyver({ ...fegyver, kepesseg: e.target.value === '' ? undefined : e.target.value } as any)}>
                                <option value=''>Nincs</option>
                                {Kepessegek.lista.map(k => <option value={k.id}>{k.name}</option>)}
                            </select>
                        </td>
                    </tr>}
                    {fegyver.kepesseg && <tr>
                        <th>Erőbónusz Izom minimum</th>
                        <td>
                            <td><input type='number' value={fegyver.erobonusz ?? 0} onChange={e => setFegyver({ ...fegyver, erobonusz: Number(e.target.value) })} /> </td>
                        </td>
                    </tr>}
                    <tr>
                        <th>MGT</th>
                        <td><input type='number' value={fegyver.mgt ?? 0} onChange={e => setFegyver({ ...fegyver, mgt: Number(e.target.value) })} /> </td>
                    </tr>
                    <tr>
                        <th>Kéz</th>
                        <td>
                            <select value={fegyver.kez ?? 1} onChange={e => setFegyver({ ...fegyver, kez: Number(e.target.value) as any })} >
                                <option value='0.5'>0.5</option>
                                <option value='1'>1</option>
                                <option value='1.5'>1.5</option>
                                <option value='2'>2</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>Sebesség</th>
                        <td>
                            <select value={fegyver.sebesseg ?? 'atlagos'} onChange={e => setFegyver({ ...fegyver, sebesseg: e.target.value as any })} >
                                <option value='gyors'>Gyors</option>
                                <option value='atlagos'>Átlagos</option>
                                <option value='lassu'>Lassú</option>
                                <option value='3'>3 körönként</option>
                                <option value='4'>4 körönként</option>
                                <option value='5'>5 körönként</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>Specialitás</th>
                        <td>
                            <select value={fegyver.flags ?? ''} onChange={e => setFegyver({ ...fegyver, flags: e.target.value || undefined as any })} >
                                <option value=''>Nincs</option>
                                <option value='buckler'>Kis pajzs/Hárítófegyver</option>
                                <option value='nagy-pajzs'>Nagy pajzs</option>
                                <option value='slan-kard'>Slan kard</option>
                                <option value='slan-tor'>Slan tőr</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <button onClick={build}>Elkészít</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </ReactModal>
    </>;
}
