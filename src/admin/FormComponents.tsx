import React, { useCallback, useState, useEffect } from 'react';
import { NamedEntity } from '../model/util';
import './form.css';

interface StringEditorDescriptor {
    type: 'string';
    label: string;
    long?: boolean;
}

interface NumberEditorDescriptor {
    type: 'number';
    label: string;
}


interface PicklistEditorDescriptor {
    type: 'picklist';
    label: string;
    multiple: boolean;
    values: readonly string[] | readonly NamedEntity[];
}


export interface ObjectEditorDescriptor {
    type: 'object';
    label: string;
    children: Record<string, EditorDescriptor>;
}

export interface ChoiceEditorDescriptor {
    type: 'choice';
    choices: Record<string, EditorDescriptor>;
    label: string;
    autoSelector: (value: unknown) => string;
}


interface ArrayEditorDescriptor {
    type: 'array';
    label: string;
    fix?: number;
    idxStart?: number;
    children: EditorDescriptor;
}

export type EditorDescriptor = ChoiceEditorDescriptor | StringEditorDescriptor | NumberEditorDescriptor | ObjectEditorDescriptor | ArrayEditorDescriptor | PicklistEditorDescriptor;

export const Editor = {
    string: (label: string): StringEditorDescriptor => ({ label, type: 'string' }),
    longString: (label: string): StringEditorDescriptor => ({ label, long: true, type: 'string' }),
    number: (label: string): NumberEditorDescriptor => ({ label, type: 'number' }),
    picklist: (label: string, values: readonly string[] | readonly NamedEntity[]): PicklistEditorDescriptor => ({ label, values, multiple: false, type: 'picklist' }),
    multiPicklist: (label: string, values: readonly string[] | readonly NamedEntity[]): PicklistEditorDescriptor => ({ label, values, multiple: true, type: 'picklist' }),
    array: (label: string, children: EditorDescriptor, idxStart?: number): ArrayEditorDescriptor => ({ label, children, idxStart, type: 'array' }),
    fixArray: (label: string, children: EditorDescriptor, fix: number, idxStart?: number): ArrayEditorDescriptor => ({ label, children, fix, idxStart, type: 'array' }),
    object: <T,>(label: string, children: Record<keyof T, EditorDescriptor>): ObjectEditorDescriptor => ({ label, children, type: 'object' }),
    or: (choices: Record<string, EditorDescriptor>, autoSelector: (value: unknown) => string): ChoiceEditorDescriptor => ({ label: '', choices, type: 'choice', autoSelector }),
}

export const StringEditor: React.FC<{ desc: StringEditorDescriptor, value: string | undefined, onChange: (value: string) => unknown }> = ({ desc, value, onChange }) => {
    return <div className='stringEditor'>
        <label style={{ verticalAlign: 'top' }}>{desc.label}: </label>
        {desc.long ? <textarea value={value ?? ''} onChange={e => onChange(e.target.value)} /> : <input type='text' value={value ?? ''} onChange={e => onChange(e.target.value)} />}
    </div>;
}

export const NumberEditor: React.FC<{ desc: NumberEditorDescriptor, value: number | undefined, onChange: (value: number) => unknown }> = ({ desc, value, onChange }) => {
    return <div className='numberEditor'>
        <label>{desc.label}: </label>
        <input type='number' value={value ?? ''} onChange={e => onChange(Number(e.target.value))} />
    </div>;
}

export const PicklistEditor: React.FC<{ desc: PicklistEditorDescriptor, value: string | string[] | undefined, onChange: (value: string | string[]) => unknown }> = ({ desc, value, onChange }) => {
    const selectValue = desc.multiple ? (typeof value === 'string' ? [value] : (value ?? [])) : (value ?? '');
    return <div className='picklistEditor'>
        <label>{desc.label}: </label>
        <select multiple={desc.multiple} size={desc.multiple ? desc.values.length : undefined} value={selectValue} onChange={e => {
            onChange(desc.multiple ? Array.from(e.target.selectedOptions, o => o.value) : e.target.value);
        }}>
            {!desc.multiple && <option disabled value={''}></option>}
            {desc.values.map(v => <option value={typeof v === 'string' ? v : v.id}>{typeof v === 'string' ? v : v.name}</option>)}
        </select>
    </div>;
}

