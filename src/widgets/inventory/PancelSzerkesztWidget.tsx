import React, { useEffect, useState } from 'react';
import { InventoryPancel } from '../../model/Inventory';
import { Karakter } from '../../model/Karakter';
import { PancelBlokk, PancelBuilder } from '../../model/PancelBuilder';
import { ModalWindow } from '../ModalWindow';
import { FaEdit } from 'react-icons/fa';

export const PancelSzerkesztWidget: React.FC<{ karakter: Karakter, onChange: (k: Karakter) => unknown, pancel: InventoryPancel }> = ({ karakter, onChange, pancel }) => {
    const [open, setOpen] = useState(false);

    const [igazitas, setIgazitas] = useState<number>(0);
    const [note, setNote] = useState<string>();

    useEffect(() => {
        setNote(pancel.notes);
    }, [pancel]);

    const createPancel = () => PancelBuilder.igazit(pancel.ob, PancelBuilder.igazitas[igazitas]);

    const build = () => {
        pancel.ob = createPancel();
        pancel.notes = note;

        onChange(karakter);
        setOpen(false);
    };

    const renderBlokk = (blokk: PancelBlokk) => <td>
        MGT: {blokk.mgt} SFÉ: {blokk.sfe.szuro} Szúró / {blokk.sfe.vago} Vágó / {blokk.sfe.zuzo} Zúzó
    </td>

    return <ModalWindow open={open} setOpen={setOpen} button={<FaEdit />} buttonAlt='Szerkeszt'>
        <table className='bordered' style={{ textAlign: 'justify' }}>
            <tbody>
                <tr>
                    <th>Páncél:</th>
                    <td>{pancel.ob.name}</td>
                    <td>{renderBlokk(PancelBuilder.removeIgazit(pancel.ob))}</td>
                </tr>
                <tr>
                    <th>Leírás</th>
                    <td colSpan={2}><textarea rows={10} value={note} style={{ width: '95%' }} onChange={e => setNote(e.target.value)} /> </td>
                </tr>
                <tr>
                    <th>Méretre igazítás</th>
                    <td>
                        <select value={igazitas} onChange={e => setIgazitas(Number(e.target.value))}>
                            {PancelBuilder.igazitas.map((a, i) => <option value={i}>{a.name}</option>)}
                        </select>
                    </td>
                    {renderBlokk(PancelBuilder.igazitas[igazitas])}
                </tr>
                <tr>
                    <th>Összesen</th>
                    <td>
                        <button onClick={build}>Módosít</button>
                    </td>
                    {renderBlokk(createPancel())}
                </tr>
            </tbody>
        </table>
    </ModalWindow>
        ;
}