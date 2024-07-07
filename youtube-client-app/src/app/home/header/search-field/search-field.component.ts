import { Component } from '@angular/core';
import { mockData } from '../../../../../mock-data';
import { YouTubeInterface } from '../../../you-tube-interface';

@Component({
  selector: 'app-search-field',
  standalone: true,
  imports: [],
  template: `
    <section class="search-field">
      <img src="/assets/logo.svg" alt="logo" />
      <form>
        <input type="text" placeholder="What are you want to find out?" />
        <button class="primary" type="button">Search</button>
      </form>
      <img src="/assets/search_settings.svg" alt="search_settings" />
    </section>
  `,
  styleUrl: './search-field.component.scss',
})
export class SearchFieldComponent {
  data: YouTubeInterface = mockData;
}
