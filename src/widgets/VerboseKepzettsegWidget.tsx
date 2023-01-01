import React, { useState } from 'react';
import { GiSpikesFull, GiSpikesInit } from 'react-icons/gi';
import { Karakter } from '../model/Karakter';
import { KarakterCalcResult } from '../model/KarakterCalculator';
import { Kepzettseg, KepzettsegTipus } from '../model/Kepzettseg';
import { KepzettsegLeiras } from './KepzettsegLeiras';

export const VerboseKepzettsegWidget: React.FC<{ karakter: Karakter, calc: KarakterCalcResult, onChange: (karakter: Karakter) => unknown }> = ({ karakter, onChange, calc }) => {

    const isKasztKepzettseg = (kepzettsegId?: string) => kepzettsegId && Karakter.kasztKepzettsegek(karakter).some(id => kepzettsegId.startsWith(id));


    return <div className='verboseKepzettseg'>
        <h3>Képzettségek</h3>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

            {calc.kepzettsegek.normal.filter(k => k.fok > 0).map(k => <KepzettsegLeiras kepzettseg={k.kepzettseg} fok={k.fok} inline truncateUnknown />)}
        </div>
    </div>;
}