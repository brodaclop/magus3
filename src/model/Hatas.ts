import { Harcertek } from "./Harcertek";
import { KEPESSEGEK } from "./Kepessegek";
import { NamedEntity } from "./util";

export interface Hatas extends NamedEntity {
    aktiv: boolean;
    kepesseg?: Partial<Record<typeof KEPESSEGEK[0]['id'], number>>;
    harcertek?: Partial<Harcertek>;
    psziDiszciplina?: Array<string>;
    varazslat?: Array<string>;
    mana?: number;
    manaPerSzint?: number;
    pszi?: number;
    psziPerSzint?: number;
    kp?: number;
    ep?: number;
    fp?: number;
};