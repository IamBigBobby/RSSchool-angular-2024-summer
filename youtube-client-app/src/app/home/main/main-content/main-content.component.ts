import { Component, inject } from '@angular/core';
import { VideoItem, YouTubeInterface } from '../../../you-tube-interface';
import { YoutubeService } from '../../../youtube-service.service';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [],
  template: ` <p>main-content works!</p> `,
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent {
  youtubeList: VideoItem[];
  youtubeServiceData: YoutubeService = inject(YoutubeService);

  constructor() {
    this.youtubeList = this.youtubeServiceData.getAllVideos();
  }
}
