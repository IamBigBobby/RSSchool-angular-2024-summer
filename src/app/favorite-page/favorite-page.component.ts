import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilteringKeyWordPipe } from '../shared/pipes/filtering-key-word.pipe';
import { ColorBorderCardDirective } from '../shared/directives/color-border-card.directive';
import { ButtonComponent } from '../shared/components/button/button.component';
import { VideoCardComponent } from '../shared/components/video-card/video-card.component';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';
import { CustomVideoCardComponent } from '../shared/components/custom-video-card/custom-video-card.component';
import { selectFavoriteVideos } from '../core/store/selectors/video-selectors';

@Component({
  selector: 'app-main-content',
  standalone: true,
  template: `
    <div class="favorite">
      <div class="favorite-container">
        @let videos = sortedVideoItems$ | async;
        @if (videos) {
          @for (youtubeElement of videos ?? []; track youtubeElement) {
            <app-video-card [videoItem]="youtubeElement"></app-video-card>
          }
        }
      </div>
    </div>
  `,
  styleUrls: ['./favorite-page.component.scss'],
  imports: [
    CommonModule,
    FilteringKeyWordPipe,
    ColorBorderCardDirective,
    ButtonComponent,
    NgOptimizedImage,
    VideoCardComponent,
    PaginationComponent,
    CustomVideoCardComponent,
  ],
})
export class FavoritePageComponent {
  private store = inject(Store);

  sortedVideoItems$ = this.store.select(selectFavoriteVideos);
}
