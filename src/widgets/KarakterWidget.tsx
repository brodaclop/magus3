import React, { useMemo } from 'react';
import { Calculation } from '../model/Calculation';
import { Karakter, KarakterTemplate } from '../model/Karakter';
import { KarakterCalculator } from '../model/KarakterCalculator';
import { Kepessegek, KepessegKategoria } from '../model/Kepessegek';
import { CalculationWidget } from './CalculationWidget';
import { HarcertekWidget } from './HarcertekWidget';
import { KombatWidget } from './KombatWidget';

export const KarakterWidget: React.FC<{ karakter: Karakter, setKarakter: (k: Karakter) => unknown, template: KarakterTemplate, setTemplate: (t: KarakterTemplate) => unknown }> = ({ karakter, setKarakter, template, setTemplate }) => {
    const karakterCalc = useMemo(() => KarakterCalculator.calc(karakter), [karakter]);

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
                    <p><CalculationWidget calculation={karakterCalc.ep}>ÉP</CalculationWidget>: {Calculation.calculate(karakterCalc.ep)}</p>
                    <p><CalculationWidget calculation={karakterCalc.fp}>FP</CalculationWidget>: {Calculation.calculate(karakterCalc.fp)}</p>
                    <p>Szint: {karakter.szint.length - 1} <button disabled={!!karakter.hm} onClick={() => setKarakter({ ...Karakter.levelUp(karakter) })}>+</button></p>
                </th>
                <th>
                    <HarcertekWidget karakter={karakter} setKarakter={setKarakter} />
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
            <tr>
                <td colSpan={5}>
                    <KombatWidget calc={karakterCalc} karakter={karakter} onChange={k => setKarakter({ ...k })} />
                </td>
            </tr>
            <tr>
                <td colSpan={5}>
                    <p>KP: {karakter.kp}</p>
                    <p>%: {karakter.szazalek}</p>
                </td>
            </tr>
        </tbody>
    </table>;
}