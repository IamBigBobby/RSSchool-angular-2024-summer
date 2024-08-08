import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.isLoggedIn()) {
    return true;
  }
  return router.createUrlTree(['/login-page']);
};
