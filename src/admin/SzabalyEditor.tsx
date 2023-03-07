import fileDownload from 'js-file-download';
import cloneDeep from 'lodash.clonedeep';
import React, { useState } from 'react';

import { Szabaly } from '../model/Szabaly';
import { ModalWindow } from '../widgets/ModalWindow';
import { Editor, ObjectEditor, ObjectEditorDescriptor } from './FormComponents';

const SZABALY_SCHEMA: ObjectEditorDescriptor = Editor.object<Szabaly>('Kaszt', {
    id: Editor.string('ID'),
    name: Editor.string('Név'),
    leiras: Editor.longString('Leírás'),
});

export const SzabalyEditor: React.FC<{}> = () => {
    const [object, setObject] = useState<Record<string, unknown>>({ fajta: 'normal' });
    const [open, setOpen] = useState<boolean>(false);
    const [idToEdit, setIdToEdit] = useState('');

    const exportLista = () => {
        fileDownload(JSON.stringify(Szabaly.lista, null, '\t'), 'szabalyok.json', 'text/json');
    }

    const startEdit = () => {
        if (idToEdit === '') {
            setObject({});
        } else {
            setObject(Szabaly.find(idToEdit) as unknown as Record<string, unknown>);
        }
    };

    const ment = () => {
        const idx = Szabaly.lista.findIndex(k => k.id === object.id);
        if (idx === -1) {
            Szabaly.lista.push(object as unknown as Szabaly);
        } else {
            Szabaly.lista[idx] = object as unknown as Szabaly;
        }
    }

    return <ModalWindow open={open} setOpen={setOpen} button='Szabály szerkesztő'>
        <select value={idToEdit} onChange={e => setIdToEdit(e.target.value)}>
            <option key='' value=''>Új</option>
            {Szabaly.lista.map(k => <option key={k.id} value={k.id}>{k.name}</option>)}
        </select>
        <button onClick={startEdit}>Szerkeszt</button>
        <ObjectEditor desc={SZABALY_SCHEMA} value={object} onChange={ob => {
            setObject(cloneDeep(ob));
        }} />
        <button onClick={ment}>Ment</button>
        <button onClick={exportLista}>Export</button>
    </ModalWindow>;
}