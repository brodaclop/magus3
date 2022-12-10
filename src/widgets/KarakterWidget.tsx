import React, { useMemo } from 'react';
import { Karakter } from '../model/Karakter';
import { KarakterCalculator } from '../model/KarakterCalculator';
import { Kasztok } from '../model/Kasztok';
import { Kepesseg, Kepessegek, KepessegKategoria } from '../model/Kepessegek';
import { HarcertekWidget } from './HarcertekWidget';
import { KepessegWidget } from './KepessegWidget';
import { KepzettsegWidget } from './KepzettsegWidget';
import { KombatWidget } from './KombatWidget';
import { LifeWidget } from './LifeWidget';
import { PancelWidget } from './PancelWidget';

export const KarakterWidget: React.FC<{
    karakter: Karakter,
    setKarakter: (k: Karakter) => unknown,
    deleteKarakter: () => unknown
}> = ({ karakter, setKarakter, deleteKarakter }) => {
    const karakterCalc = useMemo(() => KarakterCalculator.calc(karakter), [karakter]);

    const commit = (k?: Karakter) => {
        setKarakter(k ? { ...k } : { ...karakter });
    }

    const plusz = (k: Kepesseg, shouldCommit = true): boolean => {
        const kategoria = k.kategoria;
        if (karakter.kepessegKategoriak[kategoria] > 0 && karakter.kepessegek[k.id] < 20) {
            karakter.kepessegek[k.id]++;
            karakter.kepessegKategoriak[kategoria]--;
            if (shouldCommit) {
                commit();
            }
            return true;
        }
        return false;
    }

    const minusz = (k: Kepesseg, shouldCommit = true): boolean => {
        const kategoria = k.kategoria;
        if (karakter.kepessegek[k.id] > 0) {
            karakter.kepessegek[k.id]--;
            karakter.kepessegKategoriak[kategoria]++;
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
            end = kepessegek.map(k => plusz(k, false)).every(b => !b);
        }
        commit();
    }

    return <table style={{ borderCollapse: 'collapse' }}>
        <tbody>
            <tr>
                <td>
                    <LifeWidget deleteKarakter={deleteKarakter} karakter={karakter} calc={karakterCalc} levelUp={kasztId => commit(Karakter.levelUp(karakter, Kasztok.find(kasztId)))} />
                </td>
                <td>
                    <PancelWidget karakter={karakter} calc={karakterCalc} onChange={commit} />
                </td>
                <td>
                    <HarcertekWidget karakter={karakter} setKarakter={commit} />
                </td>
            </tr>
            <tr>
                <td colSpan={2}>
                    <KepessegWidget kategoriak={karakter.kepessegKategoriak} eloszt={eloszt} minusz={minusz} plusz={plusz} karakterCalc={karakterCalc} />
                </td>
                <td>
                    <KombatWidget calc={karakterCalc} karakter={karakter} onChange={commit} />
                    <KepzettsegWidget calc={karakterCalc} karakter={karakter} onChange={commit} />
                </td>
            </tr>
        </tbody>
    </table>;
}