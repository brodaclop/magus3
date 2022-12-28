import { Harcertek } from "./Harcertek";
import { NamedEntity, namedEntityArray } from "./util";

export interface Faj extends NamedEntity {
    kepessegek: Partial<Record<string, number>>;
    harcertekAlap?: Partial<Harcertek>;
    infralatas?: number;
}

const FAJOK: Array<Faj> = [
    {
        id: 'ember',
        name: 'Ember',
        kepessegek: {}
    },
    {
        id: 'elf',
        name: 'Elf',
        kepessegek: {
            izom: -2,
            allokepesseg: -1,
            mozgaskoordinacio: 1,
            reflex: 1,
            erzekeles: 2,
            memoria: 1,
            empatia: -1
        },
        harcertekAlap: { ce: 20 },
        infralatas: 50,
    },
    {
        id: 'félelf',
        name: 'Félelf',
        kepessegek: {
            izom: -1,
            reflex: 1,
            erzekeles: 1,
        },
        harcertekAlap: { ce: 10 },
        infralatas: 10,
    },
    {
        id: 'torpe',
        name: 'Törpe',
        kepessegek: {
            izom: 1,
            allokepesseg: 1,
            egeszseg: 1,
            onuralom: -1,
            empatia: -1,
        },
        infralatas: 30
    },
    {
        id: 'udvariork',
        name: 'Udvari ork',
        kepessegek: {
            izom: 2,
            allokepesseg: 1,
            egeszseg: 2,
            erzekeles: 2,
            gondolkodas: -1,
            onuralom: -3
        },
        infralatas: 15
    },
    {
        id: 'amund',
        name: 'Amund',
        kepessegek: {
            izom: 1,
            allokepesseg: 1,
            empatia: -2,
            onuralom: -1
        }
    },
    {
        id: 'dzsenn',
        name: 'Dzsenn',
        kepessegek: {
            gondolkodas: 2,
            emlekezet: 2,
            osszpontositas: 2,
            hit: -2,
            empatia: -2
        }
    },
    {
        id: 'khal',
        name: 'Khál',
        kepessegek: {
            izom: 3,
            allokepesseg: 2,
            egeszseg: 3,
            reflex: 2,
            erzekeles: 3,
            mozgaskoordinacio: 1,
            onuralom: -5
        }
    },
    {
        id: 'gnom',
        name: 'Gnóm',
        kepessegek: {
            izom: -2,
            mozgaskoordinacio: 2,
            egeszseg: 1,
            memoria: 1,
            erzekeles: 2,
        },
        infralatas: 30
    },
    {
        id: 'goblin',
        name: 'Goblin',
        kepessegek: {
            izom: -2,
            reflex: 2,
            erzekeles: 2,
            egeszseg: 2,
            gondolkodas: -2
        },
        infralatas: 30,
    },

];

console.log('mi ez');

export const Fajok = namedEntityArray(FAJOK);

