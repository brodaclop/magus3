import React, { ReactNode } from 'react';
import { Calculation, CalculationArgument, CalculationOperation } from '../model/Calculation';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

const printArgument = (op: CalculationArgument): ReactNode => {
    if ('opType' in op) {
        return <>{printOperation(op)}</>;
    } else {
        return <span><b>{op.label}</b> <i>({op.value})</i></span>;
    }
}

const printOperation = (op: CalculationOperation): ReactNode => {
    switch (op.opType) {
        case 'add':
            if (op.args.length === 1) {
                return printArgument(op.args[0]);
            }
            return <ul style={{ listStyleType: '"+ "' }}>
                {op.args.map(printArgument).map(x => <li>{x}</li>)}
            </ul>;
        case 'mul':
            if (op.args.length === 1) {
                return printArgument(op.args[0]);
            }
            return <ul style={{ listStyleType: '"* "' }}>
                {op.args.map(printArgument).map(x => <li>{x}</li>)}
            </ul>;
        case 'tizfolott': return <span>{printArgument(op.arg)} 10 fölötti része</span>;
        case 'max':
            if (op.args.length === 1) {
                return printArgument(op.args[0]);
            }

            const max = Calculation.calculate(op);
            const maxIdx = op.args.findIndex(arg => Calculation.calculate(arg) === max);

            return <ul style={{ listStyleType: '"> "' }}>
                {op.args.map(printArgument).map((x, idx) => <li>
                    {idx === maxIdx ? x : <s>{x}</s>}
                </li>)}
            </ul>
        case 'min':
            if (op.args.length === 1) {
                return printArgument(op.args[0]);
            }

            const min = Calculation.calculate(op);
            const minIdx = op.args.findIndex(arg => Calculation.calculate(arg) === min);

            return <ul style={{ listStyleType: '"< "' }}>
                {op.args.map(printArgument).map((x, idx) => <li>
                    {idx === minIdx ? x : <s>{x}</s>}
                </li>)}
            </ul>
    }
}

export const CalculationWidget: React.FC<{ calculation: CalculationArgument, children?: React.ReactNode }> = ({ calculation, children }) => {
    return <Tooltip placement='top' overlay={<div className='bordered calculation'>{printArgument(calculation)}</div>}>
        <span>{children ?? Calculation.calculate(calculation)}</span>
    </Tooltip>;
}