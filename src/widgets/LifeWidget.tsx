import React, { useState } from 'react';
import { Karakter } from '../model/Karakter';
import { KarakterCalcResult } from '../model/KarakterCalculator';
import { Kasztok } from '../model/Kasztok';
import { exportTPCSV } from '../tableplop/TPExporter';
import { CalculationWidget } from './CalculationWidget';
import { FajLeiras } from './entities/FejLeiras';
import { KasztLeiras } from './entities/KasztLeiras';
import { KasztSelectorWidget } from './KasztSelectorWidget';
import { GrConnect } from 'react-icons/gr';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { AiOutlineExport } from 'react-icons/ai';
import fileDownload from 'js-file-download';



export const LifeWidget: React.FC<{
    calc: KarakterCalcResult,
    karakter: Karakter,
    onChange: (karakter: Karakter) => unknown,
    levelUp: (id: string) => unknown,
    deleteKarakter: () => unknown
}> = ({ calc, karakter, onChange, levelUp, deleteKarakter }) => {

    const [ujKaszt, setUjKaszt] = useState<string>('');

    const kasztok = Karakter.szintek(karakter);

    return <table className='bordered'>
        <tbody>
            <tr>
                <th>Név</th>
                <td>{karakter.name}</td>
            </tr>
            <tr>
                <th>Tableplop</th>
                <td>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <label style={{ marginRight: '0.2rem', border: 'black 1px solid', borderRadius: '0.1rem', backgroundColor: 'lightgray', padding: '2px' }}>
                            <input
                                type="file"
                                accept="text/json"
                                style={{ display: 'none' }}
                                onChange={async e => {
                                    await Karakter.connectToTableplop(karakter, e.target.files?.[0]);
                                    (e.target.value as any) = null;
                                    onChange(karakter);
                                }}
                            />
                            <span><GrConnect style={{ verticalAlign: 'text-bottom' }} /> Összeköt</span>
                        </label>
                        {karakter.tableplop && <button onClick={() => exportTPCSV(karakter, calc)}>Frissít (ID: {karakter.tableplop.characterId})</button>}
                    </div>
                </td>
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
                <th>Balkezes?</th>
                <td><input checked={karakter.balkezes} type="checkbox" onChange={() => {
                    karakter.balkezes = !karakter.balkezes;
                    onChange(karakter);
                }} /></td>
            </tr>
            <tr>
                <th>Szint</th>
                <td>
                    <ul className='simpleList'>
                        {Object.entries(kasztok).map(([kasztId, kaszt]) => <li>
                            <KasztLeiras kaszt={Kasztok.kasztInfo(kasztId, kaszt.szint)} />: {kaszt.szint}
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
                <td><CalculationWidget calculation={calc.ep} /> / <input type='number' value={karakter.temporary.ep} onChange={e => {
                    karakter.temporary.ep = Number(e.target.value);
                    onChange(karakter);
                }} /></td>
            </tr>
            <tr>
                <th>FP</th>
                <td><CalculationWidget calculation={calc.fp} /> / <input type='number' value={karakter.temporary.fp} onChange={e => {
                    karakter.temporary.fp = Number(e.target.value);
                    onChange(karakter);
                }} /></td>
            </tr>
            <tr>
                <th>Mana</th>
                <td><CalculationWidget calculation={calc.mana} /> / <input type='number' value={karakter.temporary.mana} onChange={e => {
                    karakter.temporary.mana = Number(e.target.value);
                    onChange(karakter);
                }} /></td>
            </tr>
            <tr>
                <th>Pszi</th>
                <td><CalculationWidget calculation={calc.pszi} /> / <input type='number' value={karakter.temporary.pszi} onChange={e => {
                    karakter.temporary.pszi = Number(e.target.value);
                    onChange(karakter);
                }} /></td>
            </tr>
            <tr>
                <td colSpan={2}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button onClick={() => {
                            fileDownload(JSON.stringify(karakter), `${karakter.name}-zsongo.json`, 'text/json');
                        }}>Export <AiOutlineExport style={{ verticalAlign: 'text-top' }} /></button>
                        <button onClick={deleteKarakter}><RiDeleteBin2Line style={{ verticalAlign: 'text-top' }} /> Töröl</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>;
}