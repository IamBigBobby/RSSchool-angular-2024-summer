import { Component, ElementRef, inject, ViewChild } from '@angular/core';
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
        (input)="onFilterChange($event)"
      />
    </form>
  `,
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent {
  private youtubeService = inject(YoutubeService);

  @ViewChild('filter', { static: true }) filter!: ElementRef<HTMLInputElement>;

  onFilterChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();

    if (value.length >= 3) {
      this.youtubeService.searchVideos(value);
    }
  }
}
