import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../shared/components/button/button.component';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <form class="login">
      <input
        class="login__input-user"
        type="text"
        placeholder="Enter your login"
        #inputUser
      />
      <input
        class="login__input-password "
        type="text"
        placeholder="Enter your password"
        #inputPassword
      />
      <app-button
        class="login__submit"
        (click)="submitUser(inputUser.value, inputPassword.value)"
        >Login</app-button
      >
    </form>
  `,
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public user?: string;
  public password?: string;

  private loginService = inject(LoginService);

  protected submitUser(user: string, password: string) {
    this.user = user;
    this.password = password;

    this.loginService.login();
    console.log(this.user, this.password);
  }
}
