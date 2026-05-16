import { Component, OnInit, inject, signal, effect, computed } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { AtmHeader } from '../../components/atm-header/atm-header'
import { AtmToolbar } from '../../components/atm-toolbar/atm-toolbar';
import { AtmTable } from "../../components/atm-table/atm-table";
import { Store } from '@ngrx/store';
import { AtmActions } from '../../store/atm.actions';
import { selectAtmEntities, selectAtmLoading } from '../../store/atm.reducer';
import { Atm } from '../../models/atm.model';

@Component({
  selector: 'app-atm-page',
  imports: [MatButtonModule, MatDividerModule, MatIconModule, AtmHeader, AtmToolbar, AtmTable],
  templateUrl: './atm-page.html',
  styleUrl: './atm-page.scss',
})

export class AtmPage implements OnInit {
  private store = inject(Store);

  readonly atmEntities = this.store.selectSignal(selectAtmEntities);
  readonly loading = this.store.selectSignal(selectAtmLoading);

  protected searchKeyword = signal('');

  readonly dataList: () => Atm[] = computed(() => {
    const atms = Object.values(this.atmEntities() || {});
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


}
