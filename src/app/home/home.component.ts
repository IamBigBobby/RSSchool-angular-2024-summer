import { Component } from '@angular/core';

import HeaderComponent from './header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  template: `
    <div class="app-wrapper">
      <app-header></app-header>
    </div>
  `,
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
