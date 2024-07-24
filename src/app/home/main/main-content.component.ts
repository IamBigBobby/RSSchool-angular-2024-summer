import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ColorBorderCardDirective } from '../../shared/directives/color-border-card.directive';
import { FilteringKeyWordPipe } from '../../shared/pipes/filtering-key-word.pipe';
import { YoutubeService } from '../../core/services/youtube-service.service';
import { VideoCardComponent } from '../../shared/components/video-card/video-card.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  template: `
    <main class="main">
      <div class="main-container">
        @for (
          youtubeElement of (videos$ | async) ?? []
            | filteringKeyWord: (keyword$ | async) ?? '';
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
  private youtubeService = inject(YoutubeService);

  videos$ = this.youtubeService.videos$;

  keyword$ = this.youtubeService.keyword$;
}
