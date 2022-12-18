import React, { useEffect, useState } from 'react';

import { InventoryItem } from '../../model/Inventory';
import { Karakter } from '../../model/Karakter';
import { ModalWindow } from '../ModalWindow';
import { FaEdit } from 'react-icons/fa';

export const InventorySzerkesztWidget: React.FC<{ karakter: Karakter, onChange: (k: Karakter) => unknown, item: InventoryItem }> = ({ karakter, onChange, item }) => {
    const [open, setOpen] = useState(false);

    const [note, setNote] = useState<string>();

    useEffect(() => {
        setNote(item.notes);
    }, [item]);


    const build = () => {
        item.notes = note;

        onChange(karakter);
        setOpen(false);
    };

    return <ModalWindow open={open} setOpen={setOpen} button={<FaEdit />} buttonAlt='Szerkeszt'>
        <table className='bordered' style={{ textAlign: 'justify' }}>
            <tbody>
                <tr>
                    <th>Tárgy:</th>
                    <td>{item.ob.name}</td>
                </tr>
                <tr>
                    <th>Leírás</th>
                    <td><textarea rows={10} value={note} style={{ width: '95%' }} onChange={e => setNote(e.target.value)} /> </td>
                </tr>
                <tr>
                    <td colSpan={2}><button onClick={build}>Módosít</button></td>
                </tr>
            </tbody>
        </table>
    </ModalWindow>;
}