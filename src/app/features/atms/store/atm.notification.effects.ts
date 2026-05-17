import { Injectable, inject } from '@angular/core';

import {
    Actions,
    createEffect,
    ofType
} from '@ngrx/effects';

import { tap } from 'rxjs/operators';

import { AtmActions } from './atm.actions';
import { NotificationService } from '../../../core/services/notification.service';


@Injectable()
export class AtmNotificationEffects {
    private readonly actions$ = inject(Actions);
    private readonly notificationService = inject(NotificationService);

    createAtmSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AtmActions.createAtmSuccess),
            tap(() => {
                this.notificationService.success('ATM created successfully!');
            })
        ),
        { dispatch: false }
    );

    updateAtmSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AtmActions.updateAtmSuccess),
            tap(() => {
                this.notificationService.success('ATM updated successfully!');
            })
        ),
        { dispatch: false }
    );

    deleteAtmSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AtmActions.deleteAtmSuccess),
            tap(() => {
                this.notificationService.success('ATM deleted successfully!');
            })
        ),
        { dispatch: false }
    );

    // failure$ = createEffect(
    //     () =>
    //         this.actions$.pipe(

    //             ofType(
    //                 AtmActions.createAtmFailure,
    //                 AtmActions.updateAtmFailure,
    //                 AtmActions.deleteAtmFailure
    //             ),

    //             tap(({ error }) => {
    //                 this.notificationService.error(error);
    //             })
    //         ),
    //     { dispatch: false }
    // );
}