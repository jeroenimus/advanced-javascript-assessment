import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  await authService.checkAuthStateReady();
  const user = authService.getCurrentUser();

  if (user && state.url === '/login') {
    return router.parseUrl('/dashboard');
  }
  else {
    return true;
  }
};
