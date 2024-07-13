import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import ColorBorderCardDirective from '../../../color-border-card.directive';
import FilteringKeyWordPipe from '../../../filtering-key-word.pipe';
import { VideoItem } from '../../../you-tube-interface';
import YoutubeService from '../../../youtube-service.service';
import { ButtonComponent } from '../../../button/button.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  template: `
    <div class="main-wrapper">
      @for (
        youtubeElement of youtubeList | filteringKeyWord: keyword;
        track youtubeElement.id
      ) {
        <div
          appColorBorderCard
          [date]="youtubeElement.snippet.publishedAt"
          class="video-card"
        >
          <div class="video-card__title">
            {{ youtubeElement.snippet.title }}
          </div>
          <img
            class="video-card__title"
            [src]="youtubeElement.snippet.thumbnails.medium.url"
            alt="video_card_img"
          />
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
            <div class="video-card__views">
              {{ youtubeElement.statistics.favoriteCount }}
            </div>
            <div class="video-card__comments">
              {{ youtubeElement.statistics.commentCount }}
            </div>
          </div>
          <div class="video-card__date">
            {{ youtubeElement.snippet.publishedAt | date }}
          </div>
          <custom-button (clicked)="onButtonClick()"
            >Detaled page</custom-button
          >
        </div>
      }
    </div>
  `,
  styleUrls: ['./main-content.component.scss'],
  imports: [
    CommonModule,
    FilteringKeyWordPipe,
    ColorBorderCardDirective,
    ButtonComponent,
  ],
})
export default class MainContentComponent {
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

  onButtonClick() {
    console.log('detailed page');
  }
}
