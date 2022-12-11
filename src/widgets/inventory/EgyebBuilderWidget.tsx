import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { v4 } from 'uuid';
import { Inventory } from '../../model/Inventory';
import { Karakter } from '../../model/Karakter';

export const EgyebBuilderWidget: React.FC<{ karakter: Karakter, onChange: (k: Karakter) => unknown }> = ({ karakter, onChange }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [note, setNote] = useState<string>();
    const [name, setName] = useState<string>('');

    const build = () => {
        Inventory.addEgyeb(karakter, name, note);
        onChange(karakter);
        setOpen(false);
    };

    return <>
        <button onClick={() => setOpen(true)}>Új tárgy</button>
        <ReactModal style={{ content: { width: '50em', height: '30em' } }} isOpen={open} onRequestClose={() => setOpen(false)} >
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
        </ReactModal>
    </>;
}
