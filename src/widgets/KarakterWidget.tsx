import React, { useMemo, useState } from 'react';
import { Karakter } from '../model/Karakter';
import { KarakterCalculator } from '../model/KarakterCalculator';
import { Kepesseg, Kepessegek, KepessegKategoria } from '../model/Kepessegek';
import { BekeszitettWidget } from './BekeszitettWidget';
import { HarcertekWidget } from './HarcertekWidget';
import { HatasWidget } from './HatasWidget';
import { InventoryWidget } from './InventoryWidget';
import { KepessegWidget } from './KepessegWidget';
import { KepzettsegWidget } from './KepzettsegWidget';
import { KombatWidget } from './KombatWidget';
import { LifeWidget } from './LifeWidget';
import { MagiaEllenallasWidget } from './MagiaEllenallasWidget';
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
    const [page, setPage] = useState<'lap' | 'leiras'>('lap');

    const commit = (k?: Karakter) => {
        setKarakter(k ? { ...k } : { ...karakter });
    }

    const plusz = (k: Kepesseg): void => {
        if (Kepessegek.plusz(karakter, k, freehand)) {
            commit();
        }
    }

    const minusz = (k: Kepesseg): void => {
        if (Kepessegek.minusz(karakter, k, freehand)) {
            commit();
        }
    }

    const eloszt = (kategoria: KepessegKategoria) => {
        Kepessegek.eloszt(karakter, kategoria);
        commit();
    }

    const lezar = () => {
        karakter.elosztva = true;
        commit();
    }

    return <>
        <div className='karakterLapBorder'>
            <div className='fullWidth' style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setPage(page === 'lap' ? 'leiras' : 'lap')}>{page === 'lap' ? 'Leírás' : 'Karakterlap'}</button>
                <button disabled={!karakter.elosztva} onClick={() => setFreehand(!freehand)} style={{ float: 'right' }}>{freehand ? 'Játékos mód' : 'KM mód'}</button>
            </div>
            <div className='karakterLap'>
                {page === 'lap' && <>
                    <div className='toprow'>
                        <div className='topleft'>
                            <div>
                                <LifeWidget deleteKarakter={deleteKarakter} karakter={karakter} onChange={commit} calc={karakterCalc} levelUp={kasztId => commit(Karakter.levelUp(karakter, kasztId))} />
                            </div>
                            <div>
                                <KepessegWidget karakter={karakter} eloszt={eloszt} minusz={minusz} plusz={plusz} lezar={lezar} calc={karakterCalc} freehand={freehand} />
                            </div>
                        </div>
                        <div className="topright">
                            <div>
                                <HarcertekWidget karakter={karakter} setKarakter={commit} />
                            </div>
                            <div>
                                <PancelWidget karakter={karakter} onChange={commit} />
                            </div>
                            <div>
                                <MagiaEllenallasWidget calc={karakterCalc} karakter={karakter} onChange={commit} />
                            </div>
                            <div>
                                <HatasWidget karakter={karakter} onChange={commit} calc={karakterCalc} />
                            </div>
                        </div>
                    </div>
                    <div className="secondrow">
                        <div className='secondleft'>
                            <KepzettsegWidget calc={karakterCalc} karakter={karakter} onChange={commit} freehand={freehand} />
                        </div>
                        <div className='secondright'>
                            <InventoryWidget karakter={karakter} calc={karakterCalc} onChange={commit} />
                            <div className='bordered notes'>
                                <div>Jegyzetek</div>
                                <textarea value={karakter.notes ?? ''} onChange={e => {
                                    karakter.notes = e.target.value;
                                    commit();
                                }}></textarea>
                            </div>
                        </div>

                    </div>
                    <div className='fullWidth kombat' style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <KombatWidget calc={karakterCalc} karakter={karakter} onChange={commit} />
                        <BekeszitettWidget karakter={karakter} onChange={commit} />
                    </div>
                    <div className='bottomrow'>
                        <div>
                            <PsziWidget calc={karakterCalc} karakter={karakter} onChange={commit} />
                        </div>
                        <div>
                            <VarazslatWidget calc={karakterCalc} karakter={karakter} onChange={commit} />
                        </div>
                    </div>
                </>}
                {page === 'leiras' && <>
                    <div className='fullWidth'>
                        <VerboseKarakterInfo calc={karakterCalc} karakter={karakter} onChange={commit} />
                    </div>
                </>}
            </div>
        </div>
    </>
};