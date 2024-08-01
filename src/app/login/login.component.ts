import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../shared/components/button/button.component';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  template: `
    <div class="login__wrapper">
      <form
        class="login"
        [formGroup]="loginForm"
        (ngSubmit)="
          submitUser(
            this.loginForm.value.login ?? '',
            this.loginForm.value.password ?? ''
          )
        "
      >
        <h2 class="login__title">Login</h2>
        <label for="user-input" class="login__label-user">Username</label>
        <input
          id="user-input"
          class="login__input-user"
          type="text"
          placeholder="Enter your login"
          formControlName="login"
        />
        <label for="password-input" class="login__label-password"
          >Password</label
        >
        <input
          id="password-input"
          class="login__input-password"
          type="password"
          placeholder="Enter your password"
          formControlName="password"
        />
        <app-button class="login__submit" type="submit">Login</app-button>
      </form>
    </div>
  `,
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private loginService = inject(LoginService);

  private router = inject(Router);

  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });

  protected submitUser(user: string, password: string) {
    console.log('user: ', user, 'password: ', password);
    this.loginService.login();
    this.router.navigate(['']);
  }
}
