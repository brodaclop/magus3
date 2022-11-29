import { Harcertek } from "./Harcertek";
import { KepessegKategoria } from "./Kepessegek";
import { DobasEredmeny, kockaDobas, KockaDobas } from "./Kocka";
import { NamedEntity, namedEntityArray } from "./util";

export type KasztKepesseg = 'Legendás' | 'Jó' | 'Átlagos' | 'Gyenge';

type Kaszt = 'Harcos' | 'Lovag' | 'Fejvadász' | 'Gladiátor' | 'Harcművész' | 'Kardművész' | 'Pap' | 'Paplovag' | 'Tolvaj' | 'Bárd' | 'Barbár' | 'Boszorkány' | 'Boszorkánymester' | 'Tűzvarázsló' | 'Varázsló';

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

export type KasztSpecFlags = 'ketSzintenkentKe' | 'ketSzintenkentSebzes';

export interface KasztInfo extends NamedEntity {
    id: Kaszt,
    name: Kaszt,
    kepessegDobas: Record<KepessegKategoria, KasztKepesseg>,
    fpPerSzint: number;
    fpAlap: number;
    epAlap: number;
    harcertekAlap: Partial<Harcertek>;
    harcertek: Partial<Harcertek>;
    hm: number;
    kasztSpec?: Array<KasztSpecFlags>;
}

