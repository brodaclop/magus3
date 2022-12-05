import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { Kepessegek } from '../model/Kepessegek';
import { Kepzettseg } from '../model/Kepzettseg';
import { Editor, ObjectEditor, ObjectEditorDescriptor } from './FormComponents';

const NORMAL_KEPZETTSEG_SCHEMA: ObjectEditorDescriptor = Editor.object('Képzettség', {
    id: Editor.string('ID'),
    name: Editor.string('Név'),
    tipus: Editor.picklist('Tipus', ['fegyver', 'fegyverkategoria', 'tudomanyos', 'harcmodor', 'harci', 'vilagi']),
    kepesseg: Editor.picklist('Képesség', Kepessegek.keys),
    leiras: Editor.longString('Leírás'),
    szintleiras: Editor.fixArray('Fokok leírása', Editor.longString('fok'), 5, 1),
    kp: Editor.fixArray('KPk', Editor.number('fok'), 5, 1),
    linked: Editor.array('Másodlagos hatás', Editor.object('Képzettség', {
        id: Editor.picklist('ID', Kepzettseg.keys),
        strength: Editor.number('KP szorzó')
    })),
})

export const KepzettsegEditor: React.FC<{}> = () => {
    const [object, setObject] = useState<Record<string, unknown>>({ fajta: 'normal' });
    const [open, setOpen] = useState<boolean>(false);
    const [idToEdit, setIdToEdit] = useState('');

    const exportLista = () => {
        console.log(JSON.stringify(Kepzettseg.__taroltLista()));
    }

    const startEdit = () => {
        if (idToEdit === '') {
            setObject({ fajta: 'normal ' });
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

    return <>
        <button onClick={() => setOpen(true)}>Képzettség szerkesztő</button>
        <ReactModal isOpen={open} onRequestClose={() => setOpen(false)}>
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
        </ReactModal>
    </>
}