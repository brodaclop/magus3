import React from 'react';
import { Karakter } from '../model/Karakter';
import { KarakterCalcResult } from '../model/KarakterCalculator';
import { KepzettsegLeiras } from './KepzettsegLeiras';
import { PsziDiszciplinaLeiras } from './PsziDiszciplinaLeiras';

export const VerboseKepzettsegWidget: React.FC<{ karakter: Karakter, calc: KarakterCalcResult, onChange: (karakter: Karakter) => unknown }> = ({ karakter, onChange, calc }) => {

    return <div className='verboseKepzettseg'>
        <h3>Képzettségek</h3>
        <div style={{ columns: 3 }}>

            {calc.kepzettsegek.normal.filter(k => k.fok > 0).sort((a, b) => a.kepzettseg.name.localeCompare(b.kepzettseg.name)).map(k =>
                <KepzettsegLeiras kepzettseg={k.kepzettseg} fok={k.fok} inline truncateUnknown />)}
        </div>
        <h3>Pszi diszciplinák</h3>
        <div style={{ columns: 3 }}>

            {calc.psziDiszciplinak.sort((a, b) => a.name.localeCompare(b.name)).map(d =>
                <div>
                    <PsziDiszciplinaLeiras d={d} inline />
                </div>
            )}
        </div>
    </div>;
}