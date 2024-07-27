import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { YoutubeService } from '../core/services/youtube-service.service';
import { copyFileSync } from 'fs';

@Component({
  selector: 'app-detailed-page',
  standalone: true,
  template: `
    @let details = detailedInfo$ | async | json;
    <p>{{ details }}</p>
  `,
  styleUrls: ['./detailed-page.component.scss'],
  imports: [AsyncPipe, CommonModule],
})
export class DetailedPageComponent implements OnInit {
  private youtubeService = inject(YoutubeService);

  private route: ActivatedRoute = inject(ActivatedRoute);
  idPage$ = this.youtubeService.idDetailedPage$;

  detailedInfo$ = this.youtubeService.detailedVideos$;

  ngOnInit(): void {
    const videoId = this.route.snapshot.params['id'];
    this.youtubeService.idDetailedPage$.next(videoId);
  }
}
