import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { YoutubeService } from '../core/services/youtube-service.service';

@Component({
  selector: 'app-detailed-page',
  standalone: true,
  template: `
    @let details = (detailedInfo$ | async | json);
     <p>{{details}}</p>
`,
  styleUrls: ['./detailed-page.component.scss'],
  imports: [AsyncPipe, CommonModule],
})
export class DetailedPageComponent {
  private youtubeService = inject(YoutubeService);

  private route: ActivatedRoute = inject(ActivatedRoute);

  private videoId = this.route.snapshot.params['id'];

  idPage$ = this.youtubeService.idDetailedPage$;

  detailedInfo$ = this.youtubeService.detailedVideos$;

  constructor() {
    this.youtubeService.idDetailedPage$.next(this.videoId);
  }
}
