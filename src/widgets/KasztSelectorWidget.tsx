import React from 'react';
import { Kasztok } from '../model/Kasztok';

export const KasztSelectorWidget: React.FC<{ kaszt: string, onChange: (kaszt: string) => unknown }> = ({ kaszt, onChange }) => {
    return <select value={kaszt} onChange={e => onChange(e.target.value)}>
        {Kasztok.lista.filter(k => k.fokaszt === undefined).map(k => {
            const alkasztok = Kasztok.lista.filter(kaszt => kaszt.fokaszt === k.id);
            if (alkasztok.length === 0) {
                return <option value={k.id}>{k.name}</option>
            } else {
                return <optgroup label={k.name}>
                    <option value={k.id}>{k.name}</option>
                    {alkasztok.map(ak => <option value={ak.id}>{ak.name}</option>)}
                </optgroup>
            }
        })}
    </select>
}