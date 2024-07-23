import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { YoutubeService } from '../../../../core/services/youtube-service.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [ButtonComponent, RouterLink, RouterOutlet, RouterLinkActive],
  template: `
    <form class="search-field-form">
      <input
        class="search-field-form__input"
        type="text"
        placeholder="What are you want to find out?"
        #filter
      />
      <a
        routerLink="/main-page"
        routerLinkActive="active"
        ariaCurrentWhenActive="page"
      >
        <app-button
          class="search-field-form__button"
          (clicked)="filterValue(filter.value)"
          >Search</app-button
        >
      </a>
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
