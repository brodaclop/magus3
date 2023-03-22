import Tooltip from 'rc-tooltip';
import React from 'react';
import { Calculation } from '../model/Calculation';
import { SebzesTipus } from '../model/Fegyver';
import { InventoryItem } from '../model/Inventory';
import { Karakter } from '../model/Karakter';
import { KarakterCalcResult } from '../model/KarakterCalculator';
import { Kepessegek } from '../model/Kepessegek';
import { printKocka } from '../model/Kocka';
import { Lofegyver } from '../model/Lofegyver';
import { EgyebBuilderWidget } from './inventory/EgyebBuilderWidget';
import { FegyverBuilderWidget } from './inventory/FegyverBuilderWidget';
import { InventorySzerkesztWidget } from './inventory/InventorySzerkesztWidget';
import { LofegyverBuilderWidget } from './inventory/LofegyverBuilderWidget';
import { PancelBuilderWidget } from './inventory/PancelBuilderWidget';
import { PancelSzerkesztWidget } from './inventory/PancelSzerkesztWidget';
import { formatSebzesTipus } from './KombatWidget';
import { RiDeleteBin2Line } from 'react-icons/ri';

export const InventoryTooltip: React.FC<{ calc: KarakterCalcResult, item: InventoryItem }> = ({ calc, item }) => {

    const izom = Calculation.calculate(calc.pillanatnyiKepessegek.izom);
    const fok = calc.findNormalKepzettseg('fegyver:ij')?.fok ?? 0;

    const ijTulajdonsagok = item.tipus === 'lofegyver' && item.ob.tipus === 'ij' ? Lofegyver.calculateIj(izom, fok, item.ob) : undefined;

    return <table className='bordered'>
        <tbody>
            <tr>
                <th>Tipus</th>
                <td>{item.tipus}</td>
            </tr>
            <tr>
                <th>Név</th>
                <td>{item.ob.name}</td>
            </tr>
            {item.notes && <tr>
                <th>Leírás</th>
                <td style={{ whiteSpace: 'pre-wrap' }}>{item.notes}</td>
            </tr>}
            {item.tipus === 'pancel' && <>
                <tr>
                    <th>SFÉ</th>
                    <td>{Object.entries(item.ob.sfe).map(([sebzesTipus, sfe]) => `${sfe} ${formatSebzesTipus(sebzesTipus as typeof SebzesTipus[number]['id'])}`).join('/')}</td>
                </tr>
                <tr>
                    <th>MGT</th>
                    <td>{item.ob.mgt}</td>
                </tr>
                <tr>
                    <th>Igazítás</th>
                    <td>{item.ob.igazitas.name}</td>
                </tr>
            </>}
            {item.tipus === 'fegyver' && <>
                <tr>
                    <th>KÉ</th>
                    <td>{item.ob.ke}</td>
                </tr>
                <tr>
                    <th>TÉ</th>
                    <td>{item.ob.te}</td>
                </tr>
                <tr>
                    <th>VÉ</th>
                    <td>{item.ob.ve}</td>
                </tr>
                <tr>
                    <th>Sebzés</th>
                    <td>{printKocka(item.ob.sebzes)} {formatSebzesTipus(item.ob.sebzestipus ?? [])}</td>
                </tr>
                <tr>
                    <th>Sebesség</th>
                    <td>{item.ob.sebesseg}</td>
                </tr>
                <tr>
                    <th>Kéz</th>
                    <td>{item.ob.kez}</td>
                </tr>
                <tr>
                    <th>Specialitás</th>
                    <td>{item.ob.flags ?? 'Nincs'}</td>
                </tr>
                {item.ob.kategoria &&
                    <tr>
                        <th>Kategória</th>
                        <td>{item.ob.kategoria.nev}</td>
                    </tr>
                }
                {item.ob.kepesseg &&
                    <tr>
                        <th>Képesség</th>
                        <td>{Kepessegek.name(item.ob.kepesseg)}</td>
                    </tr>
                }
                {item.ob.mgt &&
                    <tr>
                        <th>MGT</th>
                        <td>{item.ob.mgt}</td>
                    </tr>
                }
            </>}
            {item.tipus === 'lofegyver' && <>
                <tr>
                    <th>KÉ</th>
                    <td>{item.ob.ke}</td>
                </tr>
                <tr>
                    <th>CÉ</th>
                    <td>{item.ob.ce}</td>
                </tr>
                <tr>
                    <th>Sebzés</th>
                    <td>{printKocka(item.ob.tipus !== 'ij' ? item.ob.sebzes : ijTulajdonsagok!.sebzes)} {formatSebzesTipus(item.ob.sebzestipus ?? [])}</td>
                </tr>
                <tr>
                    <th>Sebesség</th>
                    <td>{item.ob.sebesseg}</td>
                </tr>
                <tr>
                    <th>Lőtáv</th>
                    <td>{item.ob.tipus !== 'ij' ? item.ob.lotav : ijTulajdonsagok!.lotav}</td>
                </tr>
                {item.ob.tipus === 'nyilpuska' &&
                    <tr>
                        <th>Kategória</th>
                        <td>{item.ob.kategoria.nev}</td>
                    </tr>
                }
                {item.ob.tipus !== 'nyilpuska' &&
                    <tr>
                        <th>Képesség</th>
                        <td>{Kepessegek.name(item.ob.kepesseg)}</td>
                    </tr>
                }
                {item.ob.tipus === 'ij' && <>
                    <tr>
                        <th>Minimum lövőerő (Izom+Képzettség foka+lövőerő bónusz)</th>
                        <td>{item.ob.minimumEro}</td>
                    </tr>
                    <tr>
                        <th>Maximum lövőerő (Izom+Képzettség foka+lövőerő bónusz)</th>
                        <td>{item.ob.maximumEro}</td>
                    </tr>
                </>}
            </>}
        </tbody>
    </table>
}

