import React from 'react';
import { KozelharcFegyver, KOZELHARCI_FEGYVEREK } from '../model/Fegyver';

export const FegyverSelection: React.FC<{ enabled: boolean, current: KozelharcFegyver | undefined, onChange: (fegyver: KozelharcFegyver | undefined) => unknown }> = ({ enabled, current, onChange }) => {
    return <select disabled={!enabled} onChange={e => onChange(KOZELHARCI_FEGYVEREK.find(f => f.nev === e.target.value))} value={current?.nev ?? ''}>
        <option value=''>Üres kéz</option>
        {KOZELHARCI_FEGYVEREK.map(f => <option value={f.nev}>{f.nev}</option>)}
    </select>
}