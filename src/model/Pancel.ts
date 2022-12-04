import { PancelBlokk } from "./PancelBuilder";
import { NamedEntity } from "./util";

export interface Pancel extends NamedEntity, PancelBlokk {
    igazitas: PancelBlokk;
}