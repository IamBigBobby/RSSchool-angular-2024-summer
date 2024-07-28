import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { YoutubeService } from '../core/services/youtube-service.service';
import { ColorBorderCardDirective } from '../shared/directives/color-border-card.directive';

@Component({
  selector: 'app-detailed-page',
  standalone: true,
  template: `
    @let details = detailedInfo$ | async;
    <div class="detailed-page__wrapper">
      <a routerLink="/" routerLinkActive="active" ariaCurrentWhenActive="page">
        <img
          class="detailed-page__back-button"
          ngSrc="assets/back_button.svg"
          width="64"
          height="64"
          priority
          alt="back_button"
        />
      </a>
      <div class="detailed-page">
        <img
          class="detailed-page__img"
          [ngSrc]="
            details?.snippet?.thumbnails?.maxres?.url ?? 'https://i.ytimg.com'
          "
          width="840"
          height="auto"
          priority
          alt="img"
        />
        <div
          appColorBorderCard
          [date]="details?.snippet?.publishedAt ?? ''"
          class="detailed-page__info"
        >
          <div class="detailed-page__title">
            <h2 class="detailed-page__title-name">
              {{ details?.snippet?.title }}
            </h2>
            <div class="detailed-page__title-time">
              {{ details?.snippet?.publishedAt | date: 'EEEE, MMMM d, y' }}
            </div>
          </div>
          <div class="detailed-page__description">
            <h3 class="detailed-page__description-title">Description:</h3>
            <p class="detailed-page__description-info">
              {{ details?.snippet?.description }}
            </p>
          </div>
          <div class="detailed-page__statistic">
            <div class="detailed-page__views">
              {{ details?.statistics?.viewCount }}
            </div>
            <div class="detailed-page__likes">
              {{ details?.statistics?.likeCount }}
            </div>
            <div class="detailed-page__dislikes">
              {{ details?.statistics?.dislikeCount }}
            </div>
            <div class="detailed-page__comments">
              {{ details?.statistics?.commentCount }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./detailed-page.component.scss'],
  imports: [
    CommonModule,
    NgOptimizedImage,
    ColorBorderCardDirective,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
  ],
})
export class DetailedPageComponent {
  private youtubeService = inject(YoutubeService);

  private route: ActivatedRoute = inject(ActivatedRoute);

  detailedInfo$ = this.youtubeService.detailedVideo$;

  constructor() {
    const videoId = this.route.snapshot.params['id'];
    this.youtubeService.getPageId(videoId);
    this.youtubeService.loadVideos();
  }
}
