import React from 'react';
import { Calculation } from '../model/Calculation';
import { KOZELHARCI_FEGYVEREK, SebzesTipus, SEBZESTIPUS_LABEL } from '../model/Fegyver';
import { Karakter } from '../model/Karakter';
import { KarakterCalcResult } from '../model/KarakterCalculator';
import { Kepzettseg } from '../model/Kepzettseg';
import { printKocka } from '../model/Kocka';
import { Lofegyver } from '../model/Lofegyver';
import { CalculationWidget } from './CalculationWidget';
import { FegyverSelection } from './FegyverSelection';
import { KepzettsegLeiras } from './KepzettsegLeiras';


export const formatSebzesTipus = (t: SebzesTipus | Array<SebzesTipus>): string =>
    (typeof t === 'string' ? [t] : t).sort().map(o => SEBZESTIPUS_LABEL[o]).join('/') || '-';



export const KombatWidget: React.FC<{ karakter: Karakter, calc: KarakterCalcResult, onChange: (karakter: Karakter) => unknown }> = ({ karakter, calc, onChange }) => {
    const harcmodorKepzettseg = calc.harcmodor && Kepzettseg.find(`harcmodor:${calc.harcmodor?.id}`);
    const harcmodorFok = calc.kepzettsegek.normal.find(k => k.kepzettseg.id === harcmodorKepzettseg?.id)?.fok ?? 0;
    return <table style={{ border: '3px solid black', borderCollapse: 'collapse', textAlign: 'center' }}>
        <thead>
            <tr>
                <th colSpan={5}>Harc</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th style={{ border: '1px solid black', width: '20%' }}>&nbsp;</th>
                <td style={{ border: '1px solid black', width: '40%' }}>
                    <FegyverSelection
                        fegyverek={KOZELHARCI_FEGYVEREK.filter(f => Karakter.megfoghato(karakter, 0, f))}
                        emptyEnabled={false}
                        current={karakter.kezek[0]}
                        onChange={f => {
                            karakter.kezek[0] = f;
                            onChange(karakter);
                        }} />
                </td>
                <td style={{ border: '1px solid black', width: '40%' }}>
                    <FegyverSelection
                        fegyverek={KOZELHARCI_FEGYVEREK.filter(f => Karakter.megfoghato(karakter, 1, f))}
                        emptyEnabled={Karakter.megfoghato(karakter, 1, undefined)}
                        current={karakter.kezek[1]}
                        onChange={f => {
                            karakter.kezek[1] = f;
                            onChange(karakter);
                        }} />
                </td>
                <td style={{ border: '1px solid black', width: '40%' }} colSpan={2}>
                    <select value={karakter.lofegyver?.id ?? ''} onChange={e => {
                        karakter.lofegyver = e.target.value === '' ? undefined : Lofegyver.find(e.target.value);
                        onChange(karakter);
                    }}>
                        <option value=''>Lőfegyver nélkül</option>
                        {Lofegyver.lista.map(l => <option value={l.id}>{l.name}</option>)}
                    </select>
                </td>
            </tr>
            <tr>
                <th>KÉ</th>
                <td style={{ border: '1px solid black', textAlign: 'center' }} colSpan={2}>
                    <CalculationWidget calculation={calc.fegyverrel.ke} />
                </td>
                <th>KÉ</th>
                <td style={{ border: '1px solid black', textAlign: 'center' }}>
                    {calc.lofegyverrel ? <CalculationWidget calculation={calc.lofegyverrel.ke} /> : '-'}
                </td>
            </tr>
            <tr>
                <th>TÉ</th>
                <td style={{ border: '1px solid black' }}>
                    {calc.fegyverrel.kezek[0] && <CalculationWidget calculation={calc.fegyverrel.kezek[0].te} />}

                </td>
                <td style={{ border: '1px solid black' }}>
                    {calc.fegyverrel.kezek[1] && <CalculationWidget calculation={calc.fegyverrel.kezek[1].te} />}
                </td>
                <th>CÉ</th>
                <td style={{ border: '1px solid black' }}>
                    {calc.lofegyverrel && <CalculationWidget calculation={calc.lofegyverrel.ce} />}
                </td>
            </tr>
            <tr>
                <th>Sebzés</th>
                <td style={{ border: '1px solid black' }}>
                    {calc.fegyverrel.kezek[0] && <>{printKocka(calc.fegyverrel.kezek[0].sebzes)} {formatSebzesTipus(karakter.kezek[0]?.sebzestipus ?? [])}</>}
                </td>
                <td style={{ border: '1px solid black' }}>
                    {calc.fegyverrel.kezek[1] && <>{printKocka(calc.fegyverrel.kezek[1].sebzes)} {formatSebzesTipus(karakter.kezek[1]?.sebzestipus ?? [])}</>}
                </td>
                <th>Sebzés</th>
                <td style={{ border: '1px solid black' }}>
                    {calc.lofegyverrel && <>{printKocka(calc.lofegyverrel.sebzes)} {formatSebzesTipus(karakter.lofegyver?.sebzestipus ?? [])}</>}
                </td>
            </tr>
            <tr style={{ textAlign: 'center' }}>
                <th>VÉ</th>
                <td style={{ border: '1px solid black' }} colSpan={2}>
                    <CalculationWidget calculation={calc.fegyverrel.ve}>{Calculation.calculate(calc.fegyverrel.ve)}</CalculationWidget>
                </td>
                <th>Lőtáv</th>
                <td>{calc.lofegyverrel?.lotav ?? '-'}</td>
            </tr>
            <tr style={{ textAlign: 'center' }}>
                <th>MGT</th>
                <td style={{ border: '1px solid black' }} colSpan={2}>
                    <CalculationWidget calculation={calc.mgt} />
                </td>
            </tr>
            {harcmodorKepzettseg && <tr style={{ textAlign: 'center' }}>
                <th>Harcmodor</th>
                <td style={{ border: '1px solid black' }} colSpan={2}>
                    <KepzettsegLeiras kepzettseg={harcmodorKepzettseg} fok={harcmodorFok} />
                </td>
            </tr>}
        </tbody>
    </table>;
}