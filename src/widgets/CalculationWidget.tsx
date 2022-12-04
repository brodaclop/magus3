import React from 'react';
import { Calculation, CalculationArgument, CalculationOperation } from '../model/Calculation';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

const printArgument = (op: CalculationArgument) => {
    if ('opType' in op) {
        return <>{printOperation(op)}</>;
    } else {
        return <span>{op.label} <i>({op.value})</i></span>;
    }
}

const printOperation = (op: CalculationOperation) => {
    switch (op.opType) {
        case 'add': return <ul style={{ listStyleType: '"+ "' }}>
            {op.args.map(printArgument).map(x => <li>{x}</li>)}
        </ul>;
        case 'tizfolott': return <span>{printArgument(op.arg)} 10 fölötti része</span>;
        case 'max': return <ul style={{ listStyleType: '"> "' }}>
            {op.args.map(printArgument).map(x => <li>{x}</li>)}
        </ul>
        case 'min': return <ul style={{ listStyleType: '"< "' }}>
            {op.args.map(printArgument).map(x => <li>{x}</li>)}
        </ul>
    }
}

export const CalculationWidget: React.FC<{ calculation: CalculationArgument, children?: React.ReactNode }> = ({ calculation, children }) => {
    return <Tooltip placement='right' overlay={printArgument(calculation)}>
        <span>{children ?? Calculation.calculate(calculation)}</span>
    </Tooltip>;
}