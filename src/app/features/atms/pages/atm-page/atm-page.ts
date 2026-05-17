import { Component, OnInit, inject, signal, computed, effect, ChangeDetectionStrategy, untracked } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AtmHeader } from '../../components/atm-header/atm-header'
import { AtmToolbar } from '../../components/atm-toolbar/atm-toolbar';
import { AtmTable } from "../../components/atm-table/atm-table";
import { AtmDialogForm } from '../../components/atm-dialog-form/atm-dialog-form';
import { CommonDeleteDialog } from '../../../../shared/components/common-delete-dialog/common-delete-dialog';

import { Store } from '@ngrx/store';
import { AtmActions } from '../../store/atm.actions';
import { selectAtmEntities, selectAtmError, selectAtmLoading } from '../../store/atm.reducer';
import { Atm, AtmFormModal } from '../../models/atm.model';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-atm-page',
  imports: [MatButtonModule, MatDividerModule, MatIconModule, MatSnackBarModule, CommonDeleteDialog, AtmHeader, AtmToolbar, AtmTable, AtmDialogForm],
  templateUrl: './atm-page.html',
  styleUrl: './atm-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AtmPage implements OnInit {
  private store = inject(Store);
  private actions$ = inject(Actions);
  // State selectors
  readonly loading = this.store.selectSignal(selectAtmLoading);
  readonly error = this.store.selectSignal(selectAtmError);
  readonly atmEntities = this.store.selectSignal(selectAtmEntities);

  readonly atmList = computed(() =>
    Object.values(this.atmEntities() || {})
  );

  readonly isDialogOpen = signal<boolean>(false);
  readonly selectedAtm = signal<Atm | null>(null);
  readonly isDeleteDialogOpen = signal<boolean>(false);
  readonly selectedDeleteAtm = signal<Atm | null>(null);
  readonly deleteDialogDescription = computed(() => {
    const atm = this.selectedDeleteAtm();
    if (!atm) {
      return 'Bạn có chắc chắn muốn xoá mục này không?';
    }

    return `Bạn có chắc chắn muốn xóa máy ATM "${atm.atmName}" (Serial: ${atm.serialNumber}) ra khỏi hệ thống không?`;
  });

  protected searchKeyword = signal('');

  readonly dataList = computed<Atm[]>(() => {
    const atms = this.atmList();
    const keyword = this.searchKeyword()?.trim().toLowerCase();
    if (!keyword) {
      return atms;
    }
    return atms.filter(atm => {
      const matchName = atm.atmName?.toLowerCase().includes(keyword);
      const matchSerial = atm.serialNumber?.toLowerCase().includes(keyword);

      return matchName || matchSerial;
    });
  });

  constructor() {
    this.actions$.pipe(
      ofType(AtmActions.createAtmSuccess, AtmActions.updateAtmSuccess),
      takeUntilDestroyed()
    ).subscribe(() => {
      this.onDialogClose();
    });

    this.actions$.pipe(
      ofType(AtmActions.deleteAtmSuccess),
      takeUntilDestroyed()
    ).subscribe(() => {
      this.onDeleteDialogClose();
    });
  }

  ngOnInit(): void {
    this.store.dispatch(AtmActions.initAutoFetch())
  }

  ngOnDestroy(): void {
    this.store.dispatch(AtmActions.stopAutoFetch())
  }

  //Function handlers
  onAddNewAtm(): void {
    this.selectedAtm.set(null);
    this.isDialogOpen.set(true);
  }

  onEditAtm(atm: Atm): void {
    this.selectedAtm.set(atm);
    this.isDialogOpen.set(true);
  }

  onDeleteAtm(atm: Atm): void {
    this.selectedDeleteAtm.set(atm);
    this.isDeleteDialogOpen.set(true);
  }

  onDeleteDialogClose(): void {
    this.isDeleteDialogOpen.set(false);
    this.selectedDeleteAtm.set(null);
  }

  onConfirmDelete(): void {
    const atm = this.selectedDeleteAtm();
    if (!atm) {
      return;
    }
    this.store.dispatch(AtmActions.deleteAtm({ id: atm.id }));
  }

  onDialogClose(): void {
    this.isDialogOpen.set(false);
    this.selectedAtm.set(null);
  }

  onSave(atm: AtmFormModal): void {
    const selected = this.selectedAtm();
    if (selected) {
      this.store.dispatch(AtmActions.updateAtm({ id: selected.id, atm }));
    } else {
      this.store.dispatch(AtmActions.createAtm({ atm }));
    }
  }
}
