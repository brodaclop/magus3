import React, { useEffect, useMemo, useState } from 'react';
import { Calculation } from '../model/Calculation';
import { Harcertek } from '../model/Harcertek';
import { Karakter } from '../model/Karakter';


const HARCERTEKEK: Record<keyof Harcertek, string> = {
    ke: 'KÉ',
    te: 'TÉ',
    ve: 'VÉ',
    ce: 'CÉ',
};

export const HarcertekWidget: React.FC<{ karakter: Karakter, setKarakter: (k: Karakter) => unknown }> = ({ karakter, setKarakter }) => {
    const karakterCalc = useMemo(() => Karakter.calc(karakter), [karakter]);

    const [maradekHm, setMaradekHm] = useState<number>(0);
    const [elosztott, setElosztott] = useState<Harcertek>({ ke: 0, te: 0, ve: 0, ce: 0 });

    useEffect(() => {
        setMaradekHm(karakter.hm);
        setElosztott({ ke: 0, te: 0, ve: 0, ce: 0 });
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

    const HmLine: React.FC<{ line: keyof Harcertek }> = ({ line }) => <p>
        {HARCERTEKEK[line]}
        <i>({Calculation.print(karakterCalc.harcertek[line])})</i>:
        <button onClick={() => minusz(line)}>-</button>
        {Calculation.calculate(karakterCalc.harcertek[line]) + elosztott[line]}
        <button onClick={() => plusz(line)}>+</button>
    </p>;


    return <div style={{ textAlign: 'left' }}>
        <p>HM: {maradekHm}</p>
        <HmLine line='ke' />
        <HmLine line='te' />
        <HmLine line='ve' />
        <HmLine line='ce' />
        <button onClick={() => {
            karakter.harcertek = Harcertek.add(karakter.harcertek, elosztott);
            karakter.hm = maradekHm;
            setKarakter({ ...karakter });
        }}>Hozzáad</button>
    </div>;
}