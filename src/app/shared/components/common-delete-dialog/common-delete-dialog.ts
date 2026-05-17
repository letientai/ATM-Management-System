import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export interface DeleteDialogData {
  isOpen?: boolean;
  title?: string;
  description?: string;
  confirmBtnText?: string;
  cancelBtnText?: string;
  loading?: boolean;
}

@Component({
  selector: 'app-common-delete-dialog',
  templateUrl: './common-delete-dialog.html',
  styleUrl: './common-delete-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommonDeleteDialog {
  readonly isOpen = input(false);
  readonly title = input('Xác nhận xoá');
  readonly description = input('Bạn có chắc chắn muốn xoá mục này không?');
  readonly confirmBtnText = input('Xoá');
  readonly cancelBtnText = input('Huỷ');
  readonly loading = input(false);

  readonly confirm = output<void>();
  readonly cancel = output<void>();

  onConfirm(): void {
    if (this.loading()) {
      return;
    }

    this.confirm.emit();
  }

  onCancel(): void {
    if (this.loading()) {
      return;
    }

    this.cancel.emit();
  }
}