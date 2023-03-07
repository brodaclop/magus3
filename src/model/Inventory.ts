import cloneDeep from "lodash.clonedeep";
import { v4 } from "uuid";
import { KozelharcFegyver } from "./Fegyver";
import { Karakter } from "./Karakter";
import { Lofegyver } from "./Lofegyver";
import { Pancel } from "./Pancel";

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
    ob: {
        name: string;
    }
}

export type InventoryItem = InventoryFegyver | InventoryLofegyver | InventoryPancel | InventoryEgyeb;

export const Inventory = {
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
    addEgyeb: (karakter: Karakter, name: string, notes?: string) => karakter.inventory.push({
        id: v4(),
        tipus: 'egyeb',
        ob: { name },
        quantity: 1,
        notes
    }),


}