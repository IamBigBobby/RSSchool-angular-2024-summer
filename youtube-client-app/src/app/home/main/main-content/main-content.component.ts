import { Component, inject } from '@angular/core';
import { VideoItem } from '../../../you-tube-interface';
import { YoutubeService } from '../../../youtube-service.service';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [],
  template: `
    <div class="main-wrapper">
      @for (youtubeElement of youtubeList; track $index) {
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
        </div>
      }
    </div>
  `,
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent {
  youtubeList: VideoItem[];
  youtubeServiceData: YoutubeService = inject(YoutubeService);

  constructor() {
    this.youtubeList = this.youtubeServiceData.getAllVideos();
  }
}
