
import szabalyok from '../data/szabalyok.json';
import { NamedEntity, namedEntityArray } from './util';

export interface Szabaly extends NamedEntity {
    leiras: string;
}
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Szabaly = namedEntityArray(szabalyok as Array<Szabaly>);