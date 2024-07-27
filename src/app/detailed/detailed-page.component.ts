import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { YoutubeService } from '../core/services/youtube-service.service';
import { VideoItem } from '../core/services/you-tube-interface';

@Component({
  selector: 'app-detailed-page',
  standalone: true,
  template: ``,
  styleUrls: ['./detailed-page.component.scss'],
  imports: [CommonModule],
})
export class DetailedPageComponent {
  private youtubeService = inject(YoutubeService);

  route: ActivatedRoute = inject(ActivatedRoute);

  detailedInfo$: Observable<VideoItem | undefined>;

  constructor() {
    const videoId = this.route.snapshot.params['id'];
    this.detailedInfo$ = this.youtubeService.getVideoById(videoId);
  }
}
