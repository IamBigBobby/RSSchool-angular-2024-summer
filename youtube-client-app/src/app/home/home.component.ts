import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './header/profile/profile.component';
import { MainContentComponent } from './main/main-content/main-content.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, MainContentComponent],
  template: `
    <div class="app-wrapper">
      <app-header></app-header>
      <app-main-content></app-main-content>
    </div>
  `,
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
