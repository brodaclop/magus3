import React from 'react';
import { Fegyver } from '../model/Fegyver';
import { Harcmuveszet } from '../model/Harcmuveszet';
import { Karakter, MegfogottFegyver } from '../model/Karakter';
import { KarakterCalcResult } from '../model/KarakterCalculator';

export const FegyverSelection: React.FC<{
    kez: 0 | 1,
    karakter: Karakter,
    calc: KarakterCalcResult,
    onChange: (karakter: Karakter) => unknown
}> = ({ karakter, calc, kez, onChange }) => {

    const harcmuveszetek = Harcmuveszet.fegyverek.filter(f => Fegyver.kepzettseg(calc.kepzettsegek.normal, f)[1] > 0).map(f => ({ id: f.id, tipus: 'pusztakez', ob: f }));
    const inv = kez === 0 ? [{ ...Karakter.okolharc() }, ...harcmuveszetek, ...karakter.inventory] : karakter.inventory;
    const available = inv.filter(i => Karakter.megfoghato(karakter, kez, i as MegfogottFegyver));
    const emptyEnabled = kez === 1 && Karakter.megfoghato(karakter, kez, undefined);
    const current = karakter.kezek[kez];

    return <select onChange={e => {
        const id = e.target.value;
        const fegyver = available.find(f => f.id === id);
        karakter.kezek[kez] = fegyver as MegfogottFegyver;
        onChange(karakter);
    }} value={current?.id ?? ''}>
        {emptyEnabled && <option key='' value=''>Üres kéz</option>}
        {available.map(f => <option key={f.id} value={f.id}>{f.ob.name}</option>)}
    </select>
}