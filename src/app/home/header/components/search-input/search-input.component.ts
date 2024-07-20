import { Component } from '@angular/core';
import { YoutubeService } from '../../../../core/services/youtube-service.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <form class="search-field-form">
      <input
        class="search-field-form__input"
        type="text"
        placeholder="What are you want to find out?"
        #filter
      />
      <app-button class="search-field-form__button" (clicked)="filterValue()"
        >Search</app-button
      >
    </form>
  `,
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent {
  constructor(private youtubeServiceData: YoutubeService) {}

  filterValue() {
    this.youtubeServiceData.loadVideos();
  }
}
