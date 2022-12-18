import { SebzesTipus } from './Fegyver';
import { Pancel } from './Pancel';

export interface PancelBlokk {
    name: string;
    sfe: Record<typeof SebzesTipus[number]['id'], number>;
    mgt: number;
}

export interface PancelAlap extends PancelBlokk {
    anyag: 'fem' | 'bor' | 'poszto';
}

const PANCEL_ALAPOK: Array<PancelAlap> = [
    {
        name: 'Posztóvért',
        anyag: 'poszto',
        mgt: 1,
        sfe: {
            szuro: 0,
            vago: 1,
            zuzo: 2
        }
    },
    {
        name: 'Posztóvért, selyem',
        anyag: 'poszto',
        mgt: 1,
        sfe: {
            szuro: 2,
            vago: 2,
            zuzo: 2
        }
    },
    {
        name: 'Bőr',
        anyag: 'bor',
        mgt: 2,
        sfe: {
            szuro: 0,
            vago: 2,
            zuzo: 4
        }
    },
    {
        name: 'Pikkelyvért',
        anyag: 'fem',
        mgt: 3,
        sfe: {
            szuro: 3,
            vago: 3,
            zuzo: 3
        }
    },
    {
        name: 'Pikkelymellény',
        anyag: 'fem',
        mgt: 2,
        sfe: {
            szuro: 2,
            vago: 2,
            zuzo: 2
        }
    },
    {
        name: 'Láncvért',
        anyag: 'fem',
        mgt: 3,
        sfe: {
            szuro: 2,
            vago: 5,
            zuzo: 2
        }
    },
    {
        name: 'Láncmellény',
        anyag: 'fem',
        mgt: 2,
        sfe: {
            szuro: 1,
            vago: 4,
            zuzo: 1
        }
    },
    {
        name: 'Brigandin',
        anyag: 'fem',
        mgt: 5,
        sfe: {
            szuro: 3,
            vago: 6,
            zuzo: 3
        }
    },
    {
        name: 'Brigandin mellvért',
        anyag: 'fem',
        mgt: 4,
        sfe: {
            szuro: 2,
            vago: 5,
            zuzo: 2
        }
    },
    {
        name: 'Lemezvért',
        anyag: 'fem',
        mgt: 7,
        sfe: {
            szuro: 4,
            vago: 7,
            zuzo: 4
        }
    },
    {
        name: 'Mellvért',
        anyag: 'fem',
        mgt: 6,
        sfe: {
            szuro: 3,
            vago: 6,
            zuzo: 3
        }
    },
];

const MERETRE_IGAZITAS: Array<PancelBlokk> = [
    {
        name: '“csak úgy találtam”',
        mgt: 2,
        sfe: { szuro: 0, vago: 0, zuzo: 0 }
    },
    {
        name: 'egydélutános barkács megoldás',
        mgt: 1,
        sfe: { szuro: 0, vago: 0, zuzo: 0 }
    },
    {
        name: 'alapos kiigazítás szakértő segítséggel',
        mgt: 0,
        sfe: { szuro: 0, vago: 0, zuzo: 0 }
    },
    {
        name: 'méretre igazíttatás páncélkováccsal',
        mgt: -1,
        sfe: { szuro: 0, vago: 0, zuzo: 0 }
    },
    {
        name: 'méretre készítés',
        mgt: -2,
        sfe: { szuro: 0, vago: 0, zuzo: 0 }
    },
];

const MINOSEG: Array<PancelBlokk> = [
    {
        name: 'kontár',
        mgt: 1,
        sfe: { szuro: -1, vago: -1, zuzo: -1 }
    },
    {
        name: 'inas',
        mgt: 1,
        sfe: { szuro: 0, vago: 0, zuzo: 0 }
    },
    {
        name: 'legény',
        mgt: 0,
        sfe: { szuro: 0, vago: 0, zuzo: 0 }
    },
    {
        name: 'mester',
        mgt: -1,
        sfe: { szuro: 0, vago: 0, zuzo: 0 }
    },
    {
        name: 'törpe',
        mgt: -1,
        sfe: { szuro: 1, vago: 1, zuzo: 1 }
    },
];

