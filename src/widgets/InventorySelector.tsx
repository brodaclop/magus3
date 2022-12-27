import React from 'react';
import { InventoryItem } from '../model/Inventory';
import { Karakter } from '../model/Karakter';

export const InventorySelector: React.FC<{
    karakter: Karakter;
    tipus: InventoryItem['tipus'],
    value?: InventoryItem,
    onChange: (value?: InventoryItem) => unknown,
    emptyName?: string,
    canBeEmpty?: boolean
}> = ({ karakter, tipus, value, onChange, canBeEmpty, emptyName }) => {
    const { inventory } = karakter;
    return <select value={value?.id ?? ''} onChange={e => onChange(inventory.find(i => i.id === e.target.value))}>
        {(value === undefined || canBeEmpty) && <option key='' disabled={!canBeEmpty} value=''>{emptyName ?? '----'}</option>}
        {inventory.filter(i => i.tipus === tipus).map(i => <option key={i.id} value={i.id}>{i.ob.name}</option>)}
    </select>
}