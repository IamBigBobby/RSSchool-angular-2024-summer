import { Component, ViewChild } from '@angular/core';
import { YoutubeService } from '../../youtube-service.service';
import { MainContentComponent } from '../main/main-content/main-content.component';

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
        <img
          class="search-field__show-sort-field"
          src="/assets/search_settings.svg"
          alt="search_settings"
          (click)="toggleSortField()"
        />
      </section>
      <section class="profile-section">
        <p>Your Name</p>
        <img src="/assets/login.svg" alt="login" />
      </section>
      @if (isSortFieldVisible) {
        <section class="sort-field">
          <p>Sorting by:</p>
          <div class="sort-settings">
            <div class="sort-settings__position" (click)="clickSortByDate()">date</div>
            <div class="sort-settings__position" (click)="clickSortByViews()">count of views</div>
            <div class="sort-input">
              <p>by word of sentance</p>
              <form>
                <input type="text" placeholder="" (input)="sortByKeyWordTap($event)" />
              </form>
            </div>
          </div>
        </section>
      }
    </div>
  `,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isSortFieldVisible: boolean = false;
  isSortDateUp: boolean = false;
  isSortViewsUp: boolean = false;

  constructor(private youtubeServiceData: YoutubeService) {}

  getFilterValue(word: string) {
    this.youtubeServiceData.getVideos(word);
  }

  clickSortByDate() {
    this.isSortDateUp = !this.isSortDateUp;

    this.isSortDateUp ? this.youtubeServiceData.sortByDateDown() : this.youtubeServiceData.sortByDateUp();
  }

  clickSortByViews() {
    this.isSortViewsUp = !this.isSortViewsUp;

    this.isSortViewsUp ? this.youtubeServiceData.sortByViewsDown() : this.youtubeServiceData.sortByViewsUp();
  }

  toggleSortField() {
    this.isSortFieldVisible = !this.isSortFieldVisible;
  }

  sortByKeyWordTap(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const keyword = inputElement.value;
    this.youtubeServiceData.sortByKeyWord(keyword);
  }
}
