import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { InventoryPancel } from '../../model/Inventory';
import { Karakter } from '../../model/Karakter';
import { PancelBlokk, PancelBuilder } from '../../model/PancelBuilder';

export const PancelIgazitasWidget: React.FC<{ karakter: Karakter, onChange: (k: Karakter) => unknown, pancel: InventoryPancel }> = ({ karakter, onChange, pancel }) => {
    const [open, setOpen] = useState(false);

    const [igazitas, setIgazitas] = useState<number>(0);

    const createPancel = () => PancelBuilder.igazit(pancel.ob, PancelBuilder.igazitas[igazitas]);

    const build = () => {
        pancel.ob = createPancel();

        onChange(karakter);
        setOpen(false);
    };

    const renderBlokk = (blokk: PancelBlokk) => <td>
        MGT: {blokk.mgt} SFÉ: {blokk.sfe.szuro} Szúró / {blokk.sfe.vago} Vágó / {blokk.sfe.zuzo} Zúzó
    </td>

    return <>
        <button onClick={() => setOpen(true)}>Igazít</button>
        <ReactModal style={{ content: { width: '50em', height: '30em' } }} isOpen={open} onRequestClose={() => setOpen(false)} >
            <table className='bordered' style={{ textAlign: 'justify' }}>
                <tbody>
                    <tr>
                        <th>Páncél:</th>
                        <td>{pancel.ob.name}</td>
                        <td>{renderBlokk(PancelBuilder.removeIgazit(pancel.ob))}</td>
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
                            <button onClick={build}>Elkészít</button>
                        </td>
                        {renderBlokk(createPancel())}
                    </tr>
                </tbody>
            </table>
        </ReactModal>
    </>;
}