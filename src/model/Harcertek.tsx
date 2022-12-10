export interface Harcertek {
    ke: number;
    te: number;
    ve: number;
    ce: number;
    sebzes: number;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Harcertek = {
    add: (...terms: Array<Partial<Harcertek> | undefined>): Harcertek => terms.reduce<Harcertek>(
        (acc, curr) => {
            acc.ke += curr?.ke ?? 0;
            acc.te += curr?.te ?? 0;
            acc.ve += curr?.ve ?? 0;
            acc.ce += curr?.ce ?? 0;
            acc.sebzes += curr?.sebzes ?? 0;
            return acc;
        },
        { ke: 0, te: 0, ve: 0, ce: 0, sebzes: 0 }
    ),
    max: (...terms: Array<Partial<Harcertek> | undefined>): Harcertek => terms.reduce<Harcertek>(
        (acc, curr) => {
            acc.ke = Math.max(acc.ke, curr?.ke ?? 0);
            acc.ke = Math.max(acc.te, curr?.te ?? 0);
            acc.ke = Math.max(acc.ve, curr?.ve ?? 0);
            acc.ke = Math.max(acc.ce, curr?.ce ?? 0);
            acc.sebzes = Math.max(acc.sebzes, curr?.sebzes ?? 0);
            return acc;
        },
        { ke: 0, te: 0, ve: 0, ce: 0, sebzes: 0 }
    ),
}