import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { Karakter } from '../model/Karakter';
import { PancelBlokk, PancelBuilder } from '../model/PancelBuilder';

export const PancelBuilderWidget: React.FC<{ karakter: Karakter, onChange: (k: Karakter) => unknown }> = ({ karakter, onChange }) => {
    const [open, setOpen] = useState(false);

    const [alap, setAlap] = useState<number>(0);
    const [minoseg, setMinoseg] = useState<number>(0);
    const [fem, setFem] = useState<number>(0);
    const [igazitas, setIgazitas] = useState<number>(0);

    const createPancel = () => {
        const alapBlokk = PancelBuilder.alapok[alap];
        const igazitasBlokk = PancelBuilder.igazitas[igazitas];
        const egyebek: Array<PancelBlokk> = [
            PancelBuilder.minoseg[minoseg]
        ];
        if (alapBlokk.anyag === 'fem') {
            egyebek.push(PancelBuilder.femek[fem]);
        }
        return PancelBuilder.combine('ujpancel', alapBlokk, igazitasBlokk, egyebek);
    }

    const build = () => {
        karakter.pancel = createPancel();
        onChange(karakter);
        setOpen(false);
    };

    const renderBlokk = (blokk: PancelBlokk) => <td>
        MGT: {blokk.mgt} SFÉ: {blokk.sfe.szuro} Szúró / {blokk.sfe.vago} Vágó / {blokk.sfe.zuzo} Zúzó
    </td>

    return <>
        <button onClick={() => setOpen(true)}>Szerkeszt</button>
        <ReactModal style={{ content: { width: '650px', height: '120px' } }} isOpen={open} onRequestClose={() => setOpen(false)} >
            <table style={{ border: '3px solid black', borderCollapse: 'collapse', textAlign: 'justify' }}>
                <tbody>
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
                    <tr>
                        <th>Méretre igazítás</th>
                        <td>
                            <select value={igazitas} onChange={e => setIgazitas(Number(e.target.value))}>
                                {PancelBuilder.igazitas.map((a, i) => <option value={i}>{a.name}</option>)}
                            </select>
                        </td>
                        {renderBlokk(PancelBuilder.igazitas[igazitas])}
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