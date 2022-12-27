import React from 'react';
import { InventoryFegyver } from '../model/Inventory';
import { Karakter, MegfogottFegyver } from '../model/Karakter';

export const FegyverSelection: React.FC<{
    kez: 0 | 1,
    karakter: Karakter,
    onChange: (karakter: Karakter) => unknown
}> = ({ karakter, kez, onChange }) => {

    const inv = kez === 0 ? [Karakter.okolharc(), ...karakter.inventory] : karakter.inventory;
    const available: Array<MegfogottFegyver> = inv.filter(i => Karakter.megfoghato(karakter, kez, i as MegfogottFegyver)) as Array<InventoryFegyver>;
    const emptyEnabled = kez === 1 && Karakter.megfoghato(karakter, kez, undefined);
    const current = karakter.kezek[kez];

    return <select onChange={e => {
        const id = e.target.value;
        const fegyver = available.find(f => f.id === id);
        karakter.kezek[kez] = fegyver;
        onChange(karakter);
    }} value={current?.id ?? ''}>
        {emptyEnabled && <option key='' value=''>Üres kéz</option>}
        {available.map(f => <option key={f.id} value={f.id}>{f.ob.name}</option>)}
    </select>
}