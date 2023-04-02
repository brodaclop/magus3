import { Character, ChildProperty, Appearance, Message, Text, Paragraph, NumberProp, Checkbox, SavingThrow, Skill, Skill4, HorizontalSection, Checkboxes, Ability, Health, Tab, TitleSection } from "./InternalTypes";
import { TPCharacter, TPProperty } from "./RawTypes";



export const convertInternalToExternal = (character: Character): TPCharacter => {
    let nextId = 1;

    const convertCommon = (parentId: number | null, idx: number): Pick<TPProperty, 'id' | 'characterId' | 'parentId' | 'rank'> => ({
        id: nextId++,
        parentId,
        characterId: character.id,
        rank: idx + 1
    });

    const convertChild = (child: ChildProperty, parentId: number, idx: number): TPProperty | Array<TPProperty> => {
        const convertSimple = (ob: Appearance | Message | Text | Paragraph | NumberProp | Checkbox, parentId: number, idx: number): TPProperty => ({
            ...convertCommon(parentId, idx),
            ...ob
        })

        const convertSavingThrow = (ob: SavingThrow, parentId: number, idx: number): Array<TPProperty> => {
            const main: TPProperty = {
                ...convertCommon(parentId, idx),
                type: 'saving-throw',
                value: 0,
                name: ob.name,
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

        const convertSkill = (ob: Skill | Skill4, parentId: number, idx: number): Array<TPProperty> => {
            const main: TPProperty = {
                ...convertCommon(parentId, idx),
                type: ob.type,
                name: ob.name,
                value: 0,
                formula: ob.formula,
                message: ob.message,
                data: {
                    subtitle: ob.subtitle ?? ''
                }
            };

            const levels: Array<TPProperty> = ob.type === 'skill' ? [
                {
                    ...convertCommon(main.id, 0),
                    type: 'checkbox',
                    name: `${main.name}-proficiency`,
                    value: !!ob.proficiency,
                },
                {
                    ...convertCommon(main.id, 0),
                    type: 'checkbox',
                    name: `${main.name}-expertise`,
                    value: ob.proficiency === 'expert',
                }
            ] : [
                {
                    ...convertCommon(main.id, 0),
                    type: 'checkbox',
                    name: `${main.name}-trained`,
                    value: !!ob.proficiency,
                },
                {
                    ...convertCommon(main.id, 0),
                    type: 'checkbox',
                    name: `${main.name}-expert`,
                    value: ob.proficiency === 'expert' || ob.proficiency === 'master' || ob.proficiency === 'legend',
                },
                {
                    ...convertCommon(main.id, 0),
                    type: 'checkbox',
                    name: `${main.name}-master`,
                    value: ob.proficiency === 'master' || ob.proficiency === 'legend',
                },
                {
                    ...convertCommon(main.id, 0),
                    type: 'checkbox',
                    name: `${main.name}-legendary`,
                    value: ob.proficiency === 'legend',
                }
            ];

            return [
                main,
                ...levels
            ];
        }

        const convertHorizontalSection = (ob: HorizontalSection, parentId: number, idx: number): Array<TPProperty> => {
            const main: TPProperty = {
                ...convertCommon(parentId, idx),
                type: ob.type,
            };

            const sizeSum = ob.panels.reduce((acc, curr) => acc + curr.size, 0);

            const panels: Array<TPProperty> = ob.panels.map((panel, panelIdx) => ({
                ...convertCommon(main.id, panelIdx),
                type: 'section',
                size: panel.size * 100.0 / sizeSum
            }))

            const panelChildren: Array<TPProperty> = ob.panels.flatMap((panel, panelIdx) => panel.children.flatMap(child => convertChild(child, panels[panelIdx].id, panelIdx)));

            return [
                main,
                ...panels,
                ...panelChildren
            ];
        }

        const convertCheckboxes = (ob: Checkboxes, parentId: number, idx: number): Array<TPProperty> => {
            const main: TPProperty = {
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
                    value: ob.max ?? 0,
                    formula: ob.maxFormula,
                    local: ob.local
                }
            ];
        }

        const convertAbility = (ob: Ability, parentId: number, idx: number): Array<TPProperty> => {
            const main: TPProperty = {
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

        const convertHealth = (ob: Health, parentId: number, idx: number): Array<TPProperty> => {
            const main: TPProperty = {
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
            case 'heading':
            case 'checkbox': return convertSimple(child, parentId, idx);
            case 'health': return convertHealth(child, parentId, idx);
            case 'title-section': return convertSection(child, parentId, idx);
            case 'horizontal-section': return convertHorizontalSection(child, parentId, idx);
            case 'checkboxes': return convertCheckboxes(child, parentId, idx);
            case 'ability': return convertAbility(child, parentId, idx);
            case 'saving-throw': return convertSavingThrow(child, parentId, idx);
            case 'skill-4':
            case 'skill': return convertSkill(child, parentId, idx);
        }
    }

    const convertSection = (ob: Tab | TitleSection, parentId: number | null, idx: number): Array<TPProperty> => {
        const main: any = {
            ...convertCommon(parentId, idx),
            type: ob.type,
            data: ob.type === 'tab-section' ? {} : { collapsed: ob.collapsed ?? false },
            value: ob.title,
        };
        if (ob.type === 'title-section') {
            main.private = ob.private;
        }
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


// TODO: type "table" is missing
// TODO: type 'appearance' isn't working
// TODO: type 'filter list' is missing
