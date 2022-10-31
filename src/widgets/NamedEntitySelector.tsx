import React, { PropsWithChildren } from 'react';
import { NamedEntity, NamedEntityArray } from '../model/util';

export const NamedEntitySelector = <T extends NamedEntity>(props: PropsWithChildren<{ nea: NamedEntityArray<T>, value: T, onChange: (value: T) => unknown }>) => {
    return <select value={props.value.id} onChange={e => props.onChange(props.nea.find(e.target.value))}>
        {props.nea.lista.map(k => <option value={k.id}>{k.name}</option>)}
    </select>
}