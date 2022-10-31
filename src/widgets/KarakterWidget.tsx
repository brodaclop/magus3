import React, { useMemo } from 'react';
import { Calculation } from '../model/Calculation';
import { Karakter, KarakterTemplate } from '../model/Karakter';
import { Kepessegek, KepessegKategoria } from '../model/Kepessegek';

export const KarakterWidget: React.FC<{ karakter: Karakter, setKarakter: (k: Karakter) => unknown, template: KarakterTemplate, setTemplate: (t: KarakterTemplate) => unknown }> = ({ karakter, setKarakter, template, setTemplate }) => {
    const karakterCalc = useMemo(() => Karakter.calc(karakter), [karakter]);

    const commit = () => {
        setKarakter({ ...karakter });
        setTemplate({ ...template });
    }

    const plusz = (id: string, shouldCommit = true): boolean => {
        const kategoria = Kepessegek.find(id).kategoria;
        if (template.kepessegKategoriak[kategoria] > 0 && karakter.kepessegek[id] < 20) {
            karakter.kepessegek[id]++;
            template.kepessegKategoriak[kategoria]--;
            if (shouldCommit) {
                commit();
            }
            return true;
        }
        return false;
    }

    const minusz = (id: string, shouldCommit = true): boolean => {
        const kategoria = Kepessegek.find(id).kategoria;
        if (karakter.kepessegek[id] > 0) {
            karakter.kepessegek[id]--;
            template.kepessegKategoriak[kategoria]++;
            if (shouldCommit) {
                commit();
            }
            return true;
        }
        return false;
    }

    const eloszt = (kategoria: KepessegKategoria) => {
        const kepessegek = Kepessegek.lista.filter(k => k.kategoria === kategoria);
        let end = false;
        while (!end) {
            end = kepessegek.map(k => plusz(k.id, false)).every(b => !b);
        }
        commit();
    }

    return <table style={{ borderCollapse: 'collapse' }}>
        <thead>
            <tr>
                <th>Kategória</th>
                <th />
                <th>Képesség</th>
                <th style={{ textAlign: 'left' }}>
                    <p>ÉP <i>({Calculation.print(karakterCalc.ep)})</i>: {Calculation.calculate(karakterCalc.ep)}</p>
                    <p>FP <i>({Calculation.print(karakterCalc.fp)})</i>: {Calculation.calculate(karakterCalc.fp)}</p>
                    <p>KÉ <i>({Calculation.print(karakterCalc.harcertek.ke)})</i>: {Calculation.calculate(karakterCalc.harcertek.ke)}</p>
                    <p>TÉ <i>({Calculation.print(karakterCalc.harcertek.te)})</i>: {Calculation.calculate(karakterCalc.harcertek.te)}</p>
                    <p>VÉ <i>({Calculation.print(karakterCalc.harcertek.ve)})</i>: {Calculation.calculate(karakterCalc.harcertek.ve)}</p>
                    <p>CÉ <i>({Calculation.print(karakterCalc.harcertek.ce)})</i>: {Calculation.calculate(karakterCalc.harcertek.ce)}</p>
                </th>
            </tr>
        </thead>
        <tbody>
            {Kepessegek.lista.map((rd, idx) => <tr style={{ borderTop: idx % 3 === 0 ? '1px black solid' : '', borderBottom: idx % 3 === 2 ? '1px black solid' : '' }}>
                {idx % 3 === 0 && <td rowSpan={3}>{rd.kategoria}</td>}
                {idx % 3 === 0 && <td rowSpan={3} style={{ borderRight: '1px black solid' }}>{template.kepessegKategoriak[rd.kategoria]}
                    <button onClick={() => eloszt(rd.kategoria)}>Eloszt</button>
                </td>}
                <td>{rd.name}</td>
                <td>
                    <button onClick={e => minusz(rd.id)}>-</button>
                    <span style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>{karakterCalc.kepessegek[rd.id]}</span>
                    <button onClick={e => plusz(rd.id)}>+</button>
                </td>
            </tr>)}
        </tbody>
    </table>;
}