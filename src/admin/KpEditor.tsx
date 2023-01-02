import fileDownload from 'js-file-download';
import Tooltip from 'rc-tooltip';
import React, { useState } from 'react';
import { Kepessegek } from '../model/Kepessegek';
import { Kepzettseg, NormalKepzettseg } from '../model/Kepzettseg';
import { constructArray, printNumber, sumArray } from '../model/util';
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
        return sumArray(constructArray(fok + 1, idx => (idx >= minimumFok ? Kepzettseg.kpFokhoz(kepessegek, kepzettseg, idx + 1) : 0)));
    }

    const addLinked = (kepzettseg: NormalKepzettseg): number => {
        return sumArray(kepzettseg.linked, l => l.strength);
    }

    const findLinking = (kepzettseg: NormalKepzettseg): Array<NormalKepzettseg> => Kepzettseg.lista.filter(k => k.fajta === 'normal' && k.linked?.some(linked => linked.id === kepzettseg.id)) as Array<NormalKepzettseg>;


    return <ModalWindow open={open} setOpen={setOpen} button='KP szerkesztő'>
        <div><label>Képesség értéke: <input type='number' value={kepessegValue} onChange={e => setKepessegValue(Number(e.target.value))} /> </label></div>
        <div><label>Minimum fok: <input type='number' value={minimumFok} onChange={e => setMinimumFok(Number(e.target.value))} /> </label></div>
        <table className='bordered'>
            <thead>
                <tr>
                    <th>Képzettség</th>
                    {constructArray(5, i => <th>{i + 1}. fok</th>)}
                    <th>Segít</th>
                    <th>Segítők</th>
                </tr>
            </thead>
            <tbody>
                {kepzettsegek.map(k => <tr>
                    <th><KepzettsegLeiras kepzettseg={k} /></th>
                    {constructArray(5, fok => <td>
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
                            {k.linked?.map(l => <li>{Kepzettseg.name(l.id)}: {l.strength}</li>)}
                        </ul>}>
                            <span>{printNumber(addLinked(k))}</span>
                        </Tooltip>
                    </td>
                    <td>
                        <Tooltip overlay={<ul>
                            {findLinking(k).map(l => <li>{Kepzettseg.name(l.id)}: {l.linked.find(link => link.id === k.id)?.strength}</li>)}
                        </ul>}>
                            <span>
                                {printNumber(sumArray(findLinking(k).map(l => l.linked.find(link => link.id === k.id)?.strength ?? 0)))}
                            </span>
                        </Tooltip>
                    </td>
                </tr>)}
            </tbody>
        </table>

        <button onClick={exportLista}>Export</button>
    </ModalWindow>;
}