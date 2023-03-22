import React, { useEffect, useMemo, useState } from 'react';
import { Calculation } from '../model/Calculation';
import { Harcertek } from '../model/Harcertek';
import { Karakter } from '../model/Karakter';
import { KarakterCalculator } from '../model/KarakterCalculator';
import { CalculationWidget } from './CalculationWidget';


const HARCERTEKEK: Record<keyof Harcertek, string> = {
    ke: 'KÉ',
    te: 'TÉ',
    ve: 'VÉ',
    ce: 'CÉ',
    sebzes: 'Sebzés'
};

export const HarcertekWidget: React.FC<{ karakter: Karakter, setKarakter: (k: Karakter) => unknown }> = ({ karakter, setKarakter }) => {
    const karakterCalc = useMemo(() => KarakterCalculator.calc(karakter), [karakter]);

    const [maradekHm, setMaradekHm] = useState<number>(0);
    const [elosztott, setElosztott] = useState<Harcertek>({ ke: 0, te: 0, ve: 0, ce: 0, sebzes: 0 });

    const sumElosztott = useMemo(() => elosztott.ke + elosztott.te + elosztott.ve + elosztott.ce, [elosztott]);

    const editing = maradekHm + sumElosztott > 0;

    useEffect(() => {
        setMaradekHm(karakter.hm);
        setElosztott({ ke: 0, te: 0, ve: 0, ce: 0, sebzes: 0 });
    }, [karakter.hm]);

    const minusz = (line: keyof Harcertek) => {
        if (elosztott[line] > 0) {
            setElosztott({ ...elosztott, [line]: elosztott[line] - 1 });
            setMaradekHm(maradekHm + 1);
        }
    };

    const plusz = (line: keyof Harcertek) => {
        if (maradekHm > 0) {
            setElosztott({ ...elosztott, [line]: elosztott[line] + 1 });
            setMaradekHm(maradekHm - 1);
        }
    }

    const HmLine: React.FC<{ line: keyof Harcertek }> = ({ line }) => <tr>
        <th>{HARCERTEKEK[line]}</th>
        <td>
            {editing && <button onClick={() => minusz(line)}>-</button>}
        </td>
        <td>
            <div style={{ marginLeft: '0.5em', marginRight: '0.5em' }}>
                <CalculationWidget calculation={karakterCalc.harcertek[line]}>{Calculation.calculate(karakterCalc.harcertek[line]) + elosztott[line]}</CalculationWidget>
            </div>
        </td>
        <td style={{ border: '1px solid black' }}>
            {editing && <button onClick={() => plusz(line)}>+</button>}
        </td>
    </tr >;


    return <table className='bordered'>
        <thead>
            <tr>
                <th colSpan={4}>Harcérték</th>
            </tr>
            {maradekHm + sumElosztott > 0 &&
                <tr>
                    <th>
                        HM
                    </th>
                    <th colSpan={3}>
                        {maradekHm}
                    </th>
                </tr>
            }
        </thead>
        <tbody>
            <HmLine line='ke' />
            <HmLine line='te' />
            <HmLine line='ve' />
            <HmLine line='ce' />
            {karakter.hm >= 1 &&
                <tr>
                    <td colSpan={4} style={{ textAlign: 'center', backgroundColor: 'lightpink' }}>
                        <button
                            disabled={karakter.hm - maradekHm < 1}
                            onClick={() => {
                                karakter.szint[karakter.szint.length - 1].harcertek = Harcertek.add(karakter.szint[karakter.szint.length - 1].harcertek, elosztott);
                                karakter.hm = maradekHm;
                                setKarakter({ ...karakter });
                            }}>Eloszt</button>

                    </td>
                </tr>
            }
        </tbody>
    </table>
}