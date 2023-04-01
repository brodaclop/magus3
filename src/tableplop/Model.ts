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
    value: '';
    size: number;
}

interface TPTabSection extends TPPropertyBase {
    type: 'tab-section';
    value: string;
}

interface TPHorizontalSection extends TPPropertyBase {
    type: "horizontal-section";
    value: '';
    size: number;
}

interface TPTitleSection extends TPPropertyBase {
    type: 'title-section';
    value: string;
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


interface TPText extends TPPropertyBase, TPNamed {
    type: 'text';
    value: string;
}

interface TPParagraph extends TPPropertyBase {
    type: 'paragraph';
    value: string;
}

interface TPAppearance extends TPPropertyBase {
    type: 'appearance';
    data: unknown;
}


type TPProperty = TPSection | TPTabSection | TPHorizontalSection | TPTitleSection | TPMessage | TPNumber | TPNumber | TPText | TPAppearance | TPCheckbox | TPParagraph | TPNumeric;

export interface TPCharacter {
    properties: Array<TPProperty>;
    appearance: string;
    private: boolean;
    type: 'tableplop-character-v2';
}

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

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

export interface InternalTPSavingThrow {
    type: 'saving-throw';
    name: string;
    value: number;
    formula: string;
    proficient: boolean;
    message?: string;
}

export type InternalTPChild = InternalTPMessage | InternalTPText | InternalTPNumber | InternalTPHealth | InternalTPAppearance | InternalTPTitleSection | InternalTPCheckbox | InternalTPCheckboxes | InternalTPParagraph | InternalTPAbility | InternalTPSavingThrow;

export interface InternalTPCharacter {
    id: number;
    private: boolean;
    appearance: string;
    tabs: Array<InternalTPTab>;
}


export const convertInternalToExternal = (character: InternalTPCharacter): TPCharacter => {
    let nextId = 1;

    const convertCommon = (parentId: number | null, idx: number): Pick<TPProperty, 'id' | 'characterId' | 'parentId' | 'rank'> => ({
        id: nextId++,
        parentId,
        characterId: character.id,
        rank: idx + 1
    });

    const convertChild = (child: InternalTPChild, parentId: number, idx: number): TPProperty | Array<TPProperty> => {
        const convertSimple = (ob: InternalTPAppearance | InternalTPMessage | InternalTPText | InternalTPParagraph | InternalTPNumber | InternalTPCheckbox, parentId: number, idx: number): TPProperty => ({
            ...convertCommon(parentId, idx),
            ...ob
        })

        const convertSavingThrow = (ob: InternalTPSavingThrow, parentId: number, idx: number): Array<TPProperty> => {
            const main: TPNumeric = {
                ...convertCommon(parentId, idx),
                type: 'saving-throw',
                name: ob.name,
                value: ob.value,
                formula: ob.formula,
                message: ob.message
            }

            return [
                main,
                {
                    ...convertCommon(main.id, 0),
                    type: 'checkbox',
                    name: `${main.name}-proficiency`,
                    value: ob.proficient,
                }
            ];
        }

        const convertCheckboxes = (ob: InternalTPCheckboxes, parentId: number, idx: number): Array<TPProperty> => {
            const main: TPNumeric = {
                ...convertCommon(parentId, idx),
                type: 'checkboxes',
                name: ob.name,
                value: ob.value,
                local: ob.local
            }

            return [main,
                {
                    ...convertCommon(main.id, 0),
                    type: 'number',
                    name: `${main.name}-max`,
                    value: ob.max,
                    formula: ob.maxFormula,
                    local: ob.local
                }
            ];
        }

        const convertAbility = (ob: InternalTPAbility, parentId: number, idx: number): Array<TPProperty> => {
            const main: TPNumeric = {
                ...convertCommon(parentId, idx),
                type: 'ability',
                name: ob.name,
                value: 0,
                formula: ob.formula,
                message: ob.message
            };

            return [main,
                {
                    ...convertCommon(main.id, 0),
                    type: 'number',
                    name: `${main.name}-score`,
                    value: ob.score,
                }
            ];
        }

        const convertHealth = (ob: InternalTPHealth, parentId: number, idx: number): Array<TPProperty> => {
            const main: TPNumeric = {
                ...convertCommon(parentId, idx),
                type: 'health',
                name: ob.name,
                value: ob.curr,
                local: ob.local
            }

            const ret: Array<TPProperty> = [main,
                {
                    ...convertCommon(main.id, 0),
                    type: 'number',
                    name: `${main.name}-maximum`,
                    value: ob.max,
                    local: ob.local
                }
            ];

            if (ob.temp !== undefined) {
                ret.push({
                    ...convertCommon(main.id, 1),
                    type: 'number',
                    name: `${main.name}-temporary`,
                    value: ob.temp,
                    local: ob.local
                });
            }

            return ret;
        }

        switch (child.type) {
            case 'appearance':
            case 'message':
            case 'text':
            case 'number':
            case 'paragraph':
            case 'checkbox': return convertSimple(child, parentId, idx);
            case 'health': return convertHealth(child, parentId, idx);
            case 'title-section': return convertSection(child, parentId, idx);
            case 'checkboxes': return convertCheckboxes(child, parentId, idx);
            case 'ability': return convertAbility(child, parentId, idx);
            case 'saving-throw': return convertSavingThrow(child, parentId, idx);
        }
    }

    const convertSection = (ob: InternalTPTab | InternalTPTitleSection, parentId: number | null, idx: number): Array<TPProperty> => {
        const main: any = {
            ...convertCommon(parentId, idx),
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


// type: | "table"
