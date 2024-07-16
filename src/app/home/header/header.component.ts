import { Component } from '@angular/core';

import { NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '../../button/button.component';
import { YoutubeService } from '../../youtube-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, NgOptimizedImage],
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
        <form class="header__search-field-form">
          <input
            class="header__search-field-input"
            type="text"
            placeholder="What are you want to find out?"
            #filter
          />
          <app-button
            class="header__search-field-button"
            (clicked)="getFilterValue(filter.value)"
            >Search</app-button
          >
        </form>
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
      <section class="header__profile-section">
        <p>Your Name</p>
        <img src="assets/login.svg" alt="login" />
      </section>
      @if (isSortFieldVisible) {
        <section class="header__sort-field">
          <p>Sorting by:</p>
          <div class="header__sort-settings">
            <div
              class="header__sort-settings-position"
              (click)="onClickSortByDate()"
              tabindex="0"
              role="button"
            >
              date
            </div>
            <div
              class="header__sort-settings-position"
              (click)="onClickSortByViews()"
              tabindex="0"
              role="button"
            >
              count of views
            </div>
            <div class="header__sort-input">
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
    </header>
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
