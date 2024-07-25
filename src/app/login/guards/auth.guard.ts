import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const loginService = inject(LoginService);
  console.log('authGuard', loginService.isLoggedIn());
  return loginService.isLoggedIn();
};
