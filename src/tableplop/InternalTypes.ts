export interface Tab {
    type: 'tab-section',
    title: string;
    children: Array<ChildProperty>;
}

export interface HorizontalSection {
    type: 'horizontal-section',
    panels: [{
        size: number;
        children: Array<ChildProperty>;
    }, {
        size: number;
        children: Array<ChildProperty>;
    }]

}

export interface TitleSection {
    type: 'title-section',
    title: string;
    collapsed?: boolean;
    private?: boolean;
    children: Array<ChildProperty>;
}

export interface Text {
    type: 'text';
    name: string;
    value: string;
    local?: boolean;
}

export interface Paragraph {
    type: 'paragraph' | 'heading';
    value: string;
}

export interface NumberProp {
    type: 'number';
    name: string;
    value: number;
    formula?: string;
    local?: boolean;
    message?: string;
}

export interface Ability {
    type: 'ability';
    name: string;
    score: number;
    formula: string;
    message?: string;
}

export interface Skill {
    type: 'skill';
    name: string;
    formula: string;
    proficiency?: 'proficient' | 'expert';
    subtitle?: string;
    message?: string;
}

export interface Skill4 {
    type: 'skill-4',
    name: string;
    formula: string;
    proficiency?: 'trained' | 'expert' | 'master' | 'legend';
    subtitle?: string;
    message?: string;
}

export interface Checkbox {
    type: 'checkbox';
    name: string;
    value: boolean;
    local?: boolean;
}

interface CheckboxesBase {
    type: 'checkboxes';
    name: string;
    value: number;
    local?: boolean;
}

interface ChecbkoxesWithMax extends CheckboxesBase {
    max: number;
    maxFormula?: never;
}

interface ChecbkoxesWithMaxFormula extends CheckboxesBase {
    max?: never;
    maxFormula?: string;
}

export type Checkboxes = ChecbkoxesWithMax | ChecbkoxesWithMaxFormula;


export interface Health {
    type: 'health';
    name: string;
    max: number;
    curr: number;
    temp?: number;
    local?: boolean;
}

export interface Message {
    type: 'message';
    name: string;
    message: string;
}

export interface Appearance {
    type: 'appearance';
    data: unknown;
}

export interface SavingThrow {
    type: 'saving-throw';
    name: string;
    formula: string;
    proficient: boolean;
    message?: string;
}

export type ChildProperty = Message | Text | NumberProp | Health | Appearance | TitleSection | Checkbox | Checkboxes | Paragraph | Ability | SavingThrow | Skill | Skill4 | HorizontalSection;

export interface Character {
    id: number;
    private: boolean;
    appearance: string;
    tabs: Array<Tab>;
}
