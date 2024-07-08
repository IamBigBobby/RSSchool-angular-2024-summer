import { Component } from '@angular/core';
import { YoutubeService } from '../../youtube-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `
    <div class="header-wrapper">
      <section class="search-field">
        <img src="/assets/logo.svg" alt="logo" />
        <form>
          <input type="text" placeholder="What are you want to find out?" #filter />
          <button class="primary" type="button" (click)="getFilterValue(filter.value)">Search</button>
        </form>
        <img src="/assets/search_settings.svg" alt="search_settings" />
      </section>
      <section class="profile-section">
        <p>Your Name</p>
        <img src="/assets/login.svg" alt="login" />
      </section>
      <section class="sort-field">
        <p>Sorting by:</p>
        <div class="sort-settings">
          <div>date</div>
          <div>count of views</div>
          <div class="sort-input">
            <p>by word of sentance</p>
            <form>
              <input type="text" placeholder="" />
            </form>
          </div>
        </div>
      </section>
    </div>
  `,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isSortFieldVisible: boolean = false;

  constructor(private youtubeServiceData: YoutubeService) {}

  getFilterValue(word: string) {
    this.youtubeServiceData.getVideos(word);
  }

  toggleSortField() {
    this.isSortFieldVisible = !this.isSortFieldVisible;
  }
}
