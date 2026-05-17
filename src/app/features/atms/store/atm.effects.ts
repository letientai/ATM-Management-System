import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AtmActions } from './atm.actions';
import { catchError, map, mergeMap, switchMap, takeUntil, tap } from 'rxjs/operators';
import { of, timer } from 'rxjs';
import { AtmService } from '../services/atm-api.service';

@Injectable()
export class AtmEffects {
    private actions$ = inject(Actions);
    private atmService = inject(AtmService);

    autoRefresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AtmActions.initAutoFetch),
            switchMap(() =>
                timer(0, 120000).pipe(
                    takeUntil(this.actions$.pipe(ofType(AtmActions.stopAutoFetch))),
                    map(() => AtmActions.getAtms())
                )
            )
        )
    );

    getAtms$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AtmActions.getAtms),
            switchMap(() =>
                this.atmService.getATMs().pipe(
                    map((atms) => AtmActions.getAtmsSuccess({ atms })),
                    catchError((error) => of(AtmActions.getAtmsFailure({ error: error.message })))
                )
            )
        )
    );

    //CREATE
    createAtm$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AtmActions.createAtm),
            mergeMap(({ atm }) =>
                this.atmService.createATM(atm).pipe(
                    map((newAtm) => AtmActions.createAtmSuccess({ atm: newAtm })),
                    catchError((error) => of(AtmActions.createAtmFailure({ error: error.message })))
                )
            )
        )
    );

    //UPDATE
    updateAtm$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AtmActions.updateAtm),
            mergeMap(({ id, atm }) =>
                this.atmService.updateATM(id, atm).pipe(
                    map((updatedAtm) => AtmActions.updateAtmSuccess({ atm: updatedAtm })),
                    catchError((error) => of(AtmActions.updateAtmFailure({ error: error.message })))
                )
            )
        )
    );

    //DELETE
    deleteAtm$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AtmActions.deleteAtm),
            mergeMap(({ id }) =>
                this.atmService.deleteATM(id).pipe(
                    map(() => AtmActions.deleteAtmSuccess({ id })),
                    catchError((error) => of(AtmActions.deleteAtmFailure({ error: error.message })))
                )
            )
        )
    );


}