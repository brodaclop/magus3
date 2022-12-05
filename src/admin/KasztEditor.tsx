import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { KasztInfo, Kasztok } from '../model/Kasztok';
import { Kepzettseg } from '../model/Kepzettseg';
import { Editor, ObjectEditor, ObjectEditorDescriptor } from './FormComponents';

const KASZT_SCHEMA: ObjectEditorDescriptor = Editor.object('Kaszt', {
    id: Editor.string('ID'),
    name: Editor.string('Név'),
    kepessegDobas: Editor.object('Képességek', {
        Fizikum: Editor.picklist('Fizikum', ['Legendás', 'Jó', 'Átlagos', 'Gyenge']),
        Ügyesség: Editor.picklist('Fizikum', ['Legendás', 'Jó', 'Átlagos', 'Gyenge']),
        Mentál: Editor.picklist('Fizikum', ['Legendás', 'Jó', 'Átlagos', 'Gyenge']),
        Asztrál: Editor.picklist('Fizikum', ['Legendás', 'Jó', 'Átlagos', 'Gyenge']),
    }),
    epAlap: Editor.number('ÉP alap'),
    fpAlap: Editor.number('FP alap'),
    fpPerSzint: Editor.number('FP/szint'),
    harcertekAlap: Editor.object('Alap harcérték', {
        ke: Editor.number('KÉ'),
        te: Editor.number('TÉ'),
        ve: Editor.number('VÉ'),
        ce: Editor.number('CÉ'),
    }),
    harcertek: Editor.object('Kötelező HM', {
        ke: Editor.number('KÉ'),
        te: Editor.number('TÉ'),
        ve: Editor.number('VÉ'),
        ce: Editor.number('CÉ'),
    }),
    hm: Editor.number('Szabad HM'),
    kasztSpec: Editor.array('Speciális tulajdonságok', Editor.picklist('spec', ['ketSzintenkentKe', 'ketSzintenkentSebzes']), 1),
    kpAlap: Editor.number('Alap KP'),
    kpPerSzint: Editor.number('KP/szint'),
    szazalekPerSzint: Editor.number('Százalékos képzettség/szint'),
    kepzettsegek: Editor.array('Képzettségek', Editor.array('Szint', Editor.or({
        'Fix': Editor.object('képzettség', {
            kepzettsegId: Editor.picklist('Képzettség', Kepzettseg.keys),
            fok: Editor.number('Fok'),
            honnan: Editor.number('Minimum fok')
        }),
        'Választható': Editor.object('képzettség', {
            kepzettsegId: Editor.string('Képzettség ID'),
            name: Editor.string('Név'),
            fok: Editor.number('Fok'),
            honnan: Editor.number('Minimum fok')
        }),
    },
        (value: any) => {
            if (('kepzettsegId' in value) && Kepzettseg.keys.includes(value.kepzettsegId)) {
                return 'Fix';
            }
            if (('name' in value) && value.name !== '') {
                return 'Választható';
            }
            return '';
        }
    ), 1))
});

export const KasztEditor: React.FC<{}> = () => {
    const [object, setObject] = useState<Record<string, unknown>>({ fajta: 'normal' });
    const [open, setOpen] = useState<boolean>(false);
    const [idToEdit, setIdToEdit] = useState('');

    const exportLista = () => {
        console.log(JSON.stringify(Kasztok.lista));
    }

    const startEdit = () => {
        if (idToEdit === '') {
            setObject({});
        } else {
            setObject(Kasztok.find(idToEdit) as unknown as Record<string, unknown>);
        }
    };

    const ment = () => {
        const idx = Kasztok.lista.findIndex(k => k.id === object.id);
        if (idx === -1) {
            Kasztok.lista.push(object as unknown as KasztInfo);
        } else {
            Kasztok.lista[idx] = object as unknown as KasztInfo;
        }
    }

    return <>
        <button onClick={() => setOpen(true)}>Kaszt szerkesztő</button>
        <ReactModal isOpen={open} onRequestClose={() => setOpen(false)}>
            <select value={idToEdit} onChange={e => setIdToEdit(e.target.value)}>
                <option value=''>Új</option>
                {Kasztok.lista.map(k => <option value={k.id}>{k.name}</option>)}
            </select>
            <button onClick={startEdit}>Szerkeszt</button>
            <ObjectEditor desc={KASZT_SCHEMA} value={object} onChange={ob => {
                setObject(structuredClone(ob));
            }} />
            <button onClick={ment}>Ment</button>
            <button onClick={exportLista}>Export</button>
        </ReactModal>
    </>
}