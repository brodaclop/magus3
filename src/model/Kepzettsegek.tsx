import { Kepesseg } from "./Kepessegek";

export type Kepzettseg = 'Fegyverhasználat' | 'Mászás';
export type KepzettsegType = 'normal' | 'szazalekos';


export interface KepzettsegBase {
    id: Kepzettseg;
    name: string;
    hasFlavour: boolean;
    alapKepesseg: Kepesseg;
    leiras: string;
}

export interface NormalKepzettseg extends KepzettsegBase {
    tipus: 'normal';
    szintLeiras: [string, string, string, string, string];
}

export interface SzazalekosKepzettseg extends KepzettsegBase {
    tipus: 'szazalekos';
}

// const KEPZETTSEGEK: Array<NormalKepzettseg | SzazalekosKepzettseg> = [
//     {
//         id: 'Fegyverhasználat',
//         name: 'Fegyverhasználat',
//         tipus: 'normal',
//         hasFlavour: true
//     }
// ]