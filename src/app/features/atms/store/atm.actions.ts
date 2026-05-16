import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Atm } from '../models/atm.model';

export const AtmActions = createActionGroup({
    source: 'ATM API',
    events: {
        'Init Auto Fetch': emptyProps(),
        'Stop Auto Fetch': emptyProps(),

        'Get Atms': emptyProps(),
        'Get Atms Success': props<{ atms: Atm[] }>(),
        'Get Atms Failure': props<{ error: string }>(),

        'Create Atm': props<{ atm: Omit<Atm, 'id'> }>(),
        'Create Atm Success': props<{ atm: Atm }>(),
        'Create Atm Failure': props<{ error: string }>(),

        'Update Atm': props<{ id: string; atm: Partial<Omit<Atm, 'id'>> }>(),
        'Update Atm Success': props<{ atm: Atm }>(),
        'Update Atm Failure': props<{ error: string }>(),

        'Delete Atm': props<{ id: string }>(),
        'Delete Atm Success': props<{ id: string }>(),
        'Delete Atm Failure': props<{ error: string }>(),
    }
});