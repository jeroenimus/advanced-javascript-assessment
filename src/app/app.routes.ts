import { Routes } from '@angular/router';

import { ArchiveListComponent } from './components/archive-list/archive-list.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EntryListComponent } from './components/entry-list/entry-list.component';
import { LoginComponent } from './components/login/login.component';
import { LedgerListComponent } from './components/ledger-list/ledger-list.component';
import { PageForbiddenComponent } from './components/page-forbidden/page-forbidden.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { archivedGuard } from './guards/archived.guard';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { ownerGuard } from './guards/owner.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'ledgers',
    component: LedgerListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'ledgers/:id',
    component: EntryListComponent,
    canActivate: [authGuard, archivedGuard, ownerGuard]
  },
  {
    path: 'categories',
    component: CategoryListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'archive',
    component: ArchiveListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'forbidden',
    component: PageForbiddenComponent,
    canActivate: [authGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard'
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    canActivate: [authGuard]
  }
];
