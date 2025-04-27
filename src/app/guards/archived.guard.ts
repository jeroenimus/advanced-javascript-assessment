import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { LedgerService } from '../services/ledger.service';

export const archivedGuard: CanActivateFn = async (route) => {
  const ledgerService = inject(LedgerService);
  const router = inject(Router);

  const ledgerId = route.params['id'];
  const ledger = await ledgerService.getLedgerById(ledgerId);

  if (ledger?.archived) {
    return router.parseUrl('/forbidden');
  }
  else {
    return true;
  }
};
