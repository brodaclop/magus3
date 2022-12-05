import { Harcertek } from "./Harcertek";
import { KepessegKategoria } from "./Kepessegek";
import { DobasEredmeny, kockaDobas, KockaDobas } from "./Kocka";
import { NamedEntity, namedEntityArray } from "./util";
import KASZTOK from '../data/kasztok.json';

export type KasztKepesseg = 'Legendás' | 'Jó' | 'Átlagos' | 'Gyenge';

// const KEPESSEG_DOBAS: Record<KasztKepesseg, Partial<KockaDobas>> = {
//     Legendás: { darab: 8, kocka: 10, eldobKicsi: 2 },
//     Jó: { darab: 7, kocka: 10, eldobKicsi: 1 },
//     Átlagos: { darab: 6, kocka: 10 },
//     Gyenge: { darab: 7, kocka: 10, eldobNagy: 1 },
// }

const KEPESSEG_DOBAS: Record<KasztKepesseg, Partial<KockaDobas>> = {
    Legendás: { darab: 3, kocka: 6, plusz: 42 },
    Jó: { darab: 5, kocka: 6, plusz: 30 },
    Átlagos: { darab: 8, kocka: 6, plusz: 12 },
    Gyenge: { darab: 10, kocka: 6 },
}

export interface KapottKepzettseg {
    id: string;
    kepzettsegId: string;
    name?: string;
    fok: number;
    honnan?: number;
}

export type KasztSpecFlags = 'ketSzintenkentKe' | 'ketSzintenkentSebzes';

export interface KasztInfo extends NamedEntity {
    id: string,
    name: string,
    kepessegDobas: Record<KepessegKategoria, KasztKepesseg>,
    fpPerSzint: number;
    fpAlap: number;
    epAlap: number;
    harcertekAlap: Partial<Harcertek>;
    harcertek: Partial<Harcertek>;
    hm: number;
    kasztSpec?: Array<KasztSpecFlags>;
    kpAlap: number;
    kpPerSzint: number;
    szazalekPerSzint: number;
    kepzettsegek?: Array<Array<Omit<KapottKepzettseg, 'id'>>>;
}

export const Kasztok = {
    ...namedEntityArray(KASZTOK as Array<KasztInfo>),
    kasztInfo: (kasztId: string, szint: number): KasztInfo => {
        //TODO: more compatible cloning
        const ret = structuredClone(Kasztok.find(kasztId)) as KasztInfo;
        if (ret.kasztSpec?.includes('ketSzintenkentKe') && szint % 2 === 0) {
            ret.harcertek.ke = (ret.harcertek.ke ?? 0) + 1
        }
        if (ret.kasztSpec?.includes('ketSzintenkentSebzes') && szint % 2 === 0) {
            ret.harcertek.sebzes = (ret.harcertek.sebzes ?? 0) + 1
        }
        return ret;
    },
    kidob: (kaszt: KasztInfo): Record<KepessegKategoria, DobasEredmeny> => Object.fromEntries(Object.entries(kaszt.kepessegDobas).map(([kategoria, dobas]) => [kategoria, kockaDobas(KEPESSEG_DOBAS[dobas])])) as Record<KepessegKategoria, DobasEredmeny>
}
