import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { AtmActions } from './atm.actions';
import { AtmState, initialAtmState, } from './atm.state';
import { Atm } from '../models/atm.model';


export const atmReducer = createReducer(
    initialAtmState,
    //GET ALL
    on(AtmActions.getAtms, (state) => ({
        ...state,
        loading: { ...state.loading, getAtms: true },
        error: null
    })),
    on(AtmActions.getAtmsSuccess, (state, { atms }) => {
        const entities = atms.reduce((acc, atm) => {
            acc[atm.id] = atm;
            return acc;
        }, {} as Record<string, Atm>);

        return {
            ...state,
            ids: atms.map(a => a.id),
            entities,
            loading: { ...state.loading, getAtms: false },
        };
    }),
    //CREATE
    on(AtmActions.createAtm, (state) => ({ ...state, loading: { ...state.loading, createAtm: true } })),
    on(AtmActions.createAtmSuccess, (state, { atm }) => ({
        ...state,
        ids: [atm.id, ...state.ids],
        entities: {
            ...state.entities,
            [atm.id]: atm,
        },
        loading: { ...state.loading, createAtm: false },
    })),

    //UPDATE
    on(AtmActions.updateAtm, (state) => ({ ...state, loading: { ...state.loading, updateAtm: true } })),
    on(AtmActions.updateAtmSuccess, (state, { atm }) => ({
        ...state,
        entities: {
            ...state.entities,
            [atm.id]: atm,
        },
        loading: { ...state.loading, updateAtm: false },
    })),
    //DELETE
    on(AtmActions.deleteAtm, (state) => ({ ...state, loading: { ...state.loading, deleteAtm: true } })),
    on(AtmActions.deleteAtmSuccess, (state, { id }) => {
        const { [id]: removed, ...rest } = state.entities;

        return {
            ...state,
            ids: state.ids.filter(i => i !== id),
            entities: rest,
            loading: { ...state.loading, deleteAtm: false },
        };
    }),


    on(
        AtmActions.getAtmsFailure,
        AtmActions.createAtmFailure,
        AtmActions.updateAtmFailure,
        AtmActions.deleteAtmFailure,
        (state, { error }) => ({ ...state, error, loading: { getAtms: false, createAtm: false, updateAtm: false, deleteAtm: false } })
    )
);

const selectAtmState = createFeatureSelector<AtmState>('atmFeature');

export const selectAtmEntities = createSelector(selectAtmState, (state) => state.entities);
export const selectAtmLoading = createSelector(selectAtmState, (state) => state.loading);
export const selectAtmError = createSelector(selectAtmState, (state) => state.error);