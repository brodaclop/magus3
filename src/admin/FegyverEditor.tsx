import fileDownload from 'js-file-download';
import React, { useState } from 'react';

import { Fegyver, FegyverFlags, FegyverSebesseg, FEGYVER_KATEGORIAK, KozelharcFegyver, SebzesTipus } from '../model/Fegyver';
import { Kepessegek } from '../model/Kepessegek';
import { ModalWindow } from '../widgets/ModalWindow';
import { Editor, ObjectEditor, ObjectEditorDescriptor } from './FormComponents';

const FEGYVER_SCHEMA: ObjectEditorDescriptor = Editor.object('Fegyver', {
    fegyver: Editor.or({
        Kategorizált: Editor.object('Kategorizált', {
            id: Editor.string('ID'),
            name: Editor.string('Név'),
            sebesseg: Editor.picklist('Sebesség', FegyverSebesseg),
            sebzestipus: Editor.multiPicklist('Sebzéstipus', SebzesTipus),
            flags: Editor.picklist('Fegyvertipus', FegyverFlags),
            mgt: Editor.number('MGT'),
            kez: Editor.number('Kéz'),
            ke: Editor.number('KÉ'),
            te: Editor.number('TÉ'),
            ve: Editor.number('VÉ'),
            kategoria: Editor.picklist('Kategória', Object.keys(FEGYVER_KATEGORIAK))
        }),
        Egyedi: Editor.object('Nem kategorizált', {
            id: Editor.string('ID'),
            name: Editor.string('Név'),
            sebesseg: Editor.picklist('Sebesség', FegyverSebesseg),
            sebzestipus: Editor.multiPicklist('Sebzéstipus', SebzesTipus),
            flags: Editor.picklist('Fegyvertipus', FegyverFlags),
            mgt: Editor.number('MGT'),
            kez: Editor.number('Kéz'),
            ke: Editor.number('KÉ'),
            te: Editor.number('TÉ'),
            ve: Editor.number('VÉ'),
            kepesseg: Editor.picklist('Képesség', Kepessegek.lista),
            erobonusz: Editor.number('Sebzésbónusz minimum Izom képesség')
        })
    },
        (value: any) => {
            if ('kategoria' in value) {
                return 'Kategorizált';
            }
            if ('kepesseg' in value) {
                return 'Egyedi';
            }
            return '';
        }
    )
});

export const FegyverEditor: React.FC<{}> = () => {
    const [object, setObject] = useState<{ fegyver: Record<string, unknown> }>({ fegyver: {} });
    const [open, setOpen] = useState<boolean>(false);
    const [idToEdit, setIdToEdit] = useState('');

    const exportLista = () => {
        fileDownload(JSON.stringify(Fegyver.lista, null, '\t'), 'fegyverek.json', 'text/json');
    }

    const startEdit = () => {
        if (idToEdit === '') {
            setObject({ fegyver: {} });
        } else {
            setObject({ fegyver: Fegyver.find(idToEdit) as unknown as Record<string, unknown> });
        }
    };

    const ment = () => {
        const fegyver = object.fegyver;
        const idx = Fegyver.lista.findIndex(k => k.id === fegyver?.id);
        if (idx === -1) {
            Fegyver.lista.push(fegyver as unknown as KozelharcFegyver);
        } else {
            Fegyver.lista[idx] = fegyver as unknown as KozelharcFegyver;
        }
    }

    return <ModalWindow open={open} setOpen={setOpen} button='Fegyver szerkesztő'>
        <select value={idToEdit} onChange={e => setIdToEdit(e.target.value)}>
            <option key='' value=''>Új</option>
            {Fegyver.lista.map(k => <option key={k.id} value={k.id}>{k.name}</option>)}
        </select>
        <button onClick={startEdit}>Szerkeszt</button>
        <ObjectEditor desc={FEGYVER_SCHEMA} value={object} onChange={ob => {
            setObject(structuredClone(ob));
        }} />
        <button onClick={ment}>Ment</button>
        <button onClick={exportLista}>Export</button>
    </ModalWindow>;
}