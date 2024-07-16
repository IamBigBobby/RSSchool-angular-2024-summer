import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { ColorBorderCardDirective } from '../../color-border-card.directive';
import { FilteringKeyWordPipe } from '../../filtering-key-word.pipe';
import { VideoItem } from '../../you-tube-interface';
import { YoutubeService } from '../../youtube-service.service';
import { VideoCardComponent } from '../../video-card/video-card.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  template: `
    <main class="main">
      <div class="main-container">
        @for (
          youtubeElement of youtubeList | filteringKeyWord: keyword;
          track youtubeElement.id
        ) {
          <app-video-card [videoItem]="youtubeElement"></app-video-card>
        }
      </div>
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
