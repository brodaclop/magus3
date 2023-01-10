import React, { useState } from 'react';
import { GiSpikesFull, GiSpikesInit } from 'react-icons/gi';
import { Karakter, SzintInfo } from '../model/Karakter';
import { KarakterCalcResult } from '../model/KarakterCalculator';
import { KapottKepzettseg } from '../model/Kasztok';
import { Kepzettseg, KepzettsegTipus, NormalKepzettseg, SzazalekosKepzettseg } from '../model/Kepzettseg';
import { KepzettsegLeiras } from './tooltips/KepzettsegLeiras';


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
                {options.map((o, idx) => <option key={idx} value={idx}>{o.name}</option>)}
            </select>
            <button onClick={() => onSelected(options[selected] as NormalKepzettseg)}>+</button>
        </>
    }


export const KepzettsegWidget: React.FC<{ karakter: Karakter, calc: KarakterCalcResult, onChange: (karakter: Karakter) => unknown }> = ({ karakter, onChange, calc }) => {
    const [ujkepzettseg, setUjKepzettseg] = useState<string>('');

    const pluszKP = (kasztKp: boolean) => {
        const kepzettseg = Kepzettseg.find(ujkepzettseg);
        Kepzettseg.kpEloszt(
            calc,
            karakter,
            kepzettseg,
            1,
            kasztKp,
            true
        );
        onChange(karakter);
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

    const ujKepzettsegOb = ujkepzettseg ? Kepzettseg.find(ujkepzettseg) : undefined;

    const isKasztKepzettseg = (kepzettsegId?: string) => kepzettsegId && Karakter.kasztKepzettsegek(karakter).some(id => kepzettsegId.startsWith(id));

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
                            <td>{pk.name ?? Kepzettseg.name(pk.kepzettsegId)} {pk.fok}. fok:
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
                    <th colSpan={2}>
                        KP
                    </th>
                    <td>
                        {karakter.kp}
                    </td>
                </tr>
                <tr>
                    <th colSpan={2}>
                        Kaszt KP
                    </th>
                    <td>
                        {karakter.kasztKp}
                    </td>
                </tr>
                <tr style={{ backgroundColor: karakter.szazalek > 0 ? 'lightpink' : undefined }}>
                    <th colSpan={2}>%</th>
                    <td>
                        {karakter.szazalek}
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}><select onChange={e => setUjKepzettseg(e.target.value)} value={ujkepzettseg}>
                        {!ujkepzettseg && <option key='' value=''></option>}
                        {KepzettsegTipus.map(kt => <optgroup key={kt.name} label={kt.name}>
                            {Kepzettseg.lista.filter(k => k.fajta === 'normal' && k.tipus === kt.id).map(k => <option key={k.id} value={k.id}>{k.name}</option>)}
                        </optgroup>)}
                        <optgroup label='Százalékos'>
                            {Kepzettseg.lista.filter(k => k.fajta === 'szazalekos').map(k => <option key={k.id} value={k.id}>{k.name}</option>)}
                        </optgroup>
                    </select>
                    </td>
                    <td>
                        <button disabled={!ujkepzettseg || (karakter.kp < 1) || calc.pendingKepzettsegekCount > 0 || (ujKepzettsegOb?.fajta === 'szazalekos' && previousSzazalekos(ujKepzettsegOb) === 'max')} onClick={() => pluszKP(false)}>+1 KP</button>
                        <button disabled={!isKasztKepzettseg(ujkepzettseg) || (karakter.kasztKp < 1) || calc.pendingKepzettsegekCount > 0 || (ujKepzettsegOb?.fajta === 'szazalekos' && previousSzazalekos(ujKepzettsegOb) === 'max')} onClick={() => pluszKP(true)}>+1 kaszt KP</button>
                    </td>
                </tr>
            </tbody>
            <tbody>
                {calc.kepzettsegek.normal.map(k => <tr>
                    <td>
                        {isKasztKepzettseg(k.kepzettseg.id) ? <GiSpikesFull /> : <GiSpikesInit />}
                    </td>
                    <td>
                        <KepzettsegLeiras kepzettseg={k.kepzettseg} fok={k.fok} />
                    </td>
                    <td>
                        {k.kp === Math.floor(k.kp) ? k.kp : k.kp.toFixed(2)}/{k.fok === 5 ? '---' : Kepzettseg.kpFokhoz(calc.kepessegek, k.kepzettseg, k.fok + 1)} kp
                    </td>
                </tr>)}
            </tbody>
            <tbody>
                {calc.kepzettsegek.szazalekos.map(k => <tr>
                    <td>
                        {isKasztKepzettseg(k.kepzettseg.id) ? <GiSpikesFull /> : <GiSpikesInit />}
                    </td>
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