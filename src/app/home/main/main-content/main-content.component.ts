import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../../button/button.component';
import { ColorBorderCardDirective } from '../../../color-border-card.directive';
import { FilteringKeyWordPipe } from '../../../filtering-key-word.pipe';
import { VideoItem } from '../../../you-tube-interface';
import { YoutubeService } from '../../../youtube-service.service';

@Component({
  selector: 'app-main-content',
  standalone: true,
  template: `
    <div class="main-wrapper">
      <div class="main-container">
        @for (
          youtubeElement of youtubeList | filteringKeyWord: keyword;
          track youtubeElement.id
        ) {
          <div
            appColorBorderCard
            [date]="youtubeElement.snippet.publishedAt"
            class="video-card"
          >
            <!-- <img
              class="video-card__title"
              [src]="youtubeElement.snippet.thumbnails.medium.url"
              alt="video_card_img"
            /> -->
            <img
              class="video-card__title"
              [ngSrc]="youtubeElement.snippet.thumbnails.medium.url"
              width="320"
              height="180"
              priority
            />
            <div class="video-card__title">
              {{ youtubeElement.snippet.title }}
            </div>
            <div class="video-card__statistic">
              <div class="video-card__views">
                {{ youtubeElement.statistics.viewCount }}
              </div>
              <div class="video-card__likes">
                {{ youtubeElement.statistics.likeCount }}
              </div>
              <div class="video-card__dislikes">
                {{ youtubeElement.statistics.dislikeCount }}
              </div>
              <div class="video-card__comments">
                {{ youtubeElement.statistics.commentCount }}
              </div>
            </div>
            <div class="video-card__date">
              {{ youtubeElement.snippet.publishedAt | date }}
            </div>
            <app-button>Detaled page</app-button>
          </div>
        }
      </div>
    </div>
  `,
  styleUrls: ['./main-content.component.scss'],
  imports: [
    CommonModule,
    FilteringKeyWordPipe,
    ColorBorderCardDirective,
    ButtonComponent,
    NgOptimizedImage,
  ],
})
export class MainContentComponent {
  youtubeList: VideoItem[] = [];

  keyword: string = '';

  constructor(youtubeServiceData: YoutubeService) {
    youtubeServiceData.youtubeSet$.subscribe((videos) => {
      this.youtubeList = videos || [];
    });
    youtubeServiceData.keywordSet$.subscribe((keyword) => {
      this.keyword = keyword || '';
    });
  }
}
