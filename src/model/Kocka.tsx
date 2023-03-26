import seedrandom from "seedrandom";

export interface KockaDobas {
    darab: number;
    kocka: number;
    plusz: number;
    eldobNagy?: number;
    eldobKicsi?: number;
}

export interface DobasEredmeny {
    kocka: Array<number>;
    plusz: number;
    eldobottak: Array<number>;
    max: number;
    osszeg: number;
}

const PATTERN = /(?<numDice>\d+)?[kd](?<die>\d+)(?:\/(?<div>\d+))?(?<plus>[+-]\d+)?/;

let random = Math.random;

export const initTestSeed = (seed: string) => random = seedrandom(seed);

const kocka = (k: number) => Math.floor(random() * k) + 1;

const kockak = (darab: number, k: number) => Array.from({ length: darab }, _ => kocka(k));

export const kockaDobas = (d: Partial<KockaDobas>): DobasEredmeny => {
    const dobas: KockaDobas = {
        darab: 0,
        kocka: 0,
        plusz: 0,
        eldobKicsi: 0,
        eldobNagy: 0,
        ...d
    };
    const dobasok = kockak(dobas.darab, dobas.kocka);
    const eldobando: Array<number> = [];
    if ((dobas.eldobNagy ?? 0) > 0) {
        eldobando.push(...[...dobasok].sort((a, b) => b - a).slice(0, dobas.eldobNagy));
    }
    if ((dobas.eldobKicsi ?? 0) > 0) {
        eldobando.push(...[...dobasok].sort((a, b) => a - b).slice(0, dobas.eldobKicsi));
    }
    const eldobottak: Array<number> = [];
    dobasok.forEach((k, idx) => {
        if (eldobando.includes(k)) {
            eldobottak.push(idx);
            eldobando.splice(eldobando.indexOf(k), 1);
        }
    });

    let osszeg = dobas.plusz;
    dobasok.forEach((k, idx) => {
        if (!eldobottak.includes(idx)) {
            osszeg += k;
        }
    });

    return {
        kocka: dobasok,
        plusz: dobas.plusz,
        max: dobas.kocka,
        eldobottak,
        osszeg
    };
}

//TODO: ezt azert meg csiszolni kell
export const printKocka = (kocka: Partial<KockaDobas>, ijasz?: boolean): string => {
    if (!kocka.darab || !kocka.kocka) {
        return String(kocka.plusz);
    } else {
        const pluszString = (kocka.plusz ?? 0) > 0 ? `+${kocka.plusz}` : ((kocka.plusz ?? 0) < 0 ? kocka.plusz : '');
        return `${kocka.darab === 1 ? '' : kocka.darab}k${kocka.kocka}${ijasz ? '!' : ''}${pluszString}`;
    }
}
export const parseKocka = (str: string): KockaDobas => {
    const res = String(str).replace(/\s/g, '').match(PATTERN);
    return {
        darab: Number(res?.groups?.numDice ?? 1),
        kocka: Number(res?.groups?.die ?? 0),
        plusz: Number(res?.groups?.plus ?? 0),
        eldobKicsi: 0,
        eldobNagy: 0
    }
};