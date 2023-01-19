import React from 'react';
import { Faj, Fajok } from '../model/Fajok';
import { CalcDiszciplina, CalcVarazslat } from '../model/KarakterCalculator';
import { KasztInfo, Kasztok } from '../model/Kasztok';
import { Kepzettseg } from '../model/Kepzettseg';
import { Magia } from '../model/Magia';
import { Pszi } from '../model/Pszi';
import { Szabaly } from '../model/Szabaly';
import { NamedEntity, NamedEntityArray } from '../model/util';
import { FajLeiras } from './entities/FejLeiras';
import { KasztLeiras } from './entities/KasztLeiras';
import { KepzettsegLeiras } from './entities/KepzettsegLeiras';
import { PsziDiszciplinaLeiras } from './entities/PsziDiszciplinaLeiras';
import { SzabalyLeiras } from './entities/SzabalyLeiras';
import { VarazslatLeiras } from './entities/VarazslatLeiras';

export type EntityType = 'Faj' | 'Kaszt' | 'Varázslat' | 'Pszi' | 'Képzettség' | 'Szabály';

export const ENTITY_LISTS: Record<EntityType, NamedEntityArray<NamedEntity>> = {
    Faj: Fajok,
    Kaszt: Kasztok,
    Varázslat: Magia,
    Pszi: Pszi,
    Képzettség: Kepzettseg,
    Szabály: Szabaly,
}

const findEntityType = (id: string): EntityType | undefined => Object.entries(ENTITY_LISTS).find(([et, list]) => list.find(id, true))?.[0] as EntityType;

export const findEntity = (id: string): NamedEntity | undefined => {
    const entityType = findEntityType(id);
    if (!entityType) {
        return undefined;
    }

    let entity = ENTITY_LISTS[entityType].find(id);

    if ('fokaszt' in entity) {
        entity = Kasztok.kasztInfo(entity.id, 0);
    }

    return entity;
}

export const EntityWidget: React.FC<{ id: string }> = ({ id }) => {

    const entityType = findEntityType(id);

    const entity = findEntity(id);

    switch (entityType) {
        case 'Faj': return <FajLeiras faj={entity as Faj} inline />;
        case 'Kaszt': return <KasztLeiras kaszt={entity as KasztInfo} inline />;
        case 'Varázslat': return <VarazslatLeiras v={entity as CalcVarazslat} inline />
        case 'Pszi': return <PsziDiszciplinaLeiras d={entity as CalcDiszciplina} inline />
        case 'Képzettség': return <KepzettsegLeiras kepzettseg={entity as Kepzettseg} inline />
        case 'Szabály': return <SzabalyLeiras szabaly={entity as Szabaly} inline />
        default: return <div>Not found</div>;
    }
}