import React from 'react';
import { GiBodyBalance, GiBoltSpellCast, GiInnerSelf, GiPsychicWaves, GiRuleBook, GiSkills } from 'react-icons/gi';
import Select from 'react-select';
import { ENTITY_LISTS } from './EntityWidget';

const entityIcon = (type: keyof typeof ENTITY_LISTS) => {
    switch (type) {
        case 'Varázslat': return <GiBoltSpellCast color='#1223e4' />;
        case 'Pszi': return <GiPsychicWaves color='#9814a1' />;
        case 'Szabály': return <GiRuleBook color='#34b898' />;
        case 'Kaszt': return <GiSkills color='#345487' />;
        case 'Faj': return <GiInnerSelf color='#743119' />;
        case 'Képzettség': return <GiBodyBalance color='#988721' />;
        default: return undefined;

    }
}

const listEntities = (): Array<{ value: string, label: string, category: keyof typeof ENTITY_LISTS }> => {
    const ret: Array<{ value: string, label: string, category: keyof typeof ENTITY_LISTS }> = Object
        .entries(ENTITY_LISTS)
        .flatMap(
            ([et, list]) => list.lista.map(e => ({
                value: e.id,
                label: `${et}: ${e.name}`,
                category: et as any
            })
            ));

    return ret;
}

export const EntitySelector: React.FC<{ id?: string, onChange: (id: string) => unknown }> = ({ id, onChange }) => {

    const entities = listEntities();

    const value = entities.find(e => e.value === id);

    return <Select className='entity-selector'
        value={value ?? null}
        isClearable
        isSearchable
        placeholder='Cucc kereső'
        options={listEntities()}
        formatOptionLabel={option => <span>{entityIcon(option.category)} {option.label}</span>}
        onChange={(e: any) => e?.value && onChange(e.value)} />;
};