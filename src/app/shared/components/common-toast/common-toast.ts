import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

export interface ToastData {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

@Component({
  selector: 'app-common-toast',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './common-toast.html',
  styleUrl: './common-toast.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommonToast {

  protected data: ToastData = inject(MAT_SNACK_BAR_DATA);
  protected snackBarRef = inject(MatSnackBarRef<CommonToast>);

  getIcon(): string {
    switch (this.data.type) {
      case 'success': return 'check_circle';
      case 'error': return 'cancel';
      case 'warning': return 'warning';
      default: return 'info';
    }
  }
}