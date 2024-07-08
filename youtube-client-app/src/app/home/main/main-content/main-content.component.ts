import { Component } from '@angular/core';
import { VideoItem } from '../../../you-tube-interface';
import { YoutubeService } from '../../../youtube-service.service';
import { CommonModule } from '@angular/common';
import { FilteringKeyWordPipe } from '../../../filtering-key-word.pipe';

@Component({
  selector: 'app-main-content',
  standalone: true,
  template: `
    <div class="main-wrapper">
      @for (youtubeElement of youtubeList | filteringKeyWord: keyword; track $index) {
        <div class="video-card">
          <div class="video-card__title">{{ youtubeElement.snippet.title }}</div>
          <img class="video-card__title" [src]="youtubeElement.snippet.thumbnails.medium.url" alt="video_card_img" />
          <div class="video-card__statistic">
            <div class="video-card__views">{{ youtubeElement.statistics.viewCount }}</div>
            <div class="video-card__likes">{{ youtubeElement.statistics.likeCount }}</div>
            <div class="video-card__dislikes">{{ youtubeElement.statistics.dislikeCount }}</div>
            <div class="video-card__views">{{ youtubeElement.statistics.favoriteCount }}</div>
            <div class="video-card__comments">{{ youtubeElement.statistics.commentCount }}</div>
          </div>
          <div class="video-card__date">{{ youtubeElement.snippet.publishedAt | date }}</div>
        </div>
      }
    </div>
  `,
  styleUrls: ['./main-content.component.scss'],
  imports: [CommonModule, FilteringKeyWordPipe],
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
