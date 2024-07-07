import { Component } from '@angular/core';
import { SearchFieldComponent } from './search-field/search-field.component';
import { ProfileComponent } from './profile/profile.component';
import { SortFieldComponent } from './sort-field/sort-field.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchFieldComponent, ProfileComponent, SortFieldComponent],
  template: `
    <div class="header-wrapper">
      <app-search-field class="search-field"></app-search-field>
      <app-profile class="profile-section"></app-profile>
      <app-sort-field class="sort-settings"></app-sort-field>
    </div>
  `,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
