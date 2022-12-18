import React, { useState } from 'react';
import { NYILPUSKA_KATEGORIA } from '../../model/Fegyver';
import { Inventory } from '../../model/Inventory';
import { Karakter } from '../../model/Karakter';
import { Kepessegek } from '../../model/Kepessegek';
import { Kepzettseg } from '../../model/Kepzettseg';
import { parseKocka, printKocka } from '../../model/Kocka';
import { FixSebzesuLofegyver, Lofegyver } from '../../model/Lofegyver';
import { ModalWindow } from '../ModalWindow';
import { GiCrossbow } from 'react-icons/gi';

const EMPTY_LOFEGYVER: Partial<Lofegyver> = {
    ke: 0,
    ce: 0,
    eroPlusz: 0,
    lotav: 0,
    sebesseg: 'atlagos',
    minimumEro: 0,
    maximumEro: 0,
    sebzestipus: 'szuro',
};

export const LofegyverBuilderWidget: React.FC<{ karakter: Karakter, onChange: (k: Karakter) => unknown }> = ({ karakter, onChange }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [fegyver, setFegyver] = useState<Partial<Lofegyver>>({ ...EMPTY_LOFEGYVER });
    const [sebzes, setSebzes] = useState<string>();
    const [note, setNote] = useState<string>();

    const build = () => {
        switch (fegyver.tipus) {
            case 'nyilpuska': {
                fegyver.sebzes = parseKocka(sebzes ?? '0');
                fegyver.kategoria = NYILPUSKA_KATEGORIA;
                break;
            }
            case 'egyeb': {
                fegyver.sebzes = parseKocka(sebzes ?? '0');
                break;
            }
            case 'ij': {
                fegyver.kepesseg = 'mozgaskoordinacio';
                fegyver.alternativKepzettseg = 'ij';
            }
        }
        Inventory.addLofegyver(karakter, fegyver as Lofegyver, note);

        onChange(karakter);
        setOpen(false);
    };

    return <ModalWindow open={open} setOpen={setOpen} button={<GiCrossbow />} buttonAlt='Új lőfegyver'>
        <table className='bordered' style={{ textAlign: 'justify' }}>
            <tbody>
                <tr>
                    <th>Alapfegyver</th>
                    <td>
                        <select value={fegyver.id ?? ''} onChange={e => {
                            if (e.target.value) {
                                const alapFegyver = Lofegyver.find(e.target.value);
                                setFegyver(structuredClone(alapFegyver));
                                if (alapFegyver.tipus !== 'ij') {
                                    setSebzes(printKocka(alapFegyver.sebzes));
                                }
                            } else {
                                setFegyver({ ...EMPTY_LOFEGYVER });
                                setSebzes('0');
                            }
                        }}>
                            <option value=''>Nincs</option>
                            {Lofegyver.lista.map(f => <option value={f.id}>{f.name}</option>)}
                        </select>
                    </td>
                </tr>
                {!fegyver.id &&
                    <tr>
                        <th>Képzettség</th>
                        <td>
                            <select value={fegyver.alternativKepzettseg ?? ''} onChange={e => setFegyver({ ...fegyver, alternativKepzettseg: e.target.value })} >
                                <option disabled={!!fegyver.id} value=''>Nincs</option>
                                {Kepzettseg.keres('fegyver:').map(k => <option value={k.id.replace('fegyver:', '')}>{k.name}</option>)}
                            </select>
                        </td>
                    </tr>}
                <tr>
                    <th>Név</th>
                    <td><input type='text' value={fegyver.name ?? ''} onChange={e => setFegyver({ ...fegyver, name: e.target.value })} /> </td>
                </tr>
                <tr>
                    <th>Leírás</th>
                    <td><textarea rows={10} value={note} style={{ width: '95%' }} onChange={e => setNote(e.target.value)} /> </td>
                </tr>

                <tr>
                    <th>Tipus</th>
                    <td>
                        <select value={fegyver.tipus ?? ''} onChange={e => setFegyver({ ...fegyver, tipus: e.target.value as any })}>
                            {!fegyver.tipus && <option disabled value=''>Nincs</option>}
                            <option value='ij'>Íj</option>
                            <option value='nyilpuska'>Nyílpuska</option>
                            <option value='egyeb'>Egyéb</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>KÉ</th>
                    <td><input type='number' value={fegyver.ke ?? 0} onChange={e => setFegyver({ ...fegyver, ke: Number(e.target.value) })} /> </td>
                </tr>
                <tr>
                    <th>CÉ</th>
                    <td><input type='number' value={fegyver.ce ?? 0} onChange={e => setFegyver({ ...fegyver, ce: Number(e.target.value) })} /> </td>
                </tr>
                {fegyver.tipus !== 'ij' && <>
                    <tr>
                        <th>Sebzés</th>
                        <td><input type='text' value={sebzes ?? ''} onChange={e => setSebzes(e.target.value)} /> </td>
                    </tr>
                    <tr>
                        <th>Lőtáv</th>
                        <td><input type='number' value={(fegyver as FixSebzesuLofegyver).lotav ?? 0} onChange={e => setFegyver({ ...fegyver as FixSebzesuLofegyver, lotav: Number(e.target.value) })} /></td>
                    </tr>
                </>}
                {fegyver.tipus === 'ij' && <>
                    <tr>
                        <th>Minimum lövőerő</th>
                        <td><input type='number' value={fegyver.minimumEro ?? 0} onChange={e => setFegyver({ ...fegyver, minimumEro: Number(e.target.value) })} /></td>
                    </tr>
                    <tr>
                        <th>Maximum lövőerő</th>
                        <td><input type='number' value={fegyver.maximumEro ?? 0} onChange={e => setFegyver({ ...fegyver, maximumEro: Number(e.target.value) })} /></td>
                    </tr>
                    <tr>
                        <th>Lövőerő bónusz</th>
                        <td><input type='number' value={fegyver.eroPlusz ?? 0} onChange={e => setFegyver({ ...fegyver, eroPlusz: Number(e.target.value) })} /></td>
                    </tr>
                </>}

                <tr>
                    <th>Sebzéstipus</th>
                    <td><select value={fegyver.sebzestipus ?? ''} onChange={e => setFegyver({ ...fegyver, sebzestipus: e.target.value as any })}>
                        {!fegyver.sebzestipus && <option disabled value=''></option>}
                        <option value='szuro'>Szúró</option>
                        <option value='vago'>Vágó</option>
                        <option value='zuzo'>Zúzó</option>
                    </select>
                    </td>
                </tr>
                {fegyver.tipus === 'egyeb' && <tr>
                    <th>Képesség</th>
                    <td>
                        <select value={fegyver.kepesseg ?? ''} onChange={e => setFegyver({ ...fegyver, kepesseg: e.target.value === '' ? undefined : e.target.value } as any)}>
                            <option value=''>Nincs</option>
                            {Kepessegek.lista.map(k => <option value={k.id}>{k.name}</option>)}
                        </select>
                    </td>
                </tr>}
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
                    <td colSpan={2}>
                        <button onClick={build}>Elkészít</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </ModalWindow>;
}
