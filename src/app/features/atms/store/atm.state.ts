import { Atm } from "../models/atm.model";


export interface AtmState {
    ids: string[];
    entities: Record<string, Atm>;

    loading: boolean;
    error: string | null;
}
export const initialAtmState: AtmState = {
    ids: [],
    entities: {},
    loading: false,
    error: null,
};