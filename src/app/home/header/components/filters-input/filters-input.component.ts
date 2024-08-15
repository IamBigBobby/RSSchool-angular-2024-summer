import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { setSortType } from '../../../../core/store/actions/sort-type.actions';
import { getSortKeyWord } from '../../../../core/store/actions/key-word.action';

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
                (input)="onFilterWordChange($event)"
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

  private store = inject(Store);

  isSortDateUp: boolean = false;

  isSortViewsUp: boolean = false;

  onSortByDateClick() {
    this.isSortDateUp = !this.isSortDateUp;

    if (this.isSortDateUp) {
      this.store.dispatch(setSortType({ sortType: 'dateAsc' }));
    } else {
      this.store.dispatch(setSortType({ sortType: 'dateDesc' }));
    }
  }

  onSortByViewsClick() {
    this.isSortViewsUp = !this.isSortViewsUp;

    if (this.isSortViewsUp) {
      this.store.dispatch(setSortType({ sortType: 'viewsAsc' }));
    } else {
      this.store.dispatch(setSortType({ sortType: 'viewsDesc' }));
    }
  }

  onFilterWordChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const keyword = inputElement.value;
    this.store.dispatch(getSortKeyWord({ key: keyword }));
  }
}
