import { convertInternalToExternal } from "./TPConverter";

export const example = (characterId: number) => convertInternalToExternal({
    id: characterId,
    private: false,
    appearance: '',
    tabs: [
        {
            type: 'tab-section',
            title: 'Character',
            children: [
                {
                    type: 'title-section',
                    title: 'Abilities',
                    collapsed: false,
                    private: false,
                    children: [
                        {
                            type: 'ability',
                            name: 'Muscle',
                            score: 27,
                            formula: '1 + floor (muscle-score / 5)',
                            message: '1d20 + muscle'
                        },
                        {
                            type: 'ability',
                            name: 'Clumsiness',
                            score: 39,
                            formula: '1 + floor (clumsiness-score / 5)',
                            message: '1d20 + clumsiness'
                        },
                    ]
                },
                {
                    type: 'horizontal-section',
                    panels: [
                        {
                            size: 3,
                            children: [
                                {
                                    type: 'skill',
                                    name: 'Opening-Jars',
                                    subtitle: 'Muscle',
                                    formula: '11 + (opening-jars-proficiency ? 3 : 0) + (opening-jars-expertise ? 5 : 0)',
                                    message: '{1d20 + opening-jars',
                                    proficiency: 'expert'
                                },
                                {
                                    type: 'skill-4',
                                    name: 'Pratfall',
                                    subtitle: 'Clumsiness',
                                    formula: '11 + (pratfall-trained ? 1 : 0) + (pratfall-expert ? 1 : 0) + (pratfall-master ? 1 : 0) + (pratfall-legendary ? 1 : 0)',
                                    message: '{1d20 + opening-jars',
                                    proficiency: 'master'
                                },
                            ]
                        },
                        {
                            size: 2,
                            children: [
                                {
                                    type: 'saving-throw',
                                    name: 'Embarrassing-Situations-Save',
                                    formula: '5 + (embarrassing-situations-safe-proficiency ? 4 : 0)',
                                    proficient: true,
                                    message: '{1d20 + embarrassing-situations-save}'
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'heading',
                    value: 'Other stuff'
                },
                {
                    type: 'paragraph',
                    value: 'Here you can find all the <b>other stuff</b>'
                },
                {
                    type: 'text',
                    name: 'Name',
                    value: 'Darren Elminster'
                },
                {
                    type: 'number',
                    name: 'ability-sum',
                    value: 0,
                    local: true,
                    formula: 'muscle + clumsiness'
                },
                {
                    type: 'health',
                    name: 'Attention Span',
                    max: 10,
                    curr: 5,
                    temp: 3
                },
                {
                    type: 'checkbox',
                    name: 'Hungry',
                    value: true
                },
                {
                    type: 'checkboxes',
                    name: 'Snacks',
                    value: 4,
                    maxFormula: '6 + (hungry ? 0 : 4)'
                }
            ]
        },
        {
            type: 'tab-section',
            title: 'Messages',
            children: [
                {
                    type: 'message',
                    name: 'In A Bottle',
                    message: '{1d10 + clumsiness}'
                }
            ]
        }
    ]
})