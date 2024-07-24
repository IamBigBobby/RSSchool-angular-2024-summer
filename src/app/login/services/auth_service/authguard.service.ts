import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../login_service/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService implements CanActivate {
  private loginService = inject(LoginService);

  private router = inject(Router);

  canActivate(): boolean {
    if (this.loginService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login-page']);
    return false;
  }
}
