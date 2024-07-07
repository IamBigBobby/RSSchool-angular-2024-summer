import { Component } from '@angular/core';
import { SearchFieldComponent } from './search-field/search-field.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchFieldComponent],
  template: `
  <div class="header-wrapper">
    <app-search-field></app-search-field>
  </div> 
  `,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
