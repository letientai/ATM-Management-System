import { inject, Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpErrorResponse
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private readonly notificationService = inject(NotificationService);

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                this.handleError(error);
                return throwError(() => error);
            })
        );
    }

    private handleError(error: HttpErrorResponse): void {
        switch (error.status) {
            //Handle Notification for each status code
            //............................
            case 400:
                console.error('Bad Request', error.error);
                this.notificationService.error(error.error?.message || 'Bad Request');
                break;

            case 401:
                console.error('Unauthorized - redirect to login');
                this.notificationService.error('Unauthorized. Please log in again.');
                break;

            case 403:
                console.error('Forbidden');
                this.notificationService.error('Forbidden. You do not have permission to access this resource.');
                break;

            case 404:
                console.error('Not Found');
                this.notificationService.error('Not Found. The requested resource does not exist.');
                break;

            case 500:
                console.error('Internal Server Error');
                this.notificationService.error('Internal Server Error. Please try again later.');
                break;

            default:
                console.error('Unknown error', error);
        }
    }
}