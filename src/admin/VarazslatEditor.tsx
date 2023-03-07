import fileDownload from 'js-file-download';
import cloneDeep from 'lodash.clonedeep';
import React, { useState } from 'react';
import { Kepzettseg } from '../model/Kepzettseg';
import { GyorsVarazslat, LassuVarazslat, Magia, MagiaKategoriak, Mentodobasok, Varazslat } from '../model/Magia';
import { ModalWindow } from '../widgets/ModalWindow';
import { ChoiceEditor, ChoiceEditorDescriptor, Editor } from './FormComponents';

const VARAZSLAT_SCHEMA: ChoiceEditorDescriptor = Editor.or({
    gyors: Editor.object<GyorsVarazslat>('Varázslat', {
        id: Editor.string('ID'),
        name: Editor.string('Név'),
        kategoriak: Editor.multiPicklist('Kategória', MagiaKategoriak),
        mp: Editor.number('MP'),
        idotartam: Editor.string('Időtartam'),
        ke: Editor.number('KÉ'),
        kepzettsegek: Editor.multiPicklist('Képzettség', Kepzettseg.keres('magia:')),
        fok: Editor.number('Fok'),
        range: Editor.string('Hatótáv'),
        save: Editor.picklist('Mentő', Mentodobasok),
        leiras: Editor.longString('Leírás')
    }),
    lassu: Editor.object<LassuVarazslat>('Varázslat', {
        id: Editor.string('ID'),
        name: Editor.string('Név'),
        kategoriak: Editor.multiPicklist('Kategória', MagiaKategoriak),
        mp: Editor.number('MP'),
        idotartam: Editor.string('Időtartam'),
        varazslasIdeje: Editor.string('Varázslás ideje'),
        kepzettsegek: Editor.multiPicklist('Képzettség', Kepzettseg.keres('magia:')),
        fok: Editor.number('Fok'),
        range: Editor.string('Hatótáv'),
        save: Editor.picklist('Mentő', Mentodobasok),
        leiras: Editor.longString('Leírás')
    }),
}, (value: any) => {
    if ('ke' in value && typeof value.ke === 'number') {
        return 'gyors';
    }
    if ('varazslasIdeje' in value && value.varazslasIdeje !== '') {
        return 'lassu';
    }
    return '';
});

export const VarázslatEditor: React.FC<{}> = () => {
    const [object, setObject] = useState<Record<string, unknown>>({});
    const [open, setOpen] = useState<boolean>(false);
    const [idToEdit, setIdToEdit] = useState('');

    const exportLista = () => {
        fileDownload(JSON.stringify(Magia.lista, null, '\t'), 'varazslatok.json', 'text/json');
    }

    const startEdit = () => {
        if (idToEdit === '') {
            setObject({ fajta: 'normal' });
        } else {
            setObject(Magia.find(idToEdit) as unknown as Record<string, unknown>);
        }
    };

    const ment = () => {
        const idx = Magia.lista.findIndex(k => k.id === object.id);
        if (idx === -1) {
            Magia.lista.push(object as unknown as Varazslat);
        } else {
            Magia.lista[idx] = object as unknown as Varazslat;
        }
    }

    return <ModalWindow open={open} setOpen={setOpen} button='Varázslat szerkesztő'>
        <select value={idToEdit} onChange={e => setIdToEdit(e.target.value)}>
            <option key='' value=''>Új</option>
            {Magia.lista.map(k => <option key={k.id} value={k.id}>{k.name}</option>)}
        </select>
        <button onClick={startEdit}>Szerkeszt</button>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <ChoiceEditor desc={VARAZSLAT_SCHEMA} value={object} onChange={ob => {
                setObject(cloneDeep(ob) as any);
            }} />
        </div>

        <button onClick={ment}>Ment</button>
        <button onClick={exportLista}>Export</button>
    </ModalWindow>;
}