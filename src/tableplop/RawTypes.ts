interface TPPropertyBase {
    id: number;
    parentId: number | null;
    characterId: number;
    rank: number;
}

interface TPNamed {
    name: string;
    local?: boolean;
}


interface TPCanHaveMessage {
    message?: string;
}

interface TPSection extends TPPropertyBase {
    type: 'section';
    size: number;
}

interface TPTabSection extends TPPropertyBase {
    type: 'tab-section';
    value: string;
}

interface TPHorizontalSection extends TPPropertyBase {
    type: "horizontal-section";
}

interface TPTitleSection extends TPPropertyBase {
    type: 'title-section';
    value: string;
    private?: boolean;
    data: {
        collapsed: boolean;
    }
}

interface TPMessage extends TPPropertyBase, TPNamed {
    type: 'message';
    icon?: string; // does not currently work
    message: string;
}

interface TPCheckbox extends TPPropertyBase, TPCanHaveMessage, TPNamed {
    type: 'checkbox';
    value: boolean;
}

interface TPNumber extends TPPropertyBase, TPCanHaveMessage, TPNamed {
    type: 'number';
    value: number;
    formula?: string;
    local?: boolean;

}

interface TPNumeric extends TPPropertyBase, TPCanHaveMessage, TPNamed {
    type: 'health' | 'saving-throw' | 'ability' | 'checkboxes';
    value: number;
    formula?: string;
}

interface TPSkill extends TPPropertyBase, TPCanHaveMessage, TPNamed {
    type: 'skill' | 'skill-4';
    value: number;
    formula?: string;
    data: {
        subtitle: string;
    }
}


interface TPText extends TPPropertyBase, TPNamed {
    type: 'text';
    value: string;
}

interface TPParagraph extends TPPropertyBase { //TODO: find better name
    type: 'paragraph' | 'heading';
    value: string;
}

interface TPAppearance extends TPPropertyBase {
    type: 'appearance';
    data: unknown;
}


export type TPProperty = TPSection | TPTabSection | TPHorizontalSection | TPTitleSection | TPMessage | TPNumber | TPNumber | TPText | TPAppearance | TPCheckbox | TPParagraph | TPNumeric | TPSkill;

export interface TPCharacter {
    properties: Array<TPProperty>;
    appearance: string;
    private: boolean;
    type: 'tableplop-character-v2';
}