const KASZTOK: Array<KasztInfo> = [
    {
        id: 'Harcos',
        name: 'Harcos',
        kepessegDobas: {
            Fizikum: 'Jó',
            Ügyesség: 'Jó',
            Mentál: 'Átlagos',
            Asztrál: 'Átlagos'
        },
        fpPerSzint: 4,
        epAlap: 7,
        fpAlap: 6,
        harcertekAlap: {
            ke: 9,
            te: 20,
            ve: 75,
            ce: 0
        },
        harcertek: {
            te: 3,
            ve: 3
        },
        hm: 5
    },
    {
        id: 'Lovag',
        name: 'Lovag',
        kepessegDobas: {
            Fizikum: 'Jó',
            Ügyesség: 'Átlagos',
            Mentál: 'Átlagos',
            Asztrál: 'Jó'
        },
        fpPerSzint: 5,
        epAlap: 7,
        fpAlap: 6,
        harcertekAlap: {
            ke: 5,
            te: 20,
            ve: 75,
            ce: 0
        },
        harcertek: {
            te: 5,
            ve: 5
        },
        hm: 2
    },
    {
        id: 'Fejvadász',
        name: 'Fejvadász',
        kepessegDobas: {
            Fizikum: 'Átlagos',
            Ügyesség: 'Jó',
            Mentál: 'Jó',
            Asztrál: 'Átlagos'
        },
        fpPerSzint: 5,
        epAlap: 6,
        fpAlap: 7,
        harcertekAlap: {
            ke: 10,
            te: 20,
            ve: 75,
            ce: 0
        },
        harcertek: {
            te: 4,
            ve: 4
        },
        hm: 3,
        kasztSpec: ['ketSzintenkentKe', 'ketSzintenkentSebzes'],
    },
    {
        id: 'Gladiátor',
        name: 'Gladiátor',
        kepessegDobas: {
            Fizikum: 'Legendás',
            Ügyesség: 'Jó',
            Mentál: 'Gyenge',
            Asztrál: 'Átlagos'
        },
        fpPerSzint: 5,
        epAlap: 8,
        fpAlap: 7,
        harcertekAlap: {
            ke: 9,
            te: 20,
            ve: 75,
            ce: 0
        },
        harcertek: {
            te: 4,
            ve: 4
        },
        hm: 4

    },
    {
        id: 'Barbár',
        name: 'Barbár',
        kepessegDobas: {
            Fizikum: 'Legendás',
            Ügyesség: 'Legendás',
            Mentál: 'Gyenge',
            Asztrál: 'Gyenge'
        },
        fpPerSzint: 5,
        epAlap: 8,
        fpAlap: 7,
        harcertekAlap: {
            ke: 10,
            te: 26,
            ve: 75,
            ce: 0
        },
        harcertek: {
            ke: 3,
            te: 5,
        },
        hm: 4
    },
    {
        id: 'Tolvaj',
        name: 'Tolvaj',
        kepessegDobas: {
            Fizikum: 'Gyenge',
            Ügyesség: 'Legendás',
            Mentál: 'Jó',
            Asztrál: 'Átlagos'
        },
        fpPerSzint: 3,
        epAlap: 4,
        fpAlap: 5,
        harcertekAlap: {
            ke: 8,
            te: 17,
            ve: 72,
            ce: 0
        },
        harcertek: {
            ke: 1,
            te: 1,
            ve: 1
        },
        hm: 4
    },
    {
        id: 'Bárd',
        name: 'Bárd',
        kepessegDobas: {
            Fizikum: 'Átlagos',
            Ügyesség: 'Jó',
            Mentál: 'Jó',
            Asztrál: 'Átlagos'
        },
        fpPerSzint: 3,
        epAlap: 5,
        fpAlap: 6,
        harcertekAlap: {
            ke: 10,
            te: 20,
            ve: 75,
            ce: 0
        },
        harcertek: {
            te: 2,
            ve: 2
        },
        hm: 5
    },
    {
        id: 'Pap',
        name: 'Pap',
        kepessegDobas: {
            Fizikum: 'Átlagos',
            Ügyesség: 'Átlagos',
            Mentál: 'Átlagos',
            Asztrál: 'Legendás'
        },
        fpPerSzint: 2,
        epAlap: 6,
        fpAlap: 6,
        harcertekAlap: {
            ke: 5,
            te: 17,
            ve: 72,
            ce: 0
        },
        harcertek: {
            te: 3,
            ve: 3
        },
        hm: 2
    },
    {
        id: 'Paplovag',
        name: 'Paplovag',
        kepessegDobas: {
            Fizikum: 'Jó',
            Ügyesség: 'Átlagos',
            Mentál: 'Átlagos',
            Asztrál: 'Jó'
        },
        fpPerSzint: 5,
        epAlap: 8,
        fpAlap: 7,
        harcertekAlap: {
            ke: 5,
            te: 20,
            ve: 75,
            ce: 0
        },
        harcertek: {
            te: 3,
            ve: 3
        },
        hm: 3
    },
    {
        id: 'Harcművész',
        name: 'Harcművész',
        kepessegDobas: {
            Fizikum: 'Jó',
            Ügyesség: 'Jó',
            Mentál: 'Átlagos',
            Asztrál: 'Átlagos'
        },
        fpPerSzint: 5,
        epAlap: 4,
        fpAlap: 8,
        harcertekAlap: {
            ke: 10,
            te: 20,
            ve: 75,
            ce: 0
        },
        harcertek: {
            te: 3,
            ve: 3
        },
        hm: 2
    },
    {
        id: 'Kardművész',
        name: 'Kardművész',
        kepessegDobas: {
            Fizikum: 'Átlagos',
            Ügyesség: 'Jó',
            Mentál: 'Átlagos',
            Asztrál: 'Jó'
        },
        fpPerSzint: 5,
        epAlap: 4,
        fpAlap: 8,
        harcertekAlap: {
            ke: 10,
            te: 20,
            ve: 75,
            ce: 0
        },
        harcertek: {
            te: 3,
            ve: 3
        },
        hm: 2
    },
    {
        id: 'Boszorkány',
        name: 'Boszorkány',
        kepessegDobas: {
            Fizikum: 'Gyenge',
            Ügyesség: 'Jó',
            Mentál: 'Jó',
            Asztrál: 'Jó'
        },
        fpPerSzint: 0,
        epAlap: 3,
        fpAlap: 1,
        harcertekAlap: {
            ke: 6,
            te: 14,
            ve: 69,
            ce: 0
        },
        harcertek: {
            te: 1,
            ve: 1
        },
        hm: 2
    },
    {
        id: 'Boszorkánymester',
        name: 'Boszorkánymester',
        kepessegDobas: {
            Fizikum: 'Gyenge',
            Ügyesség: 'Jó',
            Mentál: 'Jó',
            Asztrál: 'Jó'
        },
        fpPerSzint: 1,
        epAlap: 3,
        fpAlap: 4,
        harcertekAlap: {
            ke: 7,
            te: 17,
            ve: 72,
            ce: 5
        },
        harcertek: {
            ke: 1,
            te: 1,
            ve: 1
        },
        hm: 5
    },
    {
        id: 'Tűzvarázsló',
        name: 'Tűzvarázsló',
        kepessegDobas: {
            Fizikum: 'Jó',
            Ügyesség: 'Átlagos',
            Mentál: 'Jó',
            Asztrál: 'Átlagos'
        },
        fpPerSzint: 1,
        epAlap: 5,
        fpAlap: 4,
        harcertekAlap: {
            ke: 6,
            te: 17,
            ve: 72,
            ce: 0
        },
        harcertek: {
            te: 3,
            ve: 3
        },
        hm: 2
    },
    {
        id: 'Varázsló',
        name: 'Varázsló',
        kepessegDobas: {
            Fizikum: 'Gyenge',
            Ügyesség: 'Átlagos',
            Mentál: 'Legendás',
            Asztrál: 'Jó'
        },
        fpPerSzint: 0,
        epAlap: 3,
        fpAlap: 2,
        harcertekAlap: {
            ke: 2,
            te: 15,
            ve: 70,
            ce: 0
        },
        harcertek: {
            te: 1,
            ve: 1
        },
        hm: 2
    },
];

export const Kasztok = {
    ...namedEntityArray(KASZTOK),
    kidob: (kaszt: KasztInfo): Record<KepessegKategoria, DobasEredmeny> => Object.fromEntries(Object.entries(kaszt.kepessegDobas).map(([kategoria, dobas]) => [kategoria, kockaDobas(KEPESSEG_DOBAS[dobas])])) as Record<KepessegKategoria, DobasEredmeny>
}
