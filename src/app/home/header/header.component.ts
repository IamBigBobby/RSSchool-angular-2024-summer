import { Component } from '@angular/core';

import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { FiltersInputComponent } from './components/filters-input/filters-input.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonComponent,
    NgOptimizedImage,
    SearchInputComponent,
    FiltersInputComponent,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
  ],
  template: `
    <header class="header">
      <section class="header__search-field">
        <img
          class="header__logo"
          ngSrc="assets/logo.svg"
          width="50"
          height="50"
          priority
          alt="logo"
        />
        <app-search-input></app-search-input>
        <img
          class="header__show-sort-field"
          ngSrc="assets/search_settings.svg"
          width="25"
          height="25"
          (click)="toggleSortField()"
          priority
          alt="sort-button"
          tabindex="0"
          role="button"
        />
      </section>
      <a
        routerLink="/login-page"
        routerLinkActive="active"
        ariaCurrentWhenActive="page"
      >
        <section class="header__profile-section">
          <p>Your Name</p>
          <img src="assets/login.svg" alt="login" />
        </section>
      </a>
      <app-filters-input
        class="header__sort-field"
        [isSortFieldVisibleToggle]="isSortFieldVisible"
      ></app-filters-input>
    </header>
  `,
  styleUrl: './header.component.scss',
})
export default class HeaderComponent {
  isSortFieldVisible: boolean = false;

  toggleSortField() {
    this.isSortFieldVisible = !this.isSortFieldVisible;
  }
}
