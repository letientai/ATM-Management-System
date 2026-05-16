import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    title: 'ATM Management',
    loadComponent: () =>
      import(
        './features/atms/pages/atm-page/atm-page'
      ).then(
        m => m.AtmPage
      )
  }
];