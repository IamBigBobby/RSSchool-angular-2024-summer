import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import HeaderComponent from './header/header.component';
import { MainContentComponent } from './main/main-content.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, MainContentComponent, RouterOutlet],
  template: `
    <div class="app-wrapper">
      <app-header></app-header>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './home.component.scss',
})
export default class HomeComponent {}
