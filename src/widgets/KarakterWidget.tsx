import React, { useMemo } from 'react';
import { Karakter, KarakterTemplate } from '../model/Karakter';
import { KarakterCalculator } from '../model/KarakterCalculator';
import { Kasztok } from '../model/Kasztok';
import { Kepesseg, Kepessegek, KepessegKategoria } from '../model/Kepessegek';
import { HarcertekWidget } from './HarcertekWidget';
import { KepessegWidget } from './KepessegWidget';
import { KepzettsegWidget } from './KepzettsegWidget';
import { KombatWidget } from './KombatWidget';
import { LifeWidget } from './LifeWidget';
import { PancelWidget } from './PancelWidget';

export const KarakterWidget: React.FC<{ karakter: Karakter, setKarakter: (k: Karakter) => unknown, template: KarakterTemplate, setTemplate: (t: KarakterTemplate) => unknown }> = ({ karakter, setKarakter, template, setTemplate }) => {
    const karakterCalc = useMemo(() => KarakterCalculator.calc(karakter), [karakter]);

    const commit = () => {
        setKarakter({ ...karakter });
        setTemplate({ ...template });
    }

    const plusz = (k: Kepesseg, shouldCommit = true): boolean => {
        const kategoria = k.kategoria;
        if (template.kepessegKategoriak[kategoria] > 0 && karakter.kepessegek[k.id] < 20) {
            karakter.kepessegek[k.id]++;
            template.kepessegKategoriak[kategoria]--;
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
            template.kepessegKategoriak[kategoria]++;
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
                    <LifeWidget karakter={karakter} calc={karakterCalc} levelUp={kasztId => setKarakter({ ...Karakter.levelUp(karakter, Kasztok.find(kasztId)) })} />
                </td>
                <td>
                    <PancelWidget karakter={karakter} calc={karakterCalc} onChange={k => setKarakter({ ...k })} />
                </td>
                <td>
                    <HarcertekWidget karakter={karakter} setKarakter={k => setKarakter({ ...k })} />
                </td>
            </tr>
            <tr>
                <td colSpan={2}>
                    <KepessegWidget kategoriak={template.kepessegKategoriak} eloszt={eloszt} minusz={minusz} plusz={plusz} karakterCalc={karakterCalc} />
                </td>
                <td>
                    <KombatWidget calc={karakterCalc} karakter={karakter} onChange={k => setKarakter({ ...k })} />
                    <KepzettsegWidget calc={karakterCalc} karakter={karakter} onChange={k => setKarakter({ ...k })} />
                </td>
            </tr>
        </tbody>
    </table>;
}