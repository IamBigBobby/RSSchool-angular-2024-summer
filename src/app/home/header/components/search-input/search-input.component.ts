import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { YoutubeService } from '../../../../core/services/youtube-service.service';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  template: `
    <form class="search-field-form">
      <input
        class="search-field-form__input"
        type="text"
        placeholder="What are you want to find out?"
        #filter
      />
    </form>
  `,
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent {
  constructor(private youtubeServiceData: YoutubeService) {}

  filterValue(searchword: string) {
    this.youtubeServiceData.fetchBySearchWord(searchword);
    this.youtubeServiceData.loadVideos();
  }
}
