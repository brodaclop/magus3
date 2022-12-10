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

    const lezar = () => {
        karakter.elosztva = true;
        commit();
    }

    return <div className='karakterLap'>
        <div>
            <LifeWidget deleteKarakter={deleteKarakter} karakter={karakter} calc={karakterCalc} levelUp={kasztId => commit(Karakter.levelUp(karakter, Kasztok.find(kasztId)))} />
        </div>
        <div>
            <PancelWidget karakter={karakter} calc={karakterCalc} onChange={commit} />
        </div>
        <div>
            <HarcertekWidget karakter={karakter} setKarakter={commit} />
        </div>
        <div>
            <KepessegWidget karakter={karakter} eloszt={eloszt} minusz={minusz} plusz={plusz} lezar={lezar} calc={karakterCalc} />
        </div>
        <div>
            <KepzettsegWidget calc={karakterCalc} karakter={karakter} onChange={commit} />
        </div>
        <div className='fullWidth'>
            <KombatWidget calc={karakterCalc} karakter={karakter} onChange={commit} />
        </div>
    </div>

}