export const ArrayEditor: React.FC<{ desc: ArrayEditorDescriptor, value: Array<unknown>, onChange: (value: Array<unknown>) => unknown }> = ({ desc, value, onChange }) => {
    return <div className='arrayEditor'>
        <label>{desc.label}</label>
        <div>
            {value.map((v, idx) => <div>
                <AnyEditor desc={{ ...desc.children, label: `${idx + (desc.idxStart ?? 0)}. ${desc.children.label}` }} value={v} onChange={newValue => {
                    value[idx] = newValue;
                    onChange(value);
                }} />
                {!desc.fix && <button onClick={() => {
                    value.splice(idx, 1);
                    onChange(value);
                }}>x</button>}
            </div>)}

            {!desc.fix && <button className='addButton' onClick={() => {
                value.push(undefined);
                onChange(value);
            }}>+</button>}
        </div>
    </div>
}


export const ObjectEditor: React.FC<{ desc: ObjectEditorDescriptor, value: Record<string, unknown>, onChange: (value: Record<string, unknown>) => unknown }> = ({ desc, value, onChange }) => {
    const childOnChange = useCallback((key: string, v: unknown) => {
        value[key] = v;
        onChange(value);
    }, [value, onChange]);
    return <div className='objectEditor'>
        <label>{desc.label}</label>
        <div>
            {Object.entries(desc.children).map(([key, childDescriptor]) => <AnyEditor desc={childDescriptor} value={value[key]} onChange={v => childOnChange(key, v)} />)}
        </div>
    </div>;
}

export const ChoiceEditor: React.FC<{ desc: ChoiceEditorDescriptor, value: Record<string, unknown>, onChange: (value: unknown) => unknown }> = ({ desc, value, onChange }) => {
    const [selected, setSelected] = useState<string>();
    const [fixed, setFixed] = useState<boolean>(false);
    useEffect(() => {
        const autoSelected = desc.autoSelector(value);
        if (autoSelected) {
            setSelected(autoSelected);
            setFixed(true);
        } else {
            setFixed(false);
        }
    }, [value, desc]);
    return <div className='choiceEditor'>
        <div>
            {Object.keys(desc.choices).map(label => <div>
                <input key={label} type='radio' disabled={fixed} value={label} checked={label === selected} onChange={e => setSelected(e.currentTarget.value)} />{label}
            </div>)}
        </div>
        <div>
            {selected && <AnyEditor desc={desc.choices[selected]} value={value} onChange={onChange} />}
        </div>
    </div>
}

export const AnyEditor: React.FC<{ desc: EditorDescriptor, value: unknown, onChange: (value: unknown) => unknown }> = ({ desc, value, onChange }) => {
    switch (desc.type) {
        case 'string': return <StringEditor desc={desc} value={value as string} onChange={onChange} />;
        case 'number': return <NumberEditor desc={desc} value={value as number} onChange={onChange} />;
        case 'picklist': return <PicklistEditor desc={desc} value={value as string} onChange={onChange} />;
        case 'object': return <ObjectEditor desc={desc} value={value as Record<string, unknown> ?? {}} onChange={onChange} />;
        case 'array': return <ArrayEditor desc={desc} value={value as Array<unknown> ?? Array(desc.fix ?? 0).fill(undefined)} onChange={onChange} />;
        case 'choice': return <ChoiceEditor desc={desc} value={value as Record<string, unknown> ?? {}} onChange={onChange} />;
        default: throw new Error('unknown type');
    }
}
