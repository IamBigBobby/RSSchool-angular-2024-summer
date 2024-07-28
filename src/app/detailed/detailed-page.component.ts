import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { YoutubeService } from '../core/services/youtube-service.service';

@Component({
  selector: 'app-detailed-page',
  standalone: true,
  template: `
    @let details = detailedInfo$ | async | json;
    <p>{{ details }}</p>
  `,
  styleUrls: ['./detailed-page.component.scss'],
  imports: [CommonModule],
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
