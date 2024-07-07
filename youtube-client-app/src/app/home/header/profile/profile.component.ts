import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  template: `
    <section class="profile-section">
      <img src="/assets/login.svg" alt="login" />
    </section>
  `,
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {}
