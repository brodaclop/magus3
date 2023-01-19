import Tooltip from 'rc-tooltip';
import React from 'react';
import { Link } from 'react-router-dom';
import { Szabaly } from '../../model/Szabaly';
import { entityDivStyle } from '../../model/util';
import { MarkdownText } from '../MarkdownText';

export const SzabalyLeiras: React.FC<{ szabaly: Szabaly, inline?: boolean }> = ({ szabaly, inline }) => {
    const kasztTabla =
        <div style={entityDivStyle(inline)}>
            <table className='bordered'>
                <thead>
                    <tr>
                        <th>{szabaly.name}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><MarkdownText>{szabaly.leiras}</MarkdownText></td>
                    </tr>
                </tbody>
            </table>
        </div>;

    return inline ? kasztTabla : <Tooltip placement='right' overlay={kasztTabla}>
        <Link to={`/entity/${szabaly.id}`}>{szabaly.name}</Link>
    </Tooltip>;
}