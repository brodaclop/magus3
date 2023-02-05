import fileDownload from 'js-file-download';
import React, { useState } from 'react';
import { Kepzettseg, NormalKepzettseg } from '../model/Kepzettseg';
import { arrayName, arraySort } from '../model/util';
import { ModalWindow } from '../widgets/ModalWindow';
import { Magia } from '../model/Magia';
import { VarazslatLeiras } from '../widgets/entities/VarazslatLeiras';
import { Calculation } from '../model/Calculation';
import { CalculationWidget } from '../widgets/CalculationWidget';
import { NamedEntitySelector } from '../widgets/NamedEntitySelector';


export const MpEditor: React.FC<{}> = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [kepzettseg, setKepzettseg] = useState<NormalKepzettseg>();
    const [fok, setFok] = useState<number>(0);
    const [varazslatok, setVarazslatok] = useState(Magia.lista);

    const exportLista = () => {
        fileDownload(JSON.stringify(Magia.lista, null, '\t'), 'varazslatok.json', 'text/json');
    }

    const displayList = arraySort(arraySort(varazslatok.filter(v => (!kepzettseg || v.kepzettsegek?.includes(kepzettseg.id as any)) && (!fok || v.fok === fok)), ob => ob.name), ob => String(ob.fok));


    return <ModalWindow open={open} setOpen={setOpen} button='MP szerkesztő'>
        <div><label>Képzettség:
            <NamedEntitySelector
                nea={Kepzettseg}
                value={kepzettseg}
                onChange={v => setKepzettseg(v as NormalKepzettseg)}
                filter={v => v.id.startsWith('magia:')}
                allowEmpty />
        </label></div>
        <div><label>Fok: <input type='number' value={fok} onChange={e => setFok(Number(e.target.value))} /> </label></div>

        <table className='bordered'>
            <thead>
                <tr>
                    <th colSpan={8}>Varázslatok</th>
                </tr>
                <tr>
                    <th>Név</th>
                    <th>MP</th>
                    <th>Varázslás ideje</th>
                    <th>Hatótáv</th>
                    <th>Időtartam</th>
                    <th>Mentődobás</th>
                    <th>Képzettség</th>
                    <th>Kategóriák</th>
                </tr>
            </thead>
            <tbody>
                {displayList.map(v => {
                    if ('ke' in v) {
                        return {
                            ...v,
                            ke: Calculation.value('Varázslat', v.ke)
                        }
                    } else {
                        return v;
                    }
                }).map(v => <tr>
                    <td>
                        <VarazslatLeiras v={v} />
                    </td>
                    <td><input type='number' value={v.mp} onChange={e => {
                        v.mp = Number(e.target.value);
                        setVarazslatok([...varazslatok]);
                    }} /> </td>
                    <td>{'ke' in v ? <CalculationWidget calculation={v.ke} /> : v.varazslasIdeje}</td>
                    <td>{Magia.formatRange(v.range)} </td>
                    <td>{v.idotartam}</td>
                    <td>{v.save ? arrayName(Magia.mentodobasok, v.save) : '?????'} </td>
                    <td>
                        <div style={{ whiteSpace: 'pre-wrap' }}>{v.kepzettsegek ? v.kepzettsegek.map(k => Kepzettseg.name(k)).join('\n') : '?????'}</div>
                        <div>
                            <label>
                                <input type='number' value={v.fok} onChange={e => {
                                    v.fok = Number(e.target.value);
                                    setVarazslatok([...varazslatok]);
                                }} />.fok</label>
                        </div>
                    </td>
                    <td style={{ whiteSpace: 'pre-wrap' }}>{v.kategoriak?.map(k => arrayName(Magia.kategoriak, k))?.join('\n')}</td>
                </tr>)}
            </tbody>
        </table>;

        <button onClick={exportLista}>Export</button>
    </ModalWindow>;
}