import React from 'react';
import { DobasEredmeny } from '../model/Kocka';

const Kocka: React.FC<{ eredmeny: number, max: boolean, eldobott: boolean }> = ({ eredmeny, max, eldobott }) =>
    <span style={{ backgroundColor: max ? 'black' : 'white', color: max ? 'white' : 'black', border: '1px black solid', padding: '2px', margin: '2px', textDecoration: eldobott ? 'line-through' : '' }}>{eredmeny}</span>

export const DobasEredmenyWidget: React.FC<DobasEredmeny> = ({ kocka, plusz, osszeg, eldobottak, max }) => {
    return <span>
        {kocka.map((k, idx) => <Kocka eredmeny={k} max={max === k} eldobott={eldobottak.includes(idx)} />)}
        {kocka.length > 0 && '+'}
        <span>{plusz}</span>
        =
        <span>{osszeg}</span>
    </span>;
}