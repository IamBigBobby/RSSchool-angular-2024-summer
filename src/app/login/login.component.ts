import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../shared/components/button/button.component';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="login__wrapper">
      <form class="login">
        <h2 class="login__title">Login</h2>
        <label for="user-input" class="login__label-user">Username</label>
        <input
          id="user-input"
          class="login__input-user"
          type="text"
          placeholder="Enter your login"
          #inputUser
        />
        <label for="password-input" class="login__label-password"
          >Password</label
        >
        <input
          id="password-input"
          class="login__input-password"
          type="password"
          placeholder="Enter your password"
          #inputPassword
        />
        <app-button
          class="login__submit"
          (click)="submitUser(inputUser.value, inputPassword.value)"
          >Login</app-button
        >
      </form>
    </div>
  `,
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public user?: string;

  public password?: string;

  private loginService = inject(LoginService);

  private router = inject(Router);

  protected submitUser(user: string, password: string) {
    this.user = user;
    this.password = password;

    this.loginService.login();
    this.router.navigate(['']);
  }
}
