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
    icon?: string; // does not currently work
    message: string;
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

export interface TPCheckboxes extends TPPropertyBase, TPCanHaveMessage, TPNamed, TPNumericValue {
    type: 'checkboxes';
    data: null;
}

export interface TPAbility extends TPPropertyBase, TPNumericValue, TPCanHaveMessage, TPNamed {
    type: 'ability';
    data: null,
}

export interface TPText extends TPPropertyBase, TPNamed {
    type: 'text';
    value: string;
    data: {},
}

export interface TPParagraph extends TPPropertyBase {
    type: 'paragraph';
    value: string;
    data: null,
}

export interface TPAppearance extends TPPropertyBase {
    type: 'appearance';
    data: unknown;
}


export type TPProperty = TPSection | TPTabSection | TPHorizontalSection | TPTitleSection | TPMessage | TPNumber | TPAbility | TPNumber | TPText | TPAppearance | TPCheckbox | TPCheckboxes | TPParagraph;

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
    local?: boolean;
}

export interface InternalTPParagraph {
    type: 'paragraph';
    value: string;
}

export interface InternalTPNumber {
    type: 'number';
    name: string;
    value: number;
    formula?: string;
    local?: boolean;
}

export interface InternalTPAbility {
    type: 'ability';
    name: string;
    score: number;
    formula: string;
    message?: string;
}

export interface InternalTPCheckbox {
    type: 'checkbox';
    name: string;
    value: boolean;
    local?: boolean;
}

export interface InternalTPCheckboxes {
    type: 'checkboxes';
    name: string;
    value: number;
    max: number;
    maxFormula?: string;
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

export type InternalTPChild = InternalTPMessage | InternalTPText | InternalTPNumber | InternalTPHealth | InternalTPAppearance | InternalTPTitleSection | InternalTPCheckbox | InternalTPCheckboxes | InternalTPParagraph | InternalTPAbility;

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

    const convertChild = (child: InternalTPChild, parentId: number, idx: number): TPProperty | Array<TPProperty> => {
        const convertAppearance = (ob: InternalTPAppearance, parentId: number, idx: number): TPAppearance => ({
            ...convert(parentId, idx),
            ...ob
        })

        const convertMessage = (ob: InternalTPMessage, parentId: number, idx: number): TPMessage => ({
            ...convert(parentId, idx),
            data: null,
            ...ob
        })

        const convertText = (ob: InternalTPText, parentId: number, idx: number): TPText => ({
            ...convert(parentId, idx),
            data: {},
            ...ob
        });

        const convertParagraph = (ob: InternalTPParagraph, parentId: number, idx: number): TPParagraph => ({
            ...convert(parentId, idx),
            data: null,
            ...ob
        });


        const convertNumber = (ob: InternalTPNumber, parentId: number, idx: number): TPNumber => ({
            ...convert(parentId, idx),
            data: {},
            ...ob
        });

        const convertCheckbox = (ob: InternalTPCheckbox, parentId: number, idx: number): TPCheckbox => ({
            ...convert(parentId, idx),
            data: {},
            ...ob
        });

        const convertCheckboxes = (ob: InternalTPCheckboxes, parentId: number, idx: number): Array<TPProperty> => {
            const main: TPCheckboxes = {
                ...convert(parentId, idx),
                type: 'checkboxes',
                data: null,
                name: ob.name,
                value: ob.value,
                local: ob.local
            }

            return [main,
                {
                    ...convert(main.id, 0),
                    type: 'number',
                    data: {},
                    name: `${main.name}-max`,
                    value: ob.max,
                    formula: ob.maxFormula,
                    local: ob.local
                }
            ];
        }

        const convertAbility = (ob: InternalTPAbility, parentId: number, idx: number): Array<TPProperty> => {
            const main: TPAbility = {
                ...convert(parentId, idx),
                type: 'ability',
                data: null,
                name: ob.name,
                value: 0,
                formula: ob.formula,
                message: ob.message
            };

            return [main,
                {
                    ...convert(main.id, 0),
                    type: 'number',
                    data: {},
                    name: `${main.name}-score`,
                    value: ob.score,
                }
            ];
        }

        const convertHealth = (ob: InternalTPHealth, parentId: number, idx: number): Array<TPProperty> => {
            const main: TPNumber = {
                ...convert(parentId, idx),
                type: 'health',
                data: {},
                name: ob.name,
                value: ob.curr,
                local: ob.local
            }

            const ret: Array<TPProperty> = [main,
                {
                    ...convert(main.id, 0),
                    type: 'number',
                    data: {},
                    name: `${main.name}-maximum`,
                    value: ob.max,
                    local: ob.local
                }
            ];

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

        switch (child.type) {
            case 'message': return convertMessage(child, parentId, idx);
            case 'text': return convertText(child, parentId, idx);
            case 'number': return convertNumber(child, parentId, idx);
            case 'health': return convertHealth(child, parentId, idx);
            case 'appearance': return convertAppearance(child, parentId, idx);
            case 'title-section': return convertSection(child, parentId, idx);
            case 'checkbox': return convertCheckbox(child, parentId, idx);
            case 'checkboxes': return convertCheckboxes(child, parentId, idx);
            case 'paragraph': return convertParagraph(child, parentId, idx);
            case 'ability': return convertAbility(child, parentId, idx);
        }
    }

    const convertSection = (ob: InternalTPTab | InternalTPTitleSection, parentId: number | null, idx: number): Array<TPProperty> => {
        const main: any = {
            ...convert(parentId, idx),
            type: ob.type,
            data: ob.type === 'tab-section' ? {} : { collapsed: ob.collapsed ?? false },
            value: ob.title,
        };
        const children = ob.children.flatMap((c, i) => convertChild(c, main.id, i));
        return [main, ...children];
    };

    return {
        appearance: character.appearance,
        private: character.private,
        type: 'tableplop-character-v2',
        properties: character.tabs.flatMap((tab, idx) => convertSection(tab, null, idx)),
    };
}


// type: | "saving-throw" | "paragraph" | "table"
