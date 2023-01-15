import React, { PropsWithChildren } from 'react';
import { NamedEntity, NamedEntityArray } from '../model/util';

export const NamedEntitySelector = <T extends NamedEntity>(props: PropsWithChildren<
    {
        nea: NamedEntityArray<T>,
        value?: T,
        onChange: (value: T | undefined) => unknown,
        allowEmpty?: boolean,
        filter?: (ob: T) => boolean
    }>) => {
    return <select value={props.value?.id ?? ''} onChange={e => props.onChange(e.target.value ? props.nea.find(e.target.value) : undefined)}>
        {(!props.value || props.allowEmpty) && <option value=''>----</option>}
        {props.nea.lista.filter(props.filter ?? (() => true)).map(k => <option key={k.id} value={k.id}>{k.name}</option>)}
    </select>
}