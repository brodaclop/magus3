import { Kepessegek } from "./Kepessegek";

export interface CalculationValue {
    value: number;
    label: string;
}

export type CalculationOperationType = 'add' | 'tizfolott' | 'max' | 'min';

export interface CalculationBinary {
    opType: 'add' | 'max' | 'min',
    args: Array<CalculationArgument>,
}

export interface CalculationTizfolott {
    opType: 'tizfolott',
    arg: CalculationArgument,
}

export type CalculationOperation = CalculationBinary | CalculationTizfolott;

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
        case 'max': return Math.max(...op.args.map(calculateArgument));
        case 'min': return Math.min(...op.args.map(calculateArgument));
    }
}

const constructBinaryOp = (opType: CalculationBinary['opType'], args: Array<CalculationArgument>) => ({
    opType,
    args: args.flatMap(a => (('opType' in a) && a.opType === opType) ? a.args : [a])
});


export const Calculation = {
    value: (label: string, value: number): CalculationValue => ({ label, value }),
    kepesseg: (kepessegek: Record<string, number>, id: string): CalculationValue => ({ label: Kepessegek.find(id).name, value: kepessegek[id] }),
    plusz: (...args: Array<CalculationArgument>): CalculationBinary => constructBinaryOp('add', args),
    max: (...args: Array<CalculationArgument>): CalculationBinary => constructBinaryOp('max', args),
    min: (...args: Array<CalculationArgument>): CalculationBinary => constructBinaryOp('min', args),
    remove: (op: CalculationBinary, ...id: Array<string>) => { op.args = op.args.filter(a => !('label' in a) || !id.includes(a.label)); return op },
    tizFolottiResz: (kepessegek: Record<string, number>, id: string): CalculationTizfolott => ({ opType: 'tizfolott', arg: Calculation.kepesseg(kepessegek, id) }),
    calculate: (op: CalculationArgument): number => calculateArgument(op),
}

