import { Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LedgerListComponent } from './components/ledger-list/ledger-list.component';
import { ArchiveListComponent } from './components/archive-list/archive-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'ledgers',
    component: LedgerListComponent
  },
  {
    path: 'archive',
    component: ArchiveListComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
