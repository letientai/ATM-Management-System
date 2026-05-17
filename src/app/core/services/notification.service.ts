import { inject, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CommonToastComponent, ToastData } from "../../shared/components/common-toast/common-toast";

@Injectable({ providedIn: 'root' })
export class NotificationService {
    private snackBar = inject(MatSnackBar);

    private show(message: string, type: ToastData['type']): void {
        this.snackBar.openFromComponent(CommonToastComponent, {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            data: { message, type },
            panelClass: ['custom-snack-container']
        });
    }

    success(message: string): void {
        this.show(message, 'success');
    }

    error(message: string): void {
        this.show(message, 'error');
    }

    warning(message: string): void {
        this.show(message, 'warning');
    }

    info(message: string): void {
        this.show(message, 'info');
    }
}