const FEMEK: Array<PancelBlokk> = [
    {
        name: 'bronz',
        mgt: 2,
        sfe: { szuro: 0, vago: 0, zuzo: 0 }
    },
    {
        name: 'kovácsoltvas',
        mgt: 0,
        sfe: { szuro: -1, vago: -1, zuzo: -1 }
    },
    {
        name: 'lágyacél',
        mgt: 0,
        sfe: { szuro: 0, vago: 0, zuzo: 0 }
    },
    {
        name: 'edzett acél',
        mgt: 0,
        sfe: { szuro: 1, vago: 2, zuzo: 0 }
    },
    {
        name: 'törp acél',
        mgt: 0,
        sfe: { szuro: 2, vago: 1, zuzo: 3 }
    },
    {
        name: 'abbitacél',
        mgt: -1,
        sfe: { szuro: 1, vago: 1, zuzo: 1 }
    },
    {
        name: 'mithril',
        mgt: -3,
        sfe: { szuro: 1, vago: 1, zuzo: 1 }
    },
];

const normalize = (pancel: PancelBlokk) => {
    pancel.mgt = Math.max(0, pancel.mgt);
    pancel.sfe.szuro = Math.max(0, pancel.sfe.szuro);
    pancel.sfe.vago = Math.max(0, pancel.sfe.vago);
    pancel.sfe.zuzo = Math.max(0, pancel.sfe.zuzo);
}

export const PancelBuilder = {
    igazitas: MERETRE_IGAZITAS,
    femek: FEMEK,
    minoseg: MINOSEG,
    alapok: PANCEL_ALAPOK,
    runak: Array(5).fill(null).map((_, idx) => ({
        mgt: -idx,
        sfe: { szuro: idx, vago: idx, zuzo: idx },
        name: idx === 0 ? 'Rúna nélkül' : `+${idx}`
    })) as Array<PancelBlokk>,
    removeIgazit: (pancel: Pancel): Pancel => {
        const ret = structuredClone(pancel) as Pancel;
        ret.mgt = ret.mgt - ret.igazitas.mgt;
        ret.sfe.szuro = ret.sfe.szuro - ret.igazitas.sfe.szuro;
        ret.sfe.vago = ret.sfe.vago - ret.igazitas.sfe.vago;
        ret.sfe.zuzo = ret.sfe.zuzo - ret.igazitas.sfe.zuzo;
        return ret;
    },
    igazit: (alap: Pancel, igazitas: PancelBlokk): Pancel => {
        const ret = PancelBuilder.removeIgazit(alap);
        ret.mgt = ret.mgt + igazitas.mgt;
        ret.sfe.szuro = ret.sfe.szuro + igazitas.sfe.szuro;
        ret.sfe.vago = ret.sfe.vago + igazitas.sfe.vago;
        ret.sfe.zuzo = ret.sfe.zuzo + igazitas.sfe.zuzo;
        normalize(ret);
        ret.igazitas = igazitas;
        return ret;
    },
    build: (id: string, name: string, alap: PancelBlokk, igazitas: PancelBlokk, egyebek: Array<PancelBlokk>): Pancel => {
        const tulajdonsagok: PancelBlokk = [igazitas, ...egyebek].reduce((acc, curr) => {
            acc.mgt += curr.mgt;
            acc.sfe.szuro += curr.sfe.szuro;
            acc.sfe.vago += curr.sfe.vago;
            acc.sfe.zuzo += curr.sfe.zuzo;
            return acc;
        }, structuredClone(alap));

        normalize(tulajdonsagok);

        return {
            ...tulajdonsagok,
            id,
            name,
            igazitas
        };
    }
};

