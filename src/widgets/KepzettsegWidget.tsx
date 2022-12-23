import React, { useState } from 'react';
import { Karakter, SzintInfo } from '../model/Karakter';
import { KarakterCalcResult } from '../model/KarakterCalculator';
import { KapottKepzettseg } from '../model/Kasztok';
import { Kepzettseg, KepzettsegTipus, NormalKepzettseg, SzazalekosKepzettseg } from '../model/Kepzettseg';
import { KepzettsegLeiras } from './KepzettsegLeiras';


const PendingSelector: React.FC<{
    calc: KarakterCalcResult,
    onSelected: (s: NormalKepzettseg) => unknown,
    pk: KapottKepzettseg
}> = ({
    pk,
    onSelected,
    calc
}) => {
        const [selected, setSelected] = useState<number>(0);

        const options = Kepzettseg.keres(pk.kepzettsegId).filter(k => {
            const currentFok = calc.findNormalKepzettseg(k.id)?.fok ?? 0;
            return currentFok >= (pk.honnan ?? 0) && currentFok < pk.fok;
        });

        return <>
            <select value={selected} onChange={e => setSelected(Number(e.target.value))}>
                {options.map((o, idx) => <option value={idx}>{o.name}</option>)}
            </select>
            <button onClick={() => onSelected(options[selected] as NormalKepzettseg)}>+</button>
        </>
    }


export const KepzettsegWidget: React.FC<{ karakter: Karakter, calc: KarakterCalcResult, onChange: (karakter: Karakter) => unknown }> = ({ karakter, onChange, calc }) => {
    const [ujkepzettseg, setUjKepzettseg] = useState<string>('');

    const pluszKP = () => {
        const kepzettseg = Kepzettseg.find(ujkepzettseg)
        if (kepzettseg.fajta === 'normal') {
            Kepzettseg.kpEloszt(
                calc.kepzettsegek.normal,
                karakter.szint[karakter.szint.length - 1].kepzettsegek.normal,
                calc.kepessegek,
                kepzettseg,
                1,
                true
            );
            karakter.kp--;
            onChange(karakter);
        } else {
            const current = previousSzazalekos(kepzettseg);
            if (current !== 'max' && (current === undefined || current.szazalek <= 12)) {
                if (addSzazalek(kepzettseg, 3)) {
                    karakter.kp--;
                    onChange(karakter);
                }
            }
        }
    };

    const previousSzazalekos = (kepzettseg: SzazalekosKepzettseg): SzintInfo['kepzettsegek']['szazalekos'][0] | undefined | 'max' => {
        const current = karakter.szint.at(-1)?.kepzettsegek.szazalekos.find(k => k.kepzettseg.id === kepzettseg.id);
        if (current && current.szazalek >= 15) {
            return 'max';
        }
        return current;
    }

    const addSzazalek = (kepzettseg: SzazalekosKepzettseg, count: number): boolean => {
        const curr = previousSzazalekos(kepzettseg);
        if (curr === 'max') {
            return false;
        }
        if (curr === undefined) {
            karakter.szint[karakter.szint.length - 1].kepzettsegek.szazalekos.push({
                kepzettseg,
                szazalek: count
            });
        } else {
            curr.szazalek += count;
        }
        return true;
    }

    const pluszSzazalek = (kepzettseg: SzazalekosKepzettseg, count = 1) => {
        if (addSzazalek(kepzettseg, count)) {
            karakter.szazalek--;
            onChange(karakter);
        }
    }

    return <div>
        {calc.pendingKepzettsegekCount > 0 && <table className='bordered'>
            <thead>
                <tr>
                    <th style={{ backgroundColor: 'lightpink' }}>Választható képzettségek</th>
                </tr>
                <tbody>
                    {karakter.szint.map((sz, szintIdx) => <>
                        {sz.pendingKepzettsegek.length > 0 && <tr>
                            <th>{szintIdx}. szint: {sz.kaszt.name}</th>
                        </tr>}
                        {sz.pendingKepzettsegek.map((pk, pkIdx) => <tr>
                            <td>{pk.name ?? Kepzettseg.find(pk.kepzettsegId).name} {pk.fok}. fok:
                                <PendingSelector key={pk.id} pk={pk} calc={calc} onSelected={kepzettseg => {
                                    sz.pendingKepzettsegek.splice(pkIdx, 1);
                                    sz.kepzettsegek.normal.push({
                                        kepzettseg,
                                        fok: pk.fok,
                                        kp: 0
                                    });
                                    onChange(karakter);
                                }} />
                            </td>
                        </tr>)}
                    </>)}
                </tbody>

            </thead>
        </table>}
        <table className='bordered'>
            <thead>
                <tr>
                    <th>Képzettségek</th>
                </tr>
            </thead>
            <tbody className='unstriped'>
                <tr>
                    <th>
                        KP
                    </th>
                    <td>
                        {karakter.kp}
                    </td>
                </tr>
                <tr>
                    <th>%</th>
                    <td>
                        {karakter.szazalek}
                    </td>
                </tr>
                <tr>
                    <td><select onChange={e => setUjKepzettseg(e.target.value)} value={ujkepzettseg}>
                        {!ujkepzettseg && <option value=''></option>}
                        {KepzettsegTipus.map(kt => <optgroup label={kt.name}>
                            {Kepzettseg.lista.filter(k => k.fajta === 'normal' && k.tipus === kt.id).map(k => <option value={k.id}>{k.name}</option>)}
                        </optgroup>)}
                        <optgroup label='Százalékos'>
                            {Kepzettseg.lista.filter(k => k.fajta === 'szazalekos').map(k => <option value={k.id}>{k.name}</option>)}
                        </optgroup>
                    </select>
                    </td>
                    <td><button disabled={(!ujkepzettseg) || (karakter.kp < 1) || calc.pendingKepzettsegekCount > 0} onClick={pluszKP}>+1 KP</button></td>
                </tr>
            </tbody>
            <tbody>
                {calc.kepzettsegek.normal.map(k => <tr>
                    <td>
                        <KepzettsegLeiras kepzettseg={k.kepzettseg} fok={k.fok} />
                    </td>
                    <td>
                        {k.kp}/{Kepzettseg.kpFokhoz(calc.kepessegek, k.kepzettseg, k.fok + 1)} kp
                    </td>
                </tr>)}
            </tbody>
            <tbody>
                {calc.kepzettsegek.szazalekos.map(k => <tr>
                    <td>
                        <KepzettsegLeiras kepzettseg={k.kepzettseg} fok={k.szazalek} />
                    </td>
                    <td>
                        <button disabled={karakter.szazalek < 1 || previousSzazalekos(k.kepzettseg) === 'max'} onClick={() => pluszSzazalek(k.kepzettseg)}>+</button>
                    </td>
                </tr>)}

            </tbody>
        </table>
    </div>;
}