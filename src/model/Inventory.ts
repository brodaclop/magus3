import cloneDeep from "lodash.clonedeep";
import { v4 } from "uuid";
import { KozelharcFegyver } from "./Fegyver";
import { Karakter } from "./Karakter";
import { Lofegyver } from "./Lofegyver";
import { Pancel } from "./Pancel";
import { PancelBlokk } from "./PancelBuilder";

export interface InventoryItemBase {
    id: string;
    quantity: number;
    notes?: string;
}

export interface InventoryFegyver extends InventoryItemBase {
    tipus: 'fegyver';
    ob: KozelharcFegyver;
}

export interface InventoryLofegyver extends InventoryItemBase {
    tipus: 'lofegyver';
    ob: Lofegyver;
}

export interface InventoryPancel extends InventoryItemBase {
    tipus: 'pancel';
    ob: Pancel;
}

export interface InventoryEgyeb extends InventoryItemBase {
    tipus: 'egyeb';
    penz?: boolean;
    ob: {
        name: string;
    }
}

export type InventoryItem = InventoryFegyver | InventoryLofegyver | InventoryPancel | InventoryEgyeb;

export const Inventory = {
    calculateCurrentSfe: (pancel?: Pancel): PancelBlokk['sfe'] => {
        if (!pancel) {
            return { szuro: 0, vago: 0, zuzo: 0 };
        }
        return {
            szuro: Math.max(0, pancel.sfe.szuro - (pancel.serules ?? 0)),
            vago: Math.max(0, pancel.sfe.vago - (pancel.serules ?? 0)),
            zuzo: Math.max(0, pancel.sfe.zuzo - (pancel.serules ?? 0)),
        }
    },
    addPancel: (karakter: Karakter, pancel: Pancel, notes?: string) => karakter.inventory.push({
        id: v4(),
        tipus: 'pancel',
        ob: cloneDeep(pancel),
        quantity: 1,
        notes
    }),
    addFegyver: (karakter: Karakter, fegyver: KozelharcFegyver, notes?: string) => karakter.inventory.push({
        id: v4(),
        tipus: 'fegyver',
        ob: cloneDeep(fegyver),
        quantity: 1,
        notes
    }),
    addLofegyver: (karakter: Karakter, fegyver: Lofegyver, notes?: string) => karakter.inventory.push({
        id: v4(),
        tipus: 'lofegyver',
        ob: cloneDeep(fegyver),
        quantity: 1,
        notes
    }),
    addEgyeb: (karakter: Karakter, name: string, penz: boolean, notes?: string) => karakter.inventory.push({
        id: v4(),
        tipus: 'egyeb',
        ob: { name },
        penz,
        quantity: 1,
        notes
    }),


}