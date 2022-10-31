import { Karakter } from "./Karakter";
import { Kepessegek } from "./Kepessegek";

export interface CalculationValue {
    value: number;
    label: string;
}

export type CalculationOperationType = 'add' | 'tizfolott'

export interface CalculationAdd {
    opType: 'add',
    args: Array<CalculationArgument>,
}

export interface CalculationTizfolott {
    opType: 'tizfolott',
    arg: CalculationArgument,
}

export type CalculationOperation = CalculationAdd | CalculationTizfolott;

export type CalculationArgument = CalculationValue | CalculationOperation;

const calculateArgument = (op: CalculationArgument): number => {
    if ('opType' in op) {
        return calculateOperation(op);
    } else {
        return op.value;
    }
}

const calculateOperation = (op: CalculationOperation): number => {
    switch (op.opType) {
        case 'add': return op.args.map(calculateArgument).reduce((acc, curr) => acc + curr, 0);
        case 'tizfolott': const n = calculateArgument(op.arg); return n > 10 ? n - 10 : 0;
    }
}

const printArgument = (op: CalculationArgument): string => {
    if ('opType' in op) {
        return printOperation(op);
    } else {
        return op.label;
    }
}

const printOperation = (op: CalculationOperation): string => {
    switch (op.opType) {
        case 'add': return op.args.map(printArgument).join(' + ');
        case 'tizfolott': return `${printArgument(op.arg)} 10 fölötti része`;
    }
}


export const Calculation = {
    value: (label: string, value: number): CalculationValue => ({ label, value }),
    kepesseg: (kepessegek: Record<string, number>, id: string): CalculationValue => ({ label: Kepessegek.find(id).name, value: kepessegek[id] }),
    plusz: (...args: Array<CalculationArgument>): CalculationAdd => ({ opType: 'add', args }),
    tizFolottiResz: (kepessegek: Record<string, number>, id: string): CalculationTizfolott => ({ opType: 'tizfolott', arg: Calculation.kepesseg(kepessegek, id) }),
    calculate: (op: CalculationArgument): number => calculateArgument(op),
    print: (op: CalculationArgument): string => printArgument(op)
}

