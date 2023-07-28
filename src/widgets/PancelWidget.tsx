import React from 'react';
import { SebzesTipus } from '../model/Fegyver';
import { InventoryPancel } from '../model/Inventory';
import { Karakter } from '../model/Karakter';
import { InventorySelector } from './InventorySelector';


export const PancelWidget: React.FC<{ karakter: Karakter, onChange: (k: Karakter) => unknown }> = ({ karakter, onChange }) => {

    return <table className='bordered'>
        <thead>
            <tr>
                <th>
                    Páncél
                </th>
                <th colSpan={2}>
                    <InventorySelector
                        canBeEmpty
                        karakter={karakter}
                        tipus='pancel'
                        value={karakter.pancel}
                        emptyName='Páncél nélkül'
                        onChange={i => {
                            karakter.pancel = i as InventoryPancel;
                            onChange(karakter);
                        }} />
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th colSpan={2}>MGT</th>
                <td>{karakter.pancel?.ob.mgt ?? 0}</td>
            </tr>
            <tr>
                <th rowSpan={4}>SFÉ</th>
            </tr>
            {SebzesTipus.map(st => <tr>
                <th>{st.name}</th>
                <td>{karakter.pancel?.ob.sfe[st.id] ?? 0}</td>
            </tr>
            )}
            <tr>
                <th>Sérülés</th>
                <td>{karakter.pancel && <input type='number' value={karakter.pancel.ob.serules} onChange={e => {
                    if (karakter.pancel) {
                        const serules = Math.max(0, Math.floor(Number(e.target.value)));
                        karakter.pancel.ob.serules = serules;
                        onChange(karakter);
                    }
                }} />}</td>
            </tr>

        </tbody>
    </table>
}