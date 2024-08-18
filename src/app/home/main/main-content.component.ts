import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ColorBorderCardDirective } from '../../shared/directives/color-border-card.directive';
import { FilteringKeyWordPipe } from '../../shared/pipes/filtering-key-word.pipe';
import { VideoCardComponent } from '../../shared/components/video-card/video-card.component';
import {
  selectCurrentMixedVideos,
  selectCustomVideos,
  selectMixedVideos,
  selectSortedVideoItems,
} from '../../core/store/selectors/video-selectors';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  template: `
    <main class="main">
      <!-- @let mixedVideos = mixedVideos$ | async | json;
      @if (mixedVideos) {
        {{ mixedVideos }}
      } -->
      <div class="main-container">
        @let videos = videos$ | async;
        @if (videos) {
          @for (youtubeElement of videos ?? []; track youtubeElement.id) {
            <app-video-card [videoItem]="youtubeElement"></app-video-card>
          }
        }
      </div>
      <app-pagination></app-pagination>
    </main>
  `,
  styleUrls: ['./main-content.component.scss'],
  imports: [
    CommonModule,
    FilteringKeyWordPipe,
    ColorBorderCardDirective,
    ButtonComponent,
    NgOptimizedImage,
    VideoCardComponent,
    PaginationComponent,
  ],
})
export class MainContentComponent {
  private store = inject(Store);

  videos$ = this.store.select(selectSortedVideoItems);

  customVideos$ = this.store.select(selectCustomVideos);

  mixedVideos$ = this.store.select(selectMixedVideos);

  currentMixedVideos$ = this.store.select(selectCurrentMixedVideos);

  constructor() {
    this.mixedVideos$.subscribe((videos) => {
      console.log('mixed videos in main', videos.flat(2));
    });
    this.currentMixedVideos$.subscribe((videos) => {
      console.log('mixed videos with pagiantion', videos);
    });
  }
}
