import Tooltip from 'rc-tooltip';
import React from 'react';
import { KasztInfo, Kasztok, KEPESSEG_DOBAS } from '../../model/Kasztok';
import { Kepessegek } from '../../model/Kepessegek';
import { Kepzettseg } from '../../model/Kepzettseg';
import { printKocka } from '../../model/Kocka';
import { MagiaKategoriak } from '../../model/Magia';
import { arrayName } from '../../model/util';
import { MarkdownText } from '../MarkdownText';

export const KasztLeiras: React.FC<{ kaszt: KasztInfo, inline?: boolean }> = ({ kaszt, inline }) => {
    const kasztTabla =
        <div className='bordered' style={{ overflowY: inline ? 'auto' : 'scroll', pointerEvents: 'auto', maxHeight: inline ? 'none' : '30rem' }}>
            <h2>{kaszt.name} {kaszt.fokaszt && <span style={{ fontSize: 'smaller', fontStyle: 'italic' }}>({Kasztok.name(kaszt.fokaszt)} alkaszt)</span>}</h2>
            {kaszt?.leiras?.fo && <MarkdownText>{kaszt.leiras.fo}</MarkdownText>}
            <h3>Tulajdonságok</h3>

            <table className='bordered'>
                <tbody>
                    {Object.entries(kaszt.kepessegDobas).map(([nev, ertek]) => <tr>
                        <th>{nev}</th>
                        <td>{ertek}</td>
                        <td>{printKocka(KEPESSEG_DOBAS[ertek])}</td>
                    </tr>)}
                </tbody>
            </table>

            <h3>Harcérték</h3>
            <table className='bordered'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Alap</th>
                        <th>Szintenként</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>KÉ</th>
                        <td>{kaszt.harcertekAlap.ke ?? 0}</td>
                        <td>{kaszt.harcertek.ke ?? '-'}</td>
                    </tr>
                    <tr>
                        <th>TÉ</th>
                        <td>{kaszt.harcertekAlap.te ?? 0}</td>
                        <td>{kaszt.harcertek.te ?? '-'}</td>
                    </tr>
                    <tr>
                        <th>VÉ</th>
                        <td>{kaszt.harcertekAlap.ve ?? 0}</td>
                        <td>{kaszt.harcertek.ve ?? '-'}</td>
                    </tr>
                    <tr>
                        <th>CÉ</th>
                        <td>{kaszt.harcertekAlap.ce ?? 0}</td>
                        <td>{kaszt.harcertek.ce ?? '-'}</td>
                    </tr>
                    <tr>
                        <th colSpan={2}>Szabad HM:</th>
                        <td>{kaszt.hm}</td>
                    </tr>
                </tbody>
            </table>
            {kaszt.kasztSpec?.includes('ketSzintenkentKe') && <p>
                A karakter KÉ-je minden második szinten 1-gyel nő.
            </p>}
            {kaszt.kasztSpec?.includes('ketSzintenkentSebzes') && <p>
                A karakter sebzése minden második szinten 1-gyel nő
            </p>}
            {kaszt.kasztSpec?.includes('otodikSzintenGyorsTamadas') && <p>
                A karakter 5. szintre lépve veteránnak számít, így gyorsabban tudja második támadását leadni.
            </p>}

            <h3>Életerő és Fájdalomtűrés</h3>
            <table className='bordered'>
                <tbody>
                    <tr>
                        <th>ÉP alap</th>
                        <td>{kaszt.epAlap}</td>
                    </tr>
                    <tr>
                        <th>FP alap</th>
                        <td>{kaszt.fpAlap}</td>
                    </tr>
                    <tr>
                        <th>FP/szint</th>
                        <td>{printKocka({ darab: 1, kocka: 6, plusz: kaszt.fpPerSzint })}</td>
                    </tr>
                </tbody>
            </table>

            <h3>Képzettségek</h3>
            <table className='bordered'>
                <thead>
                    <tr>
                        <th>TSz</th>
                        <th>Képzettség</th>
                        <th>Fok/%</th>
                    </tr>
                </thead>
                {kaszt.kepzettsegek?.map((kepzettsegek, tsz) => <>
                    {(kepzettsegek?.length ?? 0) > 0 && <tbody>
                        {kepzettsegek.map(kepzettseg => <tr>
                            <td>{tsz === 0 ? '' : tsz}</td>
                            <td>{kepzettseg.name ?? Kepzettseg.name(kepzettseg.kepzettsegId)}</td>
                            <td>{kepzettseg.fok}</td>
                        </tr>)}
                    </tbody>}
                </>)}
            </table>

            <table className='bordered'>
                <tbody>
                    <tr>
                        <th>KP alap</th>
                        <td>{kaszt.kpAlap}</td>
                    </tr>
                    <tr>
                        <th>KP/szint</th>
                        <td>{kaszt.kpPerSzint}</td>
                    </tr>
                    <tr>
                        <th>Kaszt KP/szint</th>
                        <td>{kaszt.kasztKpPerSzint}</td>
                    </tr>
                    <tr>
                        <th>%/szint</th>
                        <td>{kaszt.szazalekPerSzint}</td>
                    </tr>
                </tbody>
            </table>

            {kaszt?.leiras?.kepzettseg && <MarkdownText>{kaszt.leiras.kepzettseg}</MarkdownText>}

            {kaszt.magiaKategoriak && kaszt.magiaKategoriak.length > 0 && kaszt.mana && <>
                <h3>Mágia</h3>

                <table className='bordered'>
                    <tbody>
                        <tr>
                            <th>MP/szint:</th>
                            <td>{Kepessegek.name(kaszt.mana.kepesseg)} 10 fölötti része + {kaszt.mana.mennyiseg === 'sok' ? '6' : 'k6'} {kaszt.mana.mennyiseg === 'kevés' && 'fele'}</td>
                        </tr>
                        <tr>
                            <th rowSpan={kaszt.magiaKategoriak.length}>Mágia típusa</th>
                            <td>{arrayName(MagiaKategoriak, kaszt.magiaKategoriak[0])}</td>
                        </tr>
                        {kaszt.magiaKategoriak.slice(1).map(mk => <tr>
                            <td>{arrayName(MagiaKategoriak, mk)}</td>
                        </tr>)}
                    </tbody>
                </table>


            </>}

            {kaszt?.leiras?.kulonlegesKepessegek && <>
                <h3>Különleges képességek</h3>
                <MarkdownText>
                    {kaszt.leiras.kulonlegesKepessegek}
                </MarkdownText>
            </>}

        </div>;

    return inline ? kasztTabla : <Tooltip placement='right' overlay={kasztTabla}>
        <span>{kaszt.name}</span>
    </Tooltip>;
}