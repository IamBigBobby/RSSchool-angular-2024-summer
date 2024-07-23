import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { VideoItem } from '../../../core/services/you-tube-interface';
import { ButtonComponent } from '../button/button.component';
import { FilteringKeyWordPipe } from '../../pipes/filtering-key-word.pipe';
import { ColorBorderCardDirective } from '../../directives/color-border-card.directive';

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
      [date]="videoItem.snippet.publishedAt"
      class="video-card"
    >
      <img
        class="video-card__title"
        [ngSrc]="videoItem.snippet.thumbnails.medium.url"
        width="320"
        height="180"
        priority
        alt="title"
      />
      <div class="video-card__title">
        {{ videoItem.snippet.title }}
      </div>
      <div class="video-card__statistic">
        <div class="video-card__views">
          {{ videoItem.statistics.viewCount }}
        </div>
        <div class="video-card__likes">
          {{ videoItem.statistics.likeCount }}
        </div>
        <div class="video-card__dislikes">
          {{ videoItem.statistics.dislikeCount }}
        </div>
        <div class="video-card__comments">
          {{ videoItem.statistics.commentCount }}
        </div>
      </div>
      <div class="video-card__date">
        {{ videoItem.snippet.publishedAt | date }}
      </div>
      <a
        routerLink="/detailed-page"
        routerLinkActive="active"
        ariaCurrentWhenActive="page"
      >
        <app-button>Detaled page</app-button>
      </a>
    </div>
  `,
  styleUrl: './video-card.component.scss',
})
export class VideoCardComponent {
  @Input({
    required: true,
  })
  videoItem!: VideoItem;
}