export const InventoryWidget: React.FC<{ karakter: Karakter, calc: KarakterCalcResult, onChange: (karakter: Karakter) => unknown }> = ({ karakter, calc, onChange }) => {
    const worn: Record<string, number> = {};
    if (karakter.pancel) {
        worn[karakter.pancel.id] = 1;
    }
    if (karakter.kezek[0]?.tipus === 'fegyver') {
        worn[karakter.kezek[0].id] = 1;
    }
    if (karakter.kezek[1]?.tipus === 'fegyver') {
        worn[karakter.kezek[1].id] = (worn[karakter.kezek[1].id] ?? 0) + 1;
    }
    if (karakter.lofegyver) {
        worn[karakter.lofegyver.id] = 1;
    }

    return <table className='bordered'>
        <thead>
            <tr>
                <th colSpan={4}>Felszerelés</th>
            </tr>
        </thead>
        <tbody>
            {karakter.inventory.map((i, idx) => <tr>
                <td>
                    <Tooltip placement='top' overlay={<InventoryTooltip calc={calc} item={i} />}>
                        <span>{i.ob.name}</span>
                    </Tooltip>
                </td>
                <td>
                    {i.tipus === 'pancel' ? <PancelSzerkesztWidget karakter={karakter} onChange={onChange} pancel={i} /> : <InventorySzerkesztWidget karakter={karakter} onChange={onChange} item={i} />}
                </td>
                <td style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button disabled={i.quantity === 0 || (worn[i.id] ?? 0) === i.quantity} onClick={() => {
                        i.quantity--;
                        onChange(karakter);
                    }}>-</button>
                    <span style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>{i.quantity}</span>
                    <button onClick={() => {
                        i.quantity++;
                        onChange(karakter);
                    }}>+</button>
                </td>
                <td style={{ textAlign: 'right' }}>
                    <button style={{ backgroundColor: 'tomato' }} disabled={i.quantity !== 0 || !!worn[i.id]} onClick={() => {
                        karakter.inventory.splice(idx, 1);
                        onChange(karakter);
                    }}><RiDeleteBin2Line /></button>
                </td>
            </tr>)}
        </tbody>
        <tfoot>
            <tr>
                <td colSpan={4}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <PancelBuilderWidget karakter={karakter} onChange={onChange} />
                        <FegyverBuilderWidget karakter={karakter} onChange={onChange} />
                        <LofegyverBuilderWidget karakter={karakter} onChange={onChange} />
                        <EgyebBuilderWidget karakter={karakter} onChange={onChange} />
                    </div>
                </td>
            </tr>
        </tfoot>
    </table>;
}