import React from 'react';
import { SebzesTipus, SEBZESTIPUS_LABEL } from '../model/Fegyver';
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
            {Object.keys(SEBZESTIPUS_LABEL).map(st => <tr>
                <th>{SEBZESTIPUS_LABEL[st as SebzesTipus]}</th>
                <td>{karakter.pancel?.ob.sfe[st as SebzesTipus] ?? 0}</td>
            </tr>
            )}

        </tbody>
    </table>
}