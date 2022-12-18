import React, { useState } from 'react';

import { Inventory } from '../../model/Inventory';
import { Karakter } from '../../model/Karakter';
import { ModalWindow } from '../ModalWindow';
import { GiBackpack } from 'react-icons/gi';

export const EgyebBuilderWidget: React.FC<{ karakter: Karakter, onChange: (k: Karakter) => unknown }> = ({ karakter, onChange }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [note, setNote] = useState<string>();
    const [name, setName] = useState<string>('');

    const build = () => {
        Inventory.addEgyeb(karakter, name, note);
        onChange(karakter);
        setOpen(false);
    };

    return <ModalWindow open={open} setOpen={setOpen} button={<GiBackpack />} buttonAlt='Új felszerelési tárgy'>
        <table className='bordered' style={{ textAlign: 'justify' }}>
            <tbody>
                <tr>
                    <th>Név</th>
                    <td><input type='text' value={name} onChange={e => setName(e.target.value)} /> </td>
                </tr>
                <tr>
                    <th>Leírás</th>
                    <td><textarea rows={10} value={note} style={{ width: '95%' }} onChange={e => setNote(e.target.value)} /> </td>
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
