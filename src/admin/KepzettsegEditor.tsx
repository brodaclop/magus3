import fileDownload from 'js-file-download';
import React, { useState } from 'react';
import { Kepessegek } from '../model/Kepessegek';
import { Kepzettseg, KepzettsegTipus } from '../model/Kepzettseg';
import { ModalWindow } from '../widgets/ModalWindow';
import { Editor, ObjectEditor, ObjectEditorDescriptor } from './FormComponents';

const NORMAL_KEPZETTSEG_SCHEMA: ObjectEditorDescriptor = Editor.object('Képzettség', {
    id: Editor.string('ID'),
    name: Editor.string('Név'),
    tipus: Editor.picklist('Tipus', KepzettsegTipus),
    kepesseg: Editor.picklist('Képesség', Kepessegek.lista),
    leiras: Editor.longString('Leírás'),
    szintleiras: Editor.fixArray('Fokok leírása', Editor.longString('fok'), 5, 1),
    kp: Editor.fixArray('KPk', Editor.number('fok'), 5, 1),
    linked: Editor.array('Másodlagos hatás', Editor.object('Képzettség', {
        id: Editor.picklist('ID', Kepzettseg.lista),
        strength: Editor.number('KP szorzó')
    })),
})

export const KepzettsegEditor: React.FC<{}> = () => {
    const [object, setObject] = useState<Record<string, unknown>>({ fajta: 'normal' });
    const [open, setOpen] = useState<boolean>(false);
    const [idToEdit, setIdToEdit] = useState('');

    const exportLista = () => {
        fileDownload(JSON.stringify(Kepzettseg.__taroltLista(), null, '\t'), 'kepzettsegek.json', 'text/json');
    }

    const startEdit = () => {
        if (idToEdit === '') {
            setObject({ fajta: 'normal' });
        } else {
            setObject(Kepzettseg.find(idToEdit) as unknown as Record<string, unknown>);
        }
    };

    const ment = () => {
        const idx = Kepzettseg.lista.findIndex(k => k.id === object.id);
        if (idx === -1) {
            Kepzettseg.lista.push(object as unknown as Kepzettseg);
        } else {
            Kepzettseg.lista[idx] = object as unknown as Kepzettseg;
        }
    }

    return <ModalWindow open={open} setOpen={setOpen} button='Képzettség szerkesztő'>
        <select value={idToEdit} onChange={e => setIdToEdit(e.target.value)}>
            <option value=''>Új</option>
            {Kepzettseg.__taroltLista().map(k => <option value={k.id}>{k.name}</option>)}
        </select>
        <button onClick={startEdit}>Szerkeszt</button>
        <ObjectEditor desc={NORMAL_KEPZETTSEG_SCHEMA} value={object} onChange={ob => {
            setObject(structuredClone(ob));
        }} />
        <button onClick={ment}>Ment</button>
        <button onClick={exportLista}>Export</button>
    </ModalWindow>;
}