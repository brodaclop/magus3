import React, { useState } from 'react';

import { v4 } from 'uuid';
import { Inventory } from '../../model/Inventory';
import { Karakter } from '../../model/Karakter';
import { Pancel } from '../../model/Pancel';
import { PancelBlokk, PancelBuilder } from '../../model/PancelBuilder';
import { ModalWindow } from '../ModalWindow';
import { GiAbdominalArmor } from 'react-icons/gi';

export const PancelBuilderWidget: React.FC<{ karakter: Karakter, onChange: (k: Karakter) => unknown }> = ({ karakter, onChange }) => {
    const [open, setOpen] = useState(false);

    const [name, setName] = useState('');
    const [alap, setAlap] = useState<number>(0);
    const [minoseg, setMinoseg] = useState<number>(0);
    const [runa, setRuna] = useState<number>(0);
    const [fem, setFem] = useState<number>(0);
    const [igazitas, setIgazitas] = useState<number>(0);
    const [note, setNote] = useState<string>();
    const [mode, setMode] = useState<'assemble' | 'fixed'>('assemble');
    const [fixed, setFixed] = useState<PancelBlokk>({ name: 'fixed', mgt: 0, sfe: { szuro: 0, zuzo: 0, vago: 0 } });

    const createPancel = (): [Pancel, string] => {
        if (mode === 'assemble') {
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
        } else {
            let notes = `Alapértékek:\n\tSFÉ: ${fixed.sfe.szuro} Szúró / ${fixed.sfe.vago} Vágó / ${fixed.sfe.vago} Zúzó\n\tMGT: ${fixed.mgt}\nRúna: ${PancelBuilder.runak[runa].name}\n`;
            const egyebek: Array<PancelBlokk> = [
                PancelBuilder.runak[runa]
            ];
            const igazitasBlokk = PancelBuilder.igazitas[igazitas];
            return [PancelBuilder.build(v4(), name, fixed, igazitasBlokk, egyebek), notes];
        }
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

    return <ModalWindow open={open} setOpen={setOpen} button={<GiAbdominalArmor />} buttonAlt='Új páncél'>
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
                    <th></th>
                    <td>Kirakós: <input type='radio' checked={mode === 'assemble'} onChange={() => setMode('assemble')} /></td>
                    <td>Fix: <input type='radio' checked={mode === 'fixed'} onChange={() => setMode('fixed')} /></td>
                </tr>
                {mode === 'fixed' && <>
                    <tr>
                        <th rowSpan={4}>Értékek</th>
                        <td>MGT</td>
                        <td><input type='number' value={fixed.mgt} onChange={e => setFixed({ ...fixed, mgt: Number(e.target.value) })} /></td>
                    </tr>
                    <tr>
                        <td rowSpan={3}>SFÉ</td>
                        <td>Szúró <input type='number' value={fixed.sfe.szuro} onChange={e => setFixed({ ...fixed, sfe: { ...fixed.sfe, szuro: Number(e.target.value) } })} /></td>
                    </tr>
                    <tr>
                        <td>Vágó <input type='number' value={fixed.sfe.vago} onChange={e => setFixed({ ...fixed, sfe: { ...fixed.sfe, vago: Number(e.target.value) } })} /></td>
                    </tr>
                    <tr>
                        <td>Zúzó <input type='number' value={fixed.sfe.zuzo} onChange={e => setFixed({ ...fixed, sfe: { ...fixed.sfe, zuzo: Number(e.target.value) } })} /></td>
                    </tr>

                </>}
                {mode === 'assemble' && <>
                    <tr>
                        <th>Alap:</th>
                        <td>
                            <select value={alap} onChange={e => setAlap(Number(e.target.value))}>
                                {PancelBuilder.alapok.map((a, i) => <option key={i} value={i}>{a.name}</option>)}
                            </select>
                        </td>
                        {renderBlokk(PancelBuilder.alapok[alap])}
                    </tr>
                    <tr>
                        <th>Minőség:</th>
                        <td>
                            <select value={minoseg} onChange={e => setMinoseg(Number(e.target.value))}>
                                {PancelBuilder.minoseg.map((a, i) => <option key={i} value={i}>{a.name}</option>)}
                            </select>
                        </td>
                        {renderBlokk(PancelBuilder.minoseg[minoseg])}
                    </tr>
                    {PancelBuilder.alapok[alap].anyag === 'fem' && <tr>
                        <th>Fém</th>
                        <td>
                            <select value={fem} onChange={e => setFem(Number(e.target.value))}>
                                {PancelBuilder.femek.map((a, i) => <option key={i} value={i}>{a.name}</option>)}
                            </select>
                        </td>
                        {renderBlokk(PancelBuilder.femek[fem])}
                    </tr>}
                </>}
                <tr>
                    <th>Rúna:</th>
                    <td>
                        <select value={runa} onChange={e => setRuna(Number(e.target.value))}>
                            {PancelBuilder.runak.map((a, i) => <option key={i} value={i}>{a.name}</option>)}
                        </select>
                    </td>
                    {renderBlokk(PancelBuilder.runak[runa])}
                </tr>
                <tr>
                    <th>Méretre igazítás</th>
                    <td>
                        <select value={igazitas} onChange={e => setIgazitas(Number(e.target.value))}>
                            {PancelBuilder.igazitas.map((a, i) => <option key={i} value={i}>{a.name}</option>)}
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
    </ModalWindow>;
}