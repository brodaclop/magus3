import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { v4 } from 'uuid';
import { Inventory } from '../../model/Inventory';
import { Karakter } from '../../model/Karakter';
import { Pancel } from '../../model/Pancel';
import { PancelBlokk, PancelBuilder } from '../../model/PancelBuilder';

export const PancelBuilderWidget: React.FC<{ karakter: Karakter, onChange: (k: Karakter) => unknown }> = ({ karakter, onChange }) => {
    const [open, setOpen] = useState(false);

    const [name, setName] = useState('');
    const [alap, setAlap] = useState<number>(0);
    const [minoseg, setMinoseg] = useState<number>(0);
    const [runa, setRuna] = useState<number>(0);
    const [fem, setFem] = useState<number>(0);
    const [igazitas, setIgazitas] = useState<number>(0);
    const [note, setNote] = useState<string>();

    const createPancel = (): [Pancel, string] => {
        const alapBlokk = PancelBuilder.alapok[alap];
        let notes = `Alap: ${alapBlokk.name}\nMinőség: ${PancelBuilder.minoseg[minoseg].name}\nRúna: ${PancelBuilder.runak[runa].name}\n`;
        const egyebek: Array<PancelBlokk> = [
            PancelBuilder.minoseg[minoseg],
            PancelBuilder.runak[runa]
        ];
        if (alapBlokk.anyag === 'fem') {
            notes += `Anyag: ${PancelBuilder.femek[fem].name}\n`
            egyebek.push(PancelBuilder.femek[fem]);
        }
        const igazitasBlokk = PancelBuilder.igazitas[igazitas];
        return [PancelBuilder.build(v4(), name, alapBlokk, igazitasBlokk, egyebek), notes];
    }

    const build = () => {
        const [pancel, notes] = createPancel();
        Inventory.addPancel(karakter, pancel, `${note ?? ''}\n${notes}`);
        onChange(karakter);
        setOpen(false);
    };

    const renderBlokk = (blokk: PancelBlokk) => <td>
        MGT: {blokk.mgt} SFÉ: {blokk.sfe.szuro} Szúró / {blokk.sfe.vago} Vágó / {blokk.sfe.zuzo} Zúzó
    </td>

    return <>
        <button onClick={() => setOpen(true)}>Új páncél</button>
        <ReactModal style={{ content: { width: '50em', height: '30em' } }} isOpen={open} onRequestClose={() => setOpen(false)} >
            <table className='bordered' style={{ textAlign: 'justify' }}>
                <tbody>
                    <tr>
                        <th>Név</th>
                        <td colSpan={2}><input type='text' value={name} style={{ width: '95%' }} onChange={e => setName(e.target.value)} /> </td>
                    </tr>
                    <tr>
                        <th>Leírás</th>
                        <td colSpan={2}><textarea rows={10} value={note} style={{ width: '95%' }} onChange={e => setNote(e.target.value)} /> </td>
                    </tr>
                    <tr>
                        <th>Alap:</th>
                        <td>
                            <select value={alap} onChange={e => setAlap(Number(e.target.value))}>
                                {PancelBuilder.alapok.map((a, i) => <option value={i}>{a.name}</option>)}
                            </select>
                        </td>
                        {renderBlokk(PancelBuilder.alapok[alap])}
                    </tr>
                    <tr>
                        <th>Minőség:</th>
                        <td>
                            <select value={minoseg} onChange={e => setMinoseg(Number(e.target.value))}>
                                {PancelBuilder.minoseg.map((a, i) => <option value={i}>{a.name}</option>)}
                            </select>
                        </td>
                        {renderBlokk(PancelBuilder.minoseg[minoseg])}
                    </tr>
                    {PancelBuilder.alapok[alap].anyag === 'fem' && <tr>
                        <th>Fém</th>
                        <td>
                            <select value={fem} onChange={e => setFem(Number(e.target.value))}>
                                {PancelBuilder.femek.map((a, i) => <option value={i}>{a.name}</option>)}
                            </select>
                        </td>
                        {renderBlokk(PancelBuilder.femek[fem])}
                    </tr>}
                    <tr>
                        <th>Rúna:</th>
                        <td>
                            <select value={runa} onChange={e => setRuna(Number(e.target.value))}>
                                {PancelBuilder.runak.map((a, i) => <option value={i}>{a.name}</option>)}
                            </select>
                        </td>
                        {renderBlokk(PancelBuilder.runak[runa])}
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
                        {renderBlokk(createPancel()[0])}
                    </tr>
                </tbody>
            </table>
        </ReactModal>
    </>;
}