import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { YoutubeService } from '../../../../core/services/youtube-service.service';
import { getSearchWord } from '../../../../core/store/actions/search.action';

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
        (input)="onFilterChange($event)"
      />
    </form>
  `,
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent {
  private youtubeService = inject(YoutubeService);

  private store = inject(Store);

  @ViewChild('filter', { static: true }) filter!: ElementRef<HTMLInputElement>;

  onFilterChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();

    if (value.length >= 3) {
      this.store.dispatch(getSearchWord({ word: value }));
    }
  }
}
