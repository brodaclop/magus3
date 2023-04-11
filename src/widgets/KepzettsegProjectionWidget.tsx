import React from 'react';
import { Karakter } from '../model/Karakter';
import { KarakterCalcResult } from '../model/KarakterCalculator';
import { Kepessegek } from '../model/Kepessegek';
import { Kepzettseg } from '../model/Kepzettseg';
import { constructArray, printNumber } from '../model/util';
import { KepzettsegLeiras } from './entities/KepzettsegLeiras';

export const KepzettsegProjectionWidget: React.FC<{ karakter: Karakter, calc: KarakterCalcResult, kepzettseg: Kepzettseg }> = ({ karakter, calc, kepzettseg }) => {

    const renderRow = (k: Kepzettseg, elosztottKp: number, secondary: boolean) => {
        return <tr key={k.id} style={{ fontStyle: secondary ? 'italic' : undefined }}>
            <td><span><KepzettsegLeiras kepzettseg={k} /></span></td>
            {k.fajta === 'szazalekos' ? <td colSpan={5} style={{ textAlign: 'center' }}><span style={{ color: 'goldenrod' }}>(+{printNumber(Math.floor(elosztottKp * 3))}%)</span></td> :
                constructArray(5, i => {
                    const meglevo = calc.findNormalKepzettseg(k.id);
                    if ((meglevo?.fok ?? 0) > i) {
                        return <td />;
                    }
                    const aktualisFok = (meglevo?.fok ?? 0) === i;
                    const kp = Kepzettseg.kpFokhoz(calc.kepessegek, k, i + 1) - (aktualisFok ? (meglevo?.kp ?? 0) : 0);
                    return <td>{kp} {aktualisFok && <span style={{ color: 'goldenrod' }}>(-{printNumber(elosztottKp)})</span>}</td>;
                })}
            <td><span>{k.fajta === 'normal' && Kepessegek.name(k.kepesseg)}</span></td>

        </tr>;

    }


    return <table className='kpFokhozTable'>
        <thead>
            <tr>
                <th />
                <th colSpan={5}>KP</th>
                <th />
            </tr>
            <tr style={{ textAlign: 'left' }}>
                <th>Képzettség</th>
                {constructArray(5, i => <th>{i + 1}. fok</th>)}
                <th>Tulajdonság</th>
            </tr>
        </thead>
        <tbody>
            {renderRow(kepzettseg, 1, false)}
            {kepzettseg.fajta === 'normal' && kepzettseg.linked.map(link => renderRow(Kepzettseg.find(link.id), link.strength, true))}
        </tbody>
    </table>
}