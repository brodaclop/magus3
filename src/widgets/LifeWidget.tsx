import React, { useState } from 'react';
import { Karakter } from '../model/Karakter';
import { KarakterCalcResult } from '../model/KarakterCalculator';
import { Kasztok } from '../model/Kasztok';
import { CalculationWidget } from './CalculationWidget';
import { FajLeiras } from './FejLeiras';
import { KasztLeiras } from './KasztLeiras';
import { KasztSelectorWidget } from './KasztSelectorWidget';

export const LifeWidget: React.FC<{
    calc: KarakterCalcResult,
    karakter: Karakter,
    levelUp: (id: string) => unknown,
    deleteKarakter: () => unknown
}> = ({ calc, karakter, levelUp, deleteKarakter }) => {

    const [ujKaszt, setUjKaszt] = useState<string>('');

    const kasztok = Karakter.szintek(karakter);

    return <table className='bordered'>
        <tbody>
            <tr>
                <th>Név</th>
                <td>{karakter.name}</td>
            </tr>
            <tr>
                <th>Faj</th>
                <td><FajLeiras faj={karakter.faj} /></td>
            </tr>
            <tr>
                <th>Jellem</th>
                <td>{karakter.jellem}</td>
            </tr>
            <tr>
                <th>Szint</th>
                <td>
                    <ul className='simpleList'>
                        {Object.entries(kasztok).map(([kasztId, kaszt]) => <li>
                            <KasztLeiras kaszt={Kasztok.find(kasztId)} />: {kaszt.szint}
                            <button disabled={!!karakter.hm || calc.pendingKepzettsegekCount > 0 || karakter.szazalek > 0} onClick={() => levelUp(kasztId)}>+</button>
                        </li>)}
                        <li>
                            <KasztSelectorWidget kaszt={ujKaszt} onChange={setUjKaszt} />
                            <button disabled={!!karakter.hm || calc.pendingKepzettsegekCount > 0 || karakter.szazalek > 0 || ujKaszt === ''} onClick={() => {
                                levelUp(ujKaszt);
                                setUjKaszt('');
                            }}>+</button>
                        </li>
                    </ul>
                </td>
            </tr>
            <tr>
                <th>ÉP</th>
                <td><CalculationWidget calculation={calc.ep} /></td>
            </tr>
            <tr>
                <th>FP</th>
                <td><CalculationWidget calculation={calc.fp} /></td>
            </tr>
            <tr>
                <th>Mana</th>
                <td><CalculationWidget calculation={calc.mana} /></td>
            </tr>
            <tr>
                <th>Pszi</th>
                <td><CalculationWidget calculation={calc.pszi} /></td>
            </tr>
            <tr>
                <td colSpan={2}><button className='fullWidth' onClick={deleteKarakter}>Töröl</button></td>
            </tr>
        </tbody>
    </table>;
}