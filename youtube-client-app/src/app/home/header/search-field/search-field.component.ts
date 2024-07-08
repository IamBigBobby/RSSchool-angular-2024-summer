import { Component } from '@angular/core';
import { YoutubeService } from '../../../youtube-service.service';

@Component({
  selector: 'app-search-field',
  standalone: true,
  imports: [],
  template: `
    <section class="search-field">
      <img src="/assets/logo.svg" alt="logo" />
      <form>
        <input type="text" placeholder="What are you want to find out?" #filter />
        <button class="primary" type="button" (click)="getFilterValue(filter.value)">Search</button>
      </form>
      <img src="/assets/search_settings.svg" alt="search_settings" />
    </section>
  `,
  styleUrl: './search-field.component.scss',
})
export class SearchFieldComponent {
  constructor(private youtubeServiceData: YoutubeService) {}

  getFilterValue(word: string) {
    console.log('filter value', word);
    this.youtubeServiceData.getAllVideos();
  }
}
