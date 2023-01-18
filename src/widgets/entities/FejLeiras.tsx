import Tooltip from 'rc-tooltip';
import React from 'react';
import { Link } from 'react-router-dom';
import { Faj } from '../../model/Fajok';
import { Kepessegek } from '../../model/Kepessegek';
import { Kepzettseg } from '../../model/Kepzettseg';
import { entityDivStyle } from '../../model/util';
import { MarkdownText } from '../MarkdownText';

export const FajLeiras: React.FC<{ faj: Faj, inline?: boolean }> = ({ faj, inline }) => {
    const fajTabla =
        <div style={entityDivStyle(inline)}>
            <h2>{faj.name}</h2>


            {faj.leiras && <MarkdownText>{faj.leiras}</MarkdownText>}

            {faj.kepessegek && Object.keys(faj.kepessegek).length > 0 && <>
                <h3>Tulajdonságok</h3>

                <table className='bordered'>
                    <thead>
                        <tr>
                            <th>Tulajdonság</th>
                            <th>Módosító</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(faj.kepessegek).map(([nev, ertek]) => <tr>
                            <th>{Kepessegek.name(nev)}</th>
                            <td>{ertek === undefined ? '-' : ertek > 0 ? `+${ertek}` : ertek}</td>
                        </tr>)}
                    </tbody>
                </table>
            </>}
            {faj.harcertekAlap && <>
                <h3>Harcérték</h3>
                <table className='bordered'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Módosító</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>KÉ</th>
                            <td>{faj.harcertekAlap.ke ?? 0}</td>
                        </tr>
                        <tr>
                            <th>TÉ</th>
                            <td>{faj.harcertekAlap.te ?? 0}</td>
                        </tr>
                        <tr>
                            <th>VÉ</th>
                            <td>{faj.harcertekAlap.ve ?? 0}</td>
                        </tr>
                        <tr>
                            <th>CÉ</th>
                            <td>{faj.harcertekAlap.ce ?? 0}</td>
                        </tr>
                    </tbody>
                </table>
            </>}

            {faj.kepzettsegek && <>
                <h3>Képzettségek</h3>
                <table className='bordered'>
                    <thead>
                        <tr>
                            <th>Képzettség</th>
                            <th>Fok/%</th>
                        </tr>
                    </thead>
                    <tbody>
                        {faj.kepzettsegek.map(kepzettseg => <tr>
                            <td>{kepzettseg.name ?? Kepzettseg.name(kepzettseg.kepzettsegId)}</td>
                            <td>{kepzettseg.fok}</td>
                        </tr>)}

                    </tbody>
                </table>
            </>}

            {(faj.kulonlegesKepessegek || faj.infralatas) && <>
                <h3>Különleges képességek</h3>

                <MarkdownText>
                    {
                        (faj.infralatas ? `- Rendelkeznek infralátással, mely vaksötétben is ${faj.infralatas} méternyi látótávolságot jelent\n` : '') +
                        (faj.kulonlegesKepessegek ? faj.kulonlegesKepessegek : '')
                    }
                </MarkdownText>
            </>}

        </div>;

    return inline ? fajTabla : <Tooltip placement='right' overlay={fajTabla}>
        <Link to={`/entity/${faj.id}`}>{faj.name}</Link>
    </Tooltip>;
}