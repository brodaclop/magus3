import React from 'react';
import Select from 'react-select';
import { ENTITY_LISTS } from './EntityWidget';

const listEntities = (): Array<{ value: string, label: string }> => {
    const ret: Array<{ value: string, label: string }> = Object
        .entries(ENTITY_LISTS)
        .flatMap(
            ([et, list]) => list.lista.map(e => ({
                value: e.id,
                label: `${et}: ${e.name}`
            })
            ));

    return ret;
}

export const EntitySelector: React.FC<{ id?: string, onChange: (id: string) => unknown }> = ({ id, onChange }) => {

    const entities = listEntities();

    const value = entities.find(e => e.value === id);

    return <Select
        value={value ?? null}
        isClearable
        isSearchable
        placeholder='Cucc kereső'
        options={listEntities()}
        onChange={(e: any) => onChange(e?.value ?? '')} />;
};