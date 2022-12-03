import { KozelharcFegyver } from "./Fegyver";

export type HarcmodorEffect = 'kez0minusz3' | 'kez0minusz2' | 'kez0minusz1' | 'kez1minusz3' | 'kez1minusz2' | 'kez1minusz1' | 'kez1pont2' | 'mindketVE' | 'mindketTE' | 'shiensuTE' | 'kez1NoAttack' | 'noMGT' | 'kez1SingleAttack';

export interface HarcmodorCalculation {
    id: string;
    isAvailable: (kezek: [KozelharcFegyver?, KozelharcFegyver?]) => boolean | undefined;
    szintek: [Array<HarcmodorEffect>, Array<HarcmodorEffect>, Array<HarcmodorEffect>, Array<HarcmodorEffect>, Array<HarcmodorEffect>, Array<HarcmodorEffect>,];
}

export const HARCMODOR_EFFEKTEK: Array<HarcmodorCalculation> = [
    {
        id: 'pajzs',
        isAvailable: kezek => kezek[1]?.flags?.includes('nagy-pajzs'),
        szintek: [
            ['kez0minusz2', 'kez1NoAttack', 'kez1pont2'],
            ['kez0minusz1', 'kez1NoAttack', 'kez1pont2'],
            ['kez1NoAttack', 'kez1pont2'],
            ['mindketVE', 'kez1NoAttack', 'kez1pont2'],
            ['mindketVE', 'kez1pont2', 'noMGT'],
            ['mindketVE', 'kez1pont2', 'noMGT']
        ]
    },
    {
        id: 'ketfegyver',
        isAvailable: kezek => !!kezek[0] && !!kezek[1] && !kezek[0].flags && !kezek[1].flags,
        szintek: [
            ['kez0minusz3', 'kez1minusz3', 'kez1SingleAttack'],
            ['kez0minusz1', 'kez1minusz3', 'kez1SingleAttack'],
            ['kez1minusz1', 'kez1SingleAttack'],
            ['kez1SingleAttack'],
            [],
            ['mindketTE']
        ]
    },
    {
        id: 'kispajzs',
        isAvailable: kezek => kezek[1]?.flags?.includes('buckler'),
        szintek: [
            ['kez0minusz2', 'kez1NoAttack', 'kez1pont2'],
            ['kez1NoAttack', 'kez1pont2'],
            ['mindketVE', 'kez1NoAttack', 'kez1pont2'],
            ['mindketVE', 'kez1pont2', 'kez1SingleAttack'],
            ['mindketVE', 'kez1pont2'],
            ['mindketVE', 'kez1pont2', 'mindketTE'],
        ]
    },
    {
        id: 'shiensu',
        isAvailable: kezek => kezek[0]?.flags?.includes('slan-kard') && kezek[1]?.flags?.includes('slan-tor'),
        szintek: [
            ['kez0minusz3', 'kez1minusz3', 'kez1SingleAttack'],
            ['kez1NoAttack'],
            ['kez1NoAttack', 'mindketVE'],
            ['mindketVE'],
            ['mindketVE', 'mindketTE'],
            ['mindketVE', 'shiensuTE'],
        ]
    },
    {
        id: 'ketkezes',
        isAvailable: kezek => kezek[0]?.kez === 2 && !kezek[0].flags?.includes('pusztakez'),
        szintek: [
            [],
            [],
            [],
            [],
            [],
            [],
        ]
    },
    {
        id: 'egykezes',
        isAvailable: kezek => kezek[0] && kezek[0].kez <= 1 && !kezek[1],
        szintek: [
            [],
            [],
            [],
            [],
            [],
            [],
        ]
    },

];

export const convertHarcmodorEffect = (input: Array<HarcmodorEffect>): Record<HarcmodorEffect, boolean> => ({
    kez0minusz1: input.includes('kez0minusz1'),
    kez0minusz2: input.includes('kez0minusz2'),
    kez0minusz3: input.includes('kez0minusz3'),
    kez1minusz1: input.includes('kez1minusz1'),
    kez1minusz2: input.includes('kez1minusz2'),
    kez1minusz3: input.includes('kez1minusz3'),
    mindketTE: input.includes('mindketTE'),
    mindketVE: input.includes('mindketVE'),
    kez1NoAttack: input.includes('kez1NoAttack'),
    kez1pont2: input.includes('kez1pont2'),
    noMGT: input.includes('noMGT'),
    kez1SingleAttack: input.includes('kez1SingleAttack'),
    shiensuTE: input.includes('shiensuTE'),
});