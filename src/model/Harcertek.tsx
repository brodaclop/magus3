export interface Harcertek {
    ke: number;
    te: number;
    ve: number;
    ce: number;
}

export const Harcertek = {
    add: (...terms: Array<Partial<Harcertek> | undefined>): Harcertek => terms.reduce<Harcertek>(
        (acc, curr) => {
            acc.ke += curr?.ke ?? 0;
            acc.te += curr?.te ?? 0;
            acc.ve += curr?.ve ?? 0;
            acc.ce += curr?.ce ?? 0;
            return acc;
        },
        { ke: 0, te: 0, ve: 0, ce: 0 }
    )
}