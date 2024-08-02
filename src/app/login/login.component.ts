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
        @if (
          loginForm.get('login')?.invalid &&
          (loginForm.get('login')?.touched || loginForm.get('login')?.dirty)
        ) {
          @if (loginForm.get('login')?.hasError('required')) {
            <span>Please enter a login email</span>
          } @else if (loginForm.get('login')?.hasError('email')) {
            <span>The login email is invalid</span>
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
        @if (
          loginForm.get('password')?.invalid &&
          (loginForm.get('password')?.touched ||
            loginForm.get('password')?.dirty)
        ) {
          @if (loginForm.get('password')?.hasError('required')) {
            <span>Please enter a password</span>
          }
          @if (loginForm.get('password')?.value?.length > 0) {
            <span
              >Your password isn't strong enough
              @if (loginForm.get('password')?.hasError('minLength')) {
                <span>at least 8 characters</span>
              }
              @if (loginForm.get('password')?.hasError('mixedCase')) {
                <span>, a mixture of both uppercase and lowercase letters</span>
              }
              @if (loginForm.get('password')?.hasError('lettersAndNumbers')) {
                <span>, a mixture of letters and numbers</span>
              }
              @if (loginForm.get('password')?.hasError('specialCharacter')) {
                <span
                  >, inclusion of at least one special character, e.g., ! &#64;
                  # ? ]</span
                >
              }
            </span>
          }
        }
        <app-button class="login__submit" type="submit">Login</app-button>
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

  protected submitUser(user: string, password: string) {
    console.log('user: ', user, 'password: ', password);
    this.loginService.login();
    this.router.navigate(['']);
  }
}
