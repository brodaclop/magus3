export interface NamedEntity {
    id: string,
    name: string,
};

export interface NamedEntityArray<T> {
    lista: Array<T>,
    find: (id: NamedEntity['id']) => T,
    name: (id: NamedEntity['id']) => string,
    keys: Array<NamedEntity['id']>
}


export const arrayFind = <T extends NamedEntity>(array: readonly T[], id: string): T => {
    const ret = array.find(t => t.id === id);
    if (ret === undefined) {
        throw new Error(`failed to find ${id}`);
    }
    return ret;
};

export const arrayName = <T extends NamedEntity>(array: readonly T[], id: string): string => arrayFind(array, id).name;


export const namedEntityArray = <T extends NamedEntity>(array: Array<T>): NamedEntityArray<T> => ({
    lista: array,
    find: (id: string) => arrayFind(array, id),
    name: (id: string) => arrayName(array, id),
    keys: array.map(i => i.id),
});

export const transformRecord = <K extends string, I, O>(input: Record<K, I>, fn: (key: K, value: I) => O): Record<K, O> => {
    return Object.fromEntries<O>(Object.entries<I>(input).map(([key, value]) => [key, fn(key as K, value)])) as Record<K, O>;
};

export const mergeToArray = <T>(input: Array<T>, ob: T, idFn: (o: T) => string) => {
    const currentIdx = input.findIndex(i => idFn(i) === idFn(ob));
    if (currentIdx === -1) {
        input.push(ob);
    } else {
        input[currentIdx] = ob;
    }
};

export const constructArray = <T>(size: number, fn: (idx: number) => T): Array<T> => Array(size).fill(undefined).map((_, i) => fn(i));

export const sumArray = <T>(array?: Array<number | T>, fn?: (ob: T, idx: number) => number): number => array ? ((fn ? (array as Array<T>).map(fn) : array) as Array<number>).reduce((acc, curr) => acc + curr, 0) : 0;

export const printNumber = (n: number): string => n === Math.floor(n) ? String(n) : n.toFixed(2);