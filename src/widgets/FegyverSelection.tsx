import React from 'react';
import { KozelharcFegyver } from '../model/Fegyver';

export const FegyverSelection: React.FC<{ fegyverek: Array<KozelharcFegyver>, emptyEnabled: boolean, current: KozelharcFegyver | undefined, onChange: (fegyver: KozelharcFegyver | undefined) => unknown }> = ({ fegyverek, emptyEnabled, current, onChange }) => {
    return <select onChange={e => onChange(fegyverek.find(f => f.nev === e.target.value))} value={current?.nev ?? ''}>
        {emptyEnabled && <option value=''>Üres kéz</option>}
        {fegyverek.map(f => <option value={f.nev}>{f.nev}</option>)}
    </select>
}