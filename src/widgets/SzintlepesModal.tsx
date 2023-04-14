import React, { useCallback, useState } from 'react';
import { Karakter } from '../model/Karakter';
import { Kasztok } from '../model/Kasztok';
import { ModalWindow } from './ModalWindow';

export const SzintlepesModal: React.FC<{ karakter: Karakter, disabled: boolean, kasztId: string, onChange: (karakter: Karakter) => unknown }> = ({ karakter, disabled, kasztId, onChange }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [mana, setMana] = useState<number>();
    const [fp, setFp] = useState<number>();
    const kaszt = Kasztok.find(kasztId, true);
    const levelUp = useCallback(() => {
        Karakter.levelUp(karakter, kasztId, { fp, mana });
        onChange(karakter);
        setMana(undefined);
        setFp(undefined);
        setOpen(false);
    }, [mana, fp, karakter, kasztId, onChange]);
    return <ModalWindow open={open} setOpen={setOpen} button='+' disabled={disabled}>
        <table className='bordered'>
            <tbody>
                <tr>
                    <th>FP (1k6)</th>
                    <td><input type="number" value={fp} onChange={e => setFp(Number(e.target.value))} /></td>
                </tr>
                {kaszt?.mana && kaszt.mana.mennyiseg !== 'sok' &&
                    <tr>
                        <th>MP (1k6)</th>
                        <td><input type="number" value={mana} onChange={e => setMana(Number(e.target.value))} /></td>
                    </tr>
                }
            </tbody>
            <tbody>
                <tr>
                    <th colSpan={2}>
                        <button className='fullWidth' onClick={levelUp}>OK</button>
                    </th>
                </tr>
            </tbody>
        </table>
    </ModalWindow>
}

