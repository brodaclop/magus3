export interface TPPropertyBase {
    id: number;
    parentId: number | null;
    characterId: number;
    rank: number;
}

export interface TPNamed {
    name: string;
    local?: boolean;
}

export interface TPNumericValue {
    value: number;
    formula?: string;
}

export interface TPCanHaveMessage {
    message?: string;
}

export interface TPSection extends TPPropertyBase {
    type: 'section';
    data: {};
    value: '';
    size: number;
}

export interface TPTabSection extends TPPropertyBase {
    type: 'tab-section';
    data: {};
    value: string;
}

export interface TPHorizontalSection extends TPPropertyBase {
    type: "horizontal-section";
    data: {};
    value: '';
    size: number;
}

export interface TPTitleSection extends TPPropertyBase {
    type: 'title-section';
    value: string;
    data: {
        collapsed: boolean;
    }
}

export interface TPMessage extends TPPropertyBase, TPNamed {
    type: 'message';
    data: null;
    icon?: string; // how is this populated?
    message: string;
    local?: never;
}

export interface TPNumber extends TPPropertyBase, TPNumericValue, TPCanHaveMessage, TPNamed {
    type: 'number' | 'health';
    data: {},
}

export interface TPCheckbox extends TPPropertyBase, TPCanHaveMessage, TPNamed {
    type: 'checkbox';
    value: boolean;
    data: {},
}

export interface TPAbility extends TPPropertyBase, TPNumericValue, TPCanHaveMessage, TPNamed {
    type: 'ability';
    data: {},
}

export interface TPText extends TPPropertyBase, TPNamed {
    type: 'text';
    value: string;
    formula?: string;
    data: {},
}

export interface TPAppearance extends TPPropertyBase {
    type: 'appearance';
    data: unknown;
}


export type TPProperty = TPSection | TPTabSection | TPHorizontalSection | TPTitleSection | TPMessage | TPNumber | TPAbility | TPNumber | TPText | TPAppearance | TPCheckbox;

export interface TPCharacter {
    properties: Array<TPProperty>;
    appearance: string;
    private: boolean;
    type: 'tableplop-character-v2';
}

export interface InternalTPTab {
    type: 'tab-section',
    title: string;
    children: Array<InternalTPChild>;
}

export interface InternalTPTitleSection {
    type: 'title-section',
    title: string;
    collapsed?: boolean;
    children: Array<InternalTPChild>;
}


export interface InternalTPText {
    type: 'text';
    name: string;
    value: string;
    formula?: string;
    local?: boolean;
}

export interface InternalTPNumber {
    type: 'number';
    name: string;
    value: number;
    formula?: string;
    local?: boolean;
}

export interface InternalTPCheckbox {
    type: 'checkbox';
    name: string;
    value: boolean;
    local?: boolean;
}

export interface InternalTPHealth {
    type: 'health';
    name: string;
    max: number;
    curr: number;
    temp?: number;
    local?: boolean;
}

export interface InternalTPMessage {
    type: 'message';
    name: string;
    message: string;
}

export interface InternalTPAppearance {
    type: 'appearance';
    data: unknown;
}

export type InternalTPChild = InternalTPMessage | InternalTPText | InternalTPNumber | InternalTPHealth | InternalTPAppearance | InternalTPTitleSection | InternalTPCheckbox;

export interface InternalTPCharacter {
    id: number;
    private: boolean;
    appearance: string;
    tabs: Array<InternalTPTab>;
}

export const convertInternalToExternal = (character: InternalTPCharacter): TPCharacter => {
    let nextId = 1;

    const convert = (parentId: number | null, idx: number): Pick<TPProperty, 'id' | 'characterId' | 'parentId' | 'rank'> => ({
        id: nextId++,
        parentId,
        characterId: character.id,
        rank: idx + 1
    });

    const convertAppearance = (ob: InternalTPAppearance, parentId: number, idx: number): TPAppearance => ({
        ...convert(parentId, idx),
        type: 'appearance',
        data: ob.data,
    })

    const convertMessage = (message: InternalTPMessage, parentId: number, idx: number): TPMessage => ({
        ...convert(parentId, idx),
        type: 'message',
        data: null,
        name: message.name,
        message: message.message,
    })

    const convertText = (text: InternalTPText, parentId: number, idx: number): TPText => ({
        ...convert(parentId, idx),
        type: 'text',
        data: {},
        name: text.name,
        formula: text.formula,
        value: text.value,
        local: text.local
    });

    const convertNumber = (text: InternalTPNumber, parentId: number, idx: number): TPNumber => ({
        ...convert(parentId, idx),
        type: 'number',
        data: {},
        name: text.name,
        value: text.value,
        formula: text.formula,
        local: text.local
    });

    const convertCheckbox = (text: InternalTPCheckbox, parentId: number, idx: number): TPCheckbox => ({
        ...convert(parentId, idx),
        type: 'checkbox',
        data: {},
        name: text.name,
        value: text.value,
        local: text.local
    });

    const convertHealth = (ob: InternalTPHealth, parentId: number, idx: number): Array<TPProperty> => {
        const main: TPNumber = {
            ...convert(parentId, idx),
            type: 'health',
            data: {},
            name: ob.name,
            value: ob.curr,
            local: ob.local
        }

        const ret: Array<TPProperty> = [main];
        ret.push({
            ...convert(main.id, 0),
            type: 'number',
            data: {},
            name: `${main.name}-maximum`,
            value: ob.max,
            local: ob.local
        });

        if (ob.temp !== undefined) {
            ret.push({
                ...convert(main.id, 1),
                type: 'number',
                data: {},
                name: `${main.name}-temporary`,
                value: ob.temp,
                local: ob.local
            });
        }

        return ret;

    }


    const convertChild = (child: InternalTPChild, parentId: number, idx: number): TPProperty | Array<TPProperty> => {
        switch (child.type) {
            case 'message': return convertMessage(child, parentId, idx);
            case 'text': return convertText(child, parentId, idx);
            case 'number': return convertNumber(child, parentId, idx);
            case 'health': return convertHealth(child, parentId, idx);
            case 'appearance': return convertAppearance(child, parentId, idx);
            case 'title-section': return convertTab(child, parentId, idx);
            case 'checkbox': return convertCheckbox(child, parentId, idx);
        }
    }

    const convertTab = (tab: InternalTPTab | InternalTPTitleSection, parentId: number | null, idx: number): Array<TPProperty> => {
        const main: any = {
            ...convert(parentId, idx),
            characterId: character.id,
            type: tab.type,
            data: tab.type === 'tab-section' ? {} : { collapsed: tab.collapsed ?? false },
            value: tab.title,
        };
        const children = tab.children.flatMap((c, i) => convertChild(c, main.id, i));
        return [main, ...children];
    };

    const ret: TPCharacter = {
        appearance: character.appearance,
        private: character.private,
        type: 'tableplop-character-v2',
        properties: character.tabs.flatMap((tab, idx) => convertTab(tab, null, idx)),
    };
    return ret;
}


// type: | "saving-throw" | "paragraph" | "table"
