import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { AtmHeader } from '../../components/atm-header/atm-header'
import { AtmToolbar } from '../../components/atm-toolbar/atm-toolbar';
import { AtmTable } from "../../components/atm-table/atm-table";

import { Store } from '@ngrx/store';
import { AtmActions } from '../../store/atm.actions';
import { selectAtmEntities, selectAtmError, selectAtmLoading } from '../../store/atm.reducer';
import { Atm } from '../../models/atm.model';

@Component({
  selector: 'app-atm-page',
  imports: [MatButtonModule, MatDividerModule, MatIconModule, AtmHeader, AtmToolbar, AtmTable],
  templateUrl: './atm-page.html',
  styleUrl: './atm-page.scss',
})

export class AtmPage implements OnInit {
  private store = inject(Store);

  readonly loading = this.store.selectSignal(selectAtmLoading);
  readonly error = this.store.selectSignal(selectAtmError);
  readonly atmEntities = this.store.selectSignal(selectAtmEntities);
  readonly atmList = computed(() =>
    Object.values(this.atmEntities() || {})
  );

  constructor() {
    effect(() => {
      const error = this.error();
      if (error) {
        console.error('Error loading ATMs:', error);
      }
    });
  }

  protected searchKeyword = signal('');

  readonly dataList: () => Atm[] = computed(() => {
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

  ngOnInit(): void {
    this.store.dispatch(AtmActions.initAutoFetch())
  }

  ngOnDestroy(): void {
    this.store.dispatch(AtmActions.stopAutoFetch())
  }

}
