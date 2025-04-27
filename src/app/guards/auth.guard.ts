import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  await authService.checkAuthStateReady();
  const user = authService.getCurrentUser();

  if (user) {
    return true;
  }
  else {
    return router.parseUrl('/login');
  }
};
