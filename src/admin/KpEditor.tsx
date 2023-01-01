import fileDownload from 'js-file-download';
import Tooltip from 'rc-tooltip';
import React, { useState } from 'react';
import { Kepessegek } from '../model/Kepessegek';
import { Kepzettseg, NormalKepzettseg } from '../model/Kepzettseg';
import { printNumber } from '../model/util';
import { KepzettsegLeiras } from '../widgets/KepzettsegLeiras';
import { ModalWindow } from '../widgets/ModalWindow';


export const KpEditor: React.FC<{}> = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [kepessegValue, setKepessegValue] = useState(15);
    const [minimumFok, setMinimumFok] = useState(0);
    const [kepzettsegek, setKepzettsegek] = useState(Kepzettseg.lista.filter(k => k.fajta === 'normal') as Array<NormalKepzettseg>);

    const exportLista = () => {
        fileDownload(JSON.stringify(Kepzettseg.__taroltLista(), null, '\t'), 'kepzettsegek.json', 'text/json');
    }

    const kepessegek = Object.fromEntries(Kepessegek.keys.map(k => [k, kepessegValue]));

    const osszKp = (kepzettseg: NormalKepzettseg, fok: number): number => {
        return Array(fok + 1).fill(undefined)
            .reduce((acc, _, idx) => acc + (idx >= minimumFok ? Kepzettseg.kpFokhoz(kepessegek, kepzettseg, idx + 1) : 0), 0);
    }

    const addLinked = (kepzettseg: NormalKepzettseg): number => {
        return kepzettseg.linked?.map(l => l.strength).reduce((acc, curr) => acc + curr, 0) ?? 0;
    }

    const findLinking = (kepzettseg: NormalKepzettseg): Array<NormalKepzettseg> => Kepzettseg.lista.filter(k => k.fajta === 'normal' && k.linked?.some(linked => linked.id === kepzettseg.id)) as Array<NormalKepzettseg>;


    return <ModalWindow open={open} setOpen={setOpen} button='KP szerkesztő'>
        <div><label>Képesség értéke: <input type='number' value={kepessegValue} onChange={e => setKepessegValue(Number(e.target.value))} /> </label></div>
        <div><label>Minimum fok: <input type='number' value={minimumFok} onChange={e => setMinimumFok(Number(e.target.value))} /> </label></div>
        <table className='bordered'>
            <thead>
                <tr>
                    <th>Képzettség</th>
                    {Array(5).fill(undefined).map((_, i) => <th>{i + 1}. fok</th>)}
                    <th>Segít</th>
                    <th>Segítők</th>
                </tr>
            </thead>
            <tbody>
                {kepzettsegek.map(k => <tr>
                    <th><KepzettsegLeiras kepzettseg={k} /></th>
                    {Array(5).fill(undefined).map((_, fok) => <td>
                        {osszKp(k, fok)}
                        {!k.__generated && <div>
                            <input type='number' style={{ width: '2rem' }} value={k.kp[fok]} onChange={e => {
                                k.kp[fok] = Number(e.target.value);
                                setKepzettsegek([...kepzettsegek]);
                            }} />
                        </div>}
                    </td>)}
                    <td>
                        <Tooltip overlay={<ul>
                            {k.linked?.map(l => <li>{Kepzettseg.find(l.id).name}: {l.strength}</li>)}
                        </ul>}>
                            <span>{printNumber(addLinked(k))}</span>
                        </Tooltip>
                    </td>
                    <td>
                        <Tooltip overlay={<ul>
                            {findLinking(k).map(l => <li>{Kepzettseg.find(l.id).name}: {l.linked.find(link => link.id === k.id)?.strength}</li>)}
                        </ul>}>
                            <span>{printNumber(
                                findLinking(k).map(l => l.linked.find(link => link.id === k.id)?.strength ?? 0)
                                    .reduce((acc, curr) => acc + curr, 0))
                            }</span>
                        </Tooltip>
                    </td>
                </tr>)}
            </tbody>
        </table>

        <button onClick={exportLista}>Export</button>
    </ModalWindow>;
}