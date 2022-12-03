export interface NamedEntity {
    id: string,
    name: string,
};

export interface NamedEntityArray<T> {
    lista: Array<T>,
    find: (id: NamedEntity['id']) => T,
    keys: Array<NamedEntity['id']>
}

export const arrayFind = <T extends NamedEntity>(array: Array<T>, id: string): T => {
    const ret = array.find(t => t.id === id);
    if (ret === undefined) {
        throw new Error('failed to find');
    }
    return ret;
}

export const namedEntityArray = <T extends NamedEntity>(array: Array<T>): NamedEntityArray<T> => ({
    lista: array,
    find: (id: string) => arrayFind(array, id),
    keys: array.map(i => i.id),
})

export const transformRecord = <K extends string, I, O>(input: Record<K, I>, fn: (key: K, value: I) => O): Record<K, O> => {
    return Object.fromEntries<O>(Object.entries<I>(input).map(([key, value]) => [key, fn(key as K, value)])) as Record<K, O>;
}

export const mergeToArray = <T>(input: Array<T>, ob: T, idFn: (o: T) => string) => {
    const currentIdx = input.findIndex(i => idFn(i) === idFn(ob));
    if (currentIdx === -1) {
        input.push(ob);
    } else {
        input[currentIdx] = ob;
    }
}