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
          {{ youtubeElement.snippet.title }}
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
