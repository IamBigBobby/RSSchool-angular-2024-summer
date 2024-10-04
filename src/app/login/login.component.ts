import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../shared/components/button/button.component';
import { LoginService } from './services/login.service';
import {
  lettersAndNumbersValidator,
  minLengthValidator,
  mixedCaseValidator,
  specialCharacterValidator,
} from '../shared/validators/custom-validators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  template: `
    <div class="login__wrapper">
      <form class="login" [formGroup]="loginForm" (ngSubmit)="submitUser()">
        <h2 class="login__title">Login</h2>
        <label for="user-input" class="login__label-user">Username</label>
        <input
          id="user-input"
          class="login__input-user"
          type="text"
          placeholder="Enter your login"
          formControlName="login"
        />
        @let login = loginForm.get('login');
        @if (login?.invalid && (login?.touched || login?.dirty)) {
          @if (login?.hasError('required')) {
            <span class="error-validate-massage"
              >Please enter a login email</span
            >
          } @else if (login?.hasError('email')) {
            <span class="error-validate-massage"
              >The login email is invalid</span
            >
          }
        }
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
        @let password = loginForm.get('password');
        @if (password?.invalid && (password?.touched || password?.dirty)) {
          @if (password?.hasError('required')) {
            <span class="error-validate-massage">Please enter a password</span>
          }
          @if (password?.value?.length > 0) {
            <span class="error-validate-massage"
              >Your password isn't strong enough
              @if (password?.hasError('minLength')) {
                <span class="error-validate-massage"
                  >at least 8 characters</span
                >
              }
              @if (password?.hasError('mixedCase')) {
                <span class="error-validate-massage"
                  >, a mixture of both uppercase and lowercase letters</span
                >
              }
              @if (password?.hasError('lettersAndNumbers')) {
                <span class="error-validate-massage"
                  >, a mixture of letters and numbers</span
                >
              }
              @if (password?.hasError('specialCharacter')) {
                <span class="error-validate-massage"
                  >, inclusion of at least one special character, e.g., ! &#64;
                  # ? ]</span
                >
              }
            </span>
          }
        }
        <app-button
          class="login__submit"
          type="submit"
          [disabled]="!loginForm.valid"
          >Login</app-button
        >
      </form>
    </div>
  `,
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private loginService = inject(LoginService);

  private router = inject(Router);

  private formBuilder = inject(FormBuilder);

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          minLengthValidator(8),
          mixedCaseValidator(),
          lettersAndNumbersValidator(),
          specialCharacterValidator(),
        ],
      ],
    });
  }

  public submitUser() {
    console.log(this.loginForm.value);
    this.loginService.login();
    this.router.navigate(['']);
  }
}
