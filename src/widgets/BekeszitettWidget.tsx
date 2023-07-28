import React, { useState } from 'react';
import { GiAssassinPocket } from 'react-icons/gi';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { v4 } from 'uuid';
import { Karakter } from '../model/Karakter';

export const BekeszitettWidget: React.FC<{ karakter: Karakter, onChange: (karakter: Karakter) => unknown }> = ({ karakter, onChange }) => {

    const [name, setName] = useState<string>('');


    return <table className='bordered'>
        <thead>
            <tr>
                <th colSpan={6}>Bekészítve</th>
            </tr>
            <tr>
                <th colSpan={6}>
                    <form>
                        Név: <input type="text" value={name} onChange={e => {
                            const value = e.target.value;
                            if (value === '' || /^[a-zA-Z][a-zA-Z_-]*$/.test(value)) {
                                setName(value);
                            }
                        }} />
                        <button type='submit' disabled={!name || karakter.bekeszitve?.some(bk => bk.name === name)} onClick={e => {
                            const bekeszitve = karakter.bekeszitve ?? [];
                            bekeszitve.push({
                                id: v4(),
                                name,
                                kezek: [...karakter.kezek],
                                lofegyver: karakter.lofegyver
                            });
                            karakter.bekeszitve = bekeszitve;
                            onChange(karakter);
                        }}>Bekészít</button>
                    </form>
                </th>
            </tr>
            <tr>
                <th></th>
                <th>Név</th>
                <th>{Karakter.kez(karakter, 0)} kéz</th>
                <th>{Karakter.kez(karakter, 1)} kéz</th>
                <th>Lőfegyver</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {karakter.bekeszitve?.map((bk, idx) => <tr>
                <td>
                    <button onClick={() => {
                        karakter.kezek = [...bk.kezek];
                        karakter.lofegyver = bk.lofegyver;
                        onChange(karakter);
                    }} ><GiAssassinPocket /></button>
                </td>
                <td>{bk.name}</td>
                <td>{bk.kezek[0]?.ob.name}</td>
                <td>{bk.kezek[1]?.ob.name}</td>
                <td>{bk.lofegyver?.ob.name}</td>
                <td>
                    <button onClick={() => {
                        karakter.bekeszitve?.splice(idx, 1);
                        onChange(karakter);
                    }}><RiDeleteBin2Line /></button>
                </td>
            </tr>)}

        </tbody>
    </table>;
}