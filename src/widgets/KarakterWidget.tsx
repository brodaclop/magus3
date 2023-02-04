import React, { useMemo, useState } from 'react';
import { Karakter } from '../model/Karakter';
import { KarakterCalculator } from '../model/KarakterCalculator';
import { Kepesseg, Kepessegek, KepessegKategoria } from '../model/Kepessegek';
import { HarcertekWidget } from './HarcertekWidget';
import { HatasWidget } from './HatasWidget';
import { InventoryWidget } from './InventoryWidget';
import { KepessegWidget } from './KepessegWidget';
import { KepzettsegWidget } from './KepzettsegWidget';
import { KombatWidget } from './KombatWidget';
import { LifeWidget } from './LifeWidget';
import { PancelWidget } from './PancelWidget';
import { PsziWidget } from './PsziWidget';
import { VarazslatWidget } from './VarazslatWidget';
import { VerboseKarakterInfo } from './VerboseKarakterInfo';

export const KarakterWidget: React.FC<{
    karakter: Karakter,
    setKarakter: (k: Karakter) => unknown,
    deleteKarakter: () => unknown
}> = ({ karakter, setKarakter, deleteKarakter }) => {
    const karakterCalc = useMemo(() => KarakterCalculator.calc(karakter), [karakter]);
    const [freehand, setFreehand] = useState<boolean>(false);

    const commit = (k?: Karakter) => {
        setKarakter(k ? { ...k } : { ...karakter });
    }

    const plusz = (k: Kepesseg, shouldCommit = true): boolean => {
        const kategoria = k.kategoria;
        if ((freehand || karakter.kepessegKategoriak[kategoria] > 0) && karakter.kepessegek[k.id] < 20) {
            karakter.kepessegek[k.id]++;
            if (!freehand) {
                karakter.kepessegKategoriak[kategoria]--;
            }
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
            if (!freehand) {
                karakter.kepessegKategoriak[kategoria]++;
            }
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

    return <div>
        <button disabled={!karakter.elosztva} onClick={() => setFreehand(!freehand)} style={{ float: 'right' }}>Teszt</button>
        <div className='karakterLap'>

            <div>
                <LifeWidget deleteKarakter={deleteKarakter} karakter={karakter} calc={karakterCalc} levelUp={kasztId => commit(Karakter.levelUp(karakter, kasztId))} />
            </div>
            <div>
                <HarcertekWidget karakter={karakter} setKarakter={commit} />
            </div>
            <div>
                <PancelWidget karakter={karakter} onChange={commit} />
            </div>
            <div>
                <HatasWidget karakter={karakter} onChange={commit} calc={karakterCalc} />
            </div>
            <div>
                <KepessegWidget karakter={karakter} eloszt={eloszt} minusz={minusz} plusz={plusz} lezar={lezar} calc={karakterCalc} freehand={freehand} />
            </div>
            <div className='fullWidth'>
                <KombatWidget calc={karakterCalc} karakter={karakter} onChange={commit} />
            </div>
            <div>
                <KepzettsegWidget calc={karakterCalc} karakter={karakter} onChange={commit} />
            </div>
            <div>
                <InventoryWidget karakter={karakter} calc={karakterCalc} onChange={commit} />
            </div>
            <div className='fullWidth'>
                <PsziWidget calc={karakterCalc} karakter={karakter} onChange={commit} />
            </div>
            <div className='fullWidth'>
                <VarazslatWidget calc={karakterCalc} karakter={karakter} onChange={commit} />
            </div>
            <div className='fullWidth'>
                <VerboseKarakterInfo calc={karakterCalc} karakter={karakter} onChange={commit} />
            </div>
        </div>
    </div>
};