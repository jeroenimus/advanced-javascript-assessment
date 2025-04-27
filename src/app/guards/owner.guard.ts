import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { LedgerService } from '../services/ledger.service';

export const ownerGuard: CanActivateFn = async (route) => {
  const authService = inject(AuthService);
  const ledgerService = inject(LedgerService);
  const router = inject(Router);

  await authService.checkAuthStateReady();
  const user = authService.getCurrentUser();

  const ledgerId = route.params['id'];
  const ledger = await ledgerService.getLedgerById(ledgerId);

  if (user?.uid === ledger?.ownerId) {
    return true;
  }
  else {
    return router.parseUrl('/forbidden');
  }
};
