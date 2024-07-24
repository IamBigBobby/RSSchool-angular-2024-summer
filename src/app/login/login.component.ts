import { Component } from '@angular/core';
import { ButtonComponent } from '../shared/components/button/button.component';

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
  protected submitUser(user: string, password: string) {
    console.log(user, password);
  }
}
