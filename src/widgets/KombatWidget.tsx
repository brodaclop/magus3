import React from 'react';
import { Calculation } from '../model/Calculation';
import { SebzesTipus } from '../model/Fegyver';
import { HarciHelyzetek } from '../model/HarciHelyzet';
import { InventoryLofegyver } from '../model/Inventory';
import { Karakter } from '../model/Karakter';
import { KarakterCalcResult } from '../model/KarakterCalculator';
import { Kepzettseg } from '../model/Kepzettseg';
import { printKocka } from '../model/Kocka';
import { CalculationWidget } from './CalculationWidget';
import { FegyverSelection } from './FegyverSelection';
import { InventorySelector } from './InventorySelector';
import { KepzettsegLeiras } from './KepzettsegLeiras';


export const formatSebzesTipus = (t: typeof SebzesTipus[number]['id'] | Array<typeof SebzesTipus[number]['id']>): string =>
    (Array.isArray(t) ? t : [t]).sort().map(o => SebzesTipus.find(st => o === st.id)?.name).join('/') || '-';



export const KombatWidget: React.FC<{ karakter: Karakter, calc: KarakterCalcResult, onChange: (karakter: Karakter) => unknown }> = ({ karakter, calc, onChange }) => {
    const harcmodorKepzettseg = calc.harcmodor && Kepzettseg.find(`harcmodor:${calc.harcmodor?.id}`);
    const harcmodorFok = calc.kepzettsegek.normal.find(k => k.kepzettseg.id === harcmodorKepzettseg?.id)?.fok ?? 0;
    return <table className='bordered' style={{ width: '100%', marginLeft: 0, marginRight: 0 }}>
        <thead>
            <tr>
                <th colSpan={5}>Harc</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>&nbsp;</th>
                <td>
                    <FegyverSelection
                        karakter={karakter}
                        calc={calc}
                        kez={0}
                        onChange={onChange} />
                </td>
                <td>
                    <FegyverSelection
                        karakter={karakter}
                        calc={calc}
                        kez={1}
                        onChange={onChange} />
                </td>
                <td colSpan={2}>
                    <InventorySelector
                        karakter={karakter}
                        tipus='lofegyver'
                        value={karakter.lofegyver}
                        canBeEmpty
                        emptyName='Lőfegyver nélkül'
                        onChange={i => {
                            karakter.lofegyver = i as InventoryLofegyver;
                            onChange(karakter);
                        }}
                    />
                </td>
            </tr>
            <tr>
                <th>KÉ</th>
                <td style={{ textAlign: 'center' }} colSpan={2}>
                    <CalculationWidget calculation={calc.fegyverrel.ke} />
                </td>
                <th>KÉ</th>
                <td style={{ textAlign: 'center' }}>
                    {calc.lofegyverrel ? <CalculationWidget calculation={calc.lofegyverrel.ke} /> : '-'}
                </td>
            </tr>
            <tr>
                <th>TÉ</th>
                <td>
                    {calc.fegyverrel.kezek[0] && calc.fegyverrel.kezek[0].te && <CalculationWidget calculation={calc.fegyverrel.kezek[0].te} />}

                </td>
                <td>
                    {calc.fegyverrel.kezek[1] && calc.fegyverrel.kezek[1].te && <CalculationWidget calculation={calc.fegyverrel.kezek[1].te} />}
                </td>
                <th>CÉ</th>
                <td>
                    {calc.lofegyverrel && <CalculationWidget calculation={calc.lofegyverrel.ce} />}
                </td>
            </tr>
            <tr>
                <th>Sebzés</th>
                <td>
                    {calc.fegyverrel.kezek[0] && <>{printKocka(calc.fegyverrel.kezek[0].sebzes)} {formatSebzesTipus(karakter.kezek[0]?.ob.sebzestipus ?? [])}</>}
                </td>
                <td>
                    {calc.fegyverrel.kezek[1] && <>{printKocka(calc.fegyverrel.kezek[1].sebzes)} {formatSebzesTipus(karakter.kezek[1]?.ob.sebzestipus ?? [])}</>}
                </td>
                <th>Sebzés</th>
                <td>
                    {calc.lofegyverrel && <>{printKocka(calc.lofegyverrel.sebzes)} {formatSebzesTipus(karakter.lofegyver?.ob.sebzestipus ?? [])}</>}
                </td>
            </tr>
            <tr>
                <th>VÉ</th>
                <td style={{ textAlign: 'center' }} colSpan={2}>
                    <CalculationWidget calculation={calc.fegyverrel.ve}>{Calculation.calculate(calc.fegyverrel.ve)}</CalculationWidget>
                </td>
                <th>Lőtáv</th>
                <td style={{ textAlign: 'center' }}>{calc.lofegyverrel?.lotav ?? '-'}</td>
            </tr>
            <tr>
                <th>Második támadás KÉ</th>
                <td>
                    {calc.fegyverrel.kezek[0] && <CalculationWidget calculation={calc.fegyverrel.kezek[0].tobbTamadasKe} />}
                </td>
                <td>
                    {calc.fegyverrel.kezek[1] && <CalculationWidget calculation={calc.fegyverrel.kezek[1].tobbTamadasKe} />}
                </td>
                <th>MTKÉ</th>
                <td style={{ textAlign: 'center' }}>
                    {calc.lofegyverrel ? <CalculationWidget calculation={calc.lofegyverrel.tobbTamadasKe} /> : '-'}
                </td>
            </tr>
            <tr>
                <th>MGT</th>
                <td style={{ textAlign: 'center' }} colSpan={2}>
                    <CalculationWidget calculation={calc.mgt} />
                </td>
            </tr>
            {harcmodorKepzettseg && <tr>
                <th>Harcmodor</th>
                <td style={{ textAlign: 'center' }} colSpan={2}>
                    <KepzettsegLeiras kepzettseg={harcmodorKepzettseg} fok={harcmodorFok} />
                </td>
            </tr>}
            <tr>
                <th>Harci helyzetek:</th>
                <td colSpan={4}>
                    <div style={{ display: 'flex', flexDirection: 'row', flexFlow: 'wrap' }}>
                        {[...HarciHelyzetek].sort((a, b) => a.name.localeCompare(b.name)).map(h => <div style={{ width: '15%' }}>
                            <button style={{ borderColor: karakter.temporary.harciHelyzet.includes(h.id) ? 'green' : undefined }} key={h.id} onClick={() => {
                                if (karakter.temporary.harciHelyzet.includes(h.id)) {
                                    karakter.temporary.harciHelyzet.splice(karakter.temporary.harciHelyzet.indexOf(h.id), 1);
                                } else {
                                    karakter.temporary.harciHelyzet.push(h.id);
                                }
                                onChange(karakter);
                            }}>{karakter.temporary.harciHelyzet.includes(h.id) ? '+' : '-'}&nbsp;{h.name}</button>
                        </div>)}
                    </div>
                </td>
            </tr>
        </tbody>
    </table>;
}