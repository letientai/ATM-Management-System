import { Atm } from "../models/atm.model";


export interface AtmState {
    ids: string[];
    entities: Record<string, Atm>;
    loading: {
        getAtms: boolean;
        createAtm: boolean;
        updateAtm: boolean;
        deleteAtm: boolean;
    };
    error: string | null;
}
export const initialAtmState: AtmState = {
    ids: [],
    entities: {},
    loading: {
        getAtms: false,
        createAtm: false,
        updateAtm: false,
        deleteAtm: false,
    },
    error: null,
};