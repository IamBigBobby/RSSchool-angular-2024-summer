import { Component, Input } from '@angular/core';
import { YoutubeService } from '../../../../core/services/youtube-service.service';

@Component({
  selector: 'app-filters-input',
  standalone: true,
  imports: [],
  template: `
    @if (isSortFieldVisibleToggle) {
      <section class="sort-field">
        <p>Sorting by:</p>
        <div class="sort-field__settings">
          <div
            class="sort-field__position"
            (click)="onSortByDateClick()"
            tabindex="0"
            role="button"
          >
            date
          </div>
          <div
            class="sort-field__position"
            (click)="onSortByViewsClick()"
            tabindex="0"
            role="button"
          >
            count of views
          </div>
          <div class="sort-field__input">
            <p>by word of sentance</p>
            <form>
              <input
                type="text"
                placeholder=""
                (input)="onSortByKeyWordTap($event)"
              />
            </form>
          </div>
        </div>
      </section>
    }
  `,
  styleUrl: './filters-input.component.scss',
})
export class FiltersInputComponent {
  @Input() isSortFieldVisibleToggle!: boolean;

  isSortDateUp: boolean = false;

  isSortViewsUp: boolean = false;

  constructor(private youtubeServiceData: YoutubeService) {}

  onSortByDateClick() {
    this.isSortDateUp = !this.isSortDateUp;

    if (this.isSortDateUp) {
      this.youtubeServiceData.sortByDateDesc();
    } else {
      this.youtubeServiceData.sortByDateAsc();
    }
  }

  onSortByViewsClick() {
    this.isSortViewsUp = !this.isSortViewsUp;

    if (this.isSortViewsUp) {
      this.youtubeServiceData.sortByViewsDesc();
    } else {
      this.youtubeServiceData.sortByViewsAsc();
    }
  }

  onSortByKeyWordTap(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const keyword = inputElement.value;
    this.youtubeServiceData.sortByKeyWord(keyword);
  }
}
