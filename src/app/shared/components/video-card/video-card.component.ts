import { Component, inject, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { VideoItem } from '../../../core/services/you-tube-interface';
import { ButtonComponent } from '../button/button.component';
import { FilteringKeyWordPipe } from '../../pipes/filtering-key-word.pipe';
import { ColorBorderCardDirective } from '../../directives/color-border-card.directive';
import { VideoActions } from '../../../core/store/actions/edit-video.actions';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule,
    FilteringKeyWordPipe,
    ColorBorderCardDirective,
    NgOptimizedImage,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
  ],
  template: `
    <div
      appColorBorderCard
      [date]="videoItem.snippet?.publishedAt ?? null"
      class="video-card"
    >
      <img
        class="video-card__title"
        [ngSrc]="
          videoItem.snippet?.thumbnails?.medium?.url ?? 'https://i.ytimg.com'
        "
        width="320"
        height="180"
        priority
        alt="title"
      />
      <div class="video-card__title">
        {{ videoItem.snippet?.title }}
      </div>
      <div class="video-card__statistic">
        <div class="video-card__views">
          {{ videoItem.statistics?.viewCount }}
        </div>
        <div class="video-card__likes">
          {{ videoItem.statistics?.likeCount }}
        </div>
        <div class="video-card__dislikes">
          {{ videoItem.statistics?.dislikeCount }}
        </div>
        <div class="video-card__comments">
          {{ videoItem.statistics?.commentCount }}
        </div>
      </div>
      <div class="video-card__date">
        {{ videoItem.snippet?.publishedAt | date }}
      </div>
      <a
        routerLinkActive="active"
        ariaCurrentWhenActive="page"
        [routerLink]="['detailed-page', videoItem.id]"
      >
        <app-button>Detaled page</app-button>
      </a>
      <app-button (click)="addToFavorite(videoItem)"
        >Add to favorite</app-button
      >
    </div>
  `,
  styleUrl: './video-card.component.scss',
})
export class VideoCardComponent {
  private store = inject(Store);

  @Input({
    required: true,
  })
  videoItem!: VideoItem;

  addToFavorite(video: VideoItem) {
    this.store.dispatch(VideoActions.addToFavorite({ video }));
  }
}
