import fileDownload from 'js-file-download';
import React, { useState } from 'react';

import { KasztInfo, KasztKepesseg, Kasztok, KasztSpecFlags, ManaMennyiseg } from '../model/Kasztok';
import { Kepessegek } from '../model/Kepessegek';
import { Kepzettseg } from '../model/Kepzettseg';
import { MagiaKategoriak } from '../model/Magia';
import { ModalWindow } from '../widgets/ModalWindow';
import { Editor, ObjectEditor, ObjectEditorDescriptor } from './FormComponents';

const KASZT_SCHEMA: ObjectEditorDescriptor = Editor.object<KasztInfo>('Kaszt', {
    id: Editor.string('ID'),
    name: Editor.string('Név'),
    fokaszt: Editor.picklist('Főkaszt', Kasztok.lista),
    kepessegDobas: Editor.object('Képességek', {
        Fizikum: Editor.picklist('Fizikum', KasztKepesseg),
        Ügyesség: Editor.picklist('Ügyesség', KasztKepesseg),
        Mentál: Editor.picklist('Mentál', KasztKepesseg),
        Asztrál: Editor.picklist('Asztrál', KasztKepesseg),
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
    kasztSpec: Editor.multiPicklist('Speciális tulajdonságok', KasztSpecFlags),
    kpAlap: Editor.number('Alap KP'),
    kpPerSzint: Editor.number('KP/szint'),
    szazalekPerSzint: Editor.number('Százalékos képzettség/szint'),
    kepzettsegek: Editor.array('Képzettségek', Editor.array('Szint', Editor.or({
        'Fix': Editor.object('képzettség', {
            kepzettsegId: Editor.picklist('Képzettség', Kepzettseg.lista),
            fok: Editor.number('Fok'),
            honnan: Editor.number('Minimum fok')
        }),
        'Választható': Editor.object('képzettség', {
            kepzettsegId: Editor.picklist('Képzettség prefix', [...new Set(Kepzettseg.keys.filter(id => id.includes(':')).map(id => id.split(':')[0]))]),
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
    ), 1)),
    mana: Editor.object<KasztInfo['mana']>('Mana', {
        kepesseg: Editor.picklist('Képesség', Kepessegek.lista),
        mennyiseg: Editor.picklist('Mana mennyisége', ManaMennyiseg),
    }),
    magiaKategoriak: Editor.multiPicklist('Mágia kategóriák', MagiaKategoriak)
});

export const KasztEditor: React.FC<{}> = () => {
    const [object, setObject] = useState<Record<string, unknown>>({ fajta: 'normal' });
    const [open, setOpen] = useState<boolean>(false);
    const [idToEdit, setIdToEdit] = useState('');

    const exportLista = () => {
        fileDownload(JSON.stringify(Kasztok.lista, null, '\t'), 'kasztok.json', 'text/json');
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

    return <ModalWindow open={open} setOpen={setOpen} button='Kaszt szerkesztő'>
        <select value={idToEdit} onChange={e => setIdToEdit(e.target.value)}>
            <option key='' value=''>Új</option>
            {Kasztok.lista.map(k => <option key={k.id} value={k.id}>{k.name}</option>)}
        </select>
        <button onClick={startEdit}>Szerkeszt</button>
        <ObjectEditor desc={KASZT_SCHEMA} value={object} onChange={ob => {
            setObject(structuredClone(ob));
        }} />
        <button onClick={ment}>Ment</button>
        <button onClick={exportLista}>Export</button>
    </ModalWindow>;

}