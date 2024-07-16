import { Component } from '@angular/core';

import { ButtonComponent } from '../../button/button.component';
import { YoutubeService } from '../../youtube-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="header-wrapper">
      <section class="search-field">
        <img src="assets/logo.svg" alt="logo" />
        <form class="search-field__form">
          <input
            class="search-field__input"
            type="text"
            placeholder="What are you want to find out?"
            #filter
          />
          <app-button
            class="search-field__button"
            (clicked)="getFilterValue(filter.value)"
            >Search</app-button
          >
        </form>
        <img
          class="search-field__show-sort-field"
          src="assets/search_settings.svg"
          alt="search_settings"
          (click)="toggleSortField()"
          tabindex="0"
          role="button"
        />
      </section>
      <section class="profile-section">
        <p>Your Name</p>
        <img src="assets/login.svg" alt="login" />
      </section>
      @if (isSortFieldVisible) {
        <section class="sort-field">
          <p>Sorting by:</p>
          <div class="sort-settings">
            <div
              class="sort-settings__position"
              (click)="onClickSortByDate()"
              tabindex="0"
              role="button"
            >
              date
            </div>
            <div
              class="sort-settings__position"
              (click)="onClickSortByViews()"
              tabindex="0"
              role="button"
            >
              count of views
            </div>
            <div class="sort-input">
              <p>by word of sentance</p>
              <form>
                <input
                  type="text"
                  placeholder=""
                  (input)="sortByKeyWordTap($event)"
                />
              </form>
            </div>
          </div>
        </section>
      }
    </div>
  `,
  styleUrl: './header.component.scss',
})
export default class HeaderComponent {
  isSortFieldVisible: boolean = false;

  isSortDateUp: boolean = false;

  isSortViewsUp: boolean = false;

  constructor(private youtubeServiceData: YoutubeService) {}

  getFilterValue(word: string) {
    this.youtubeServiceData.getVideos(word);
  }

  onClickSortByDate() {
    this.isSortDateUp = !this.isSortDateUp;

    if (this.isSortDateUp) {
      this.youtubeServiceData.sortByDateDown();
    } else {
      this.youtubeServiceData.sortByDateUp();
    }
  }

  onClickSortByViews() {
    this.isSortViewsUp = !this.isSortViewsUp;

    if (this.isSortViewsUp) {
      this.youtubeServiceData.sortByViewsDown();
    } else {
      this.youtubeServiceData.sortByViewsUp();
    }
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
