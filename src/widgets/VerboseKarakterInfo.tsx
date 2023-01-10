import React from 'react';
import { Karakter } from '../model/Karakter';
import { KarakterCalcResult } from '../model/KarakterCalculator';
import { Kasztok } from '../model/Kasztok';
import { MarkdownText } from './MarkdownText';
import { KepzettsegLeiras } from './tooltips/KepzettsegLeiras';
import { PsziDiszciplinaLeiras } from './tooltips/PsziDiszciplinaLeiras';
import { VarazslatLeiras } from './tooltips/VarazslatLeiras';

export const VerboseKarakterInfo: React.FC<{ karakter: Karakter, calc: KarakterCalcResult, onChange: (karakter: Karakter) => unknown }> = ({ karakter, onChange, calc }) => {

    const kasztKK = Object.entries(Karakter.szintek(karakter)).map(([kasztId, { szint }]) => Kasztok.kasztInfo(kasztId, szint).leiras?.kulonlegesKepessegek).filter(k => !!k).join('\n');

    return <div className='verboseKepzettseg'>
        <h2>Leírások</h2>

        {(kasztKK || karakter.faj.kulonlegesKepessegek || karakter.faj.infralatas) && <>
            <h3>Különleges képességek</h3>

            {<MarkdownText>
                {
                    (karakter.faj.infralatas ? `- Rendelkeznek infralátással, mely vaksötétben is ${karakter.faj.infralatas} méternyi látótávolságot jelent\n` : '') +
                    (karakter.faj.kulonlegesKepessegek ? karakter.faj.kulonlegesKepessegek : '') +
                    (kasztKK ? kasztKK : '')
                }
            </MarkdownText>}
        </>}

        <h3>Képzettségek</h3>
        <div style={{ columns: 3 }}>

            {calc.kepzettsegek.normal.filter(k => k.fok > 0).sort((a, b) => a.kepzettseg.name.localeCompare(b.kepzettseg.name)).map(k =>
                <KepzettsegLeiras kepzettseg={k.kepzettseg} fok={k.fok} inline truncateUnknown />)}
        </div>
        {calc.psziDiszciplinak.length > 0 && <>
            <h3>Pszi diszciplinák</h3>
            <div style={{ columns: 3 }}>

                {calc.psziDiszciplinak.sort((a, b) => a.name.localeCompare(b.name)).map(d =>
                    <div>
                        <PsziDiszciplinaLeiras d={d} inline />
                    </div>
                )}
            </div>
        </>}
        {calc.varazslatok.length > 0 && <>
            <h3>Varázslatok</h3>
            <div style={{ columns: 3 }}>

                {calc.varazslatok.sort((a, b) => a.name.localeCompare(b.name)).map(v =>
                    <div>
                        <VarazslatLeiras v={v} inline />
                    </div>
                )}
            </div>
        </>}

    </div>;
}