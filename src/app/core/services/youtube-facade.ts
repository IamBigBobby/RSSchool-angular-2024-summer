import { inject, Injectable, signal } from '@angular/core';
import { VideoItem } from './you-tube-interface';
import { YoutubeService } from './youtube-service.service';

@Injectable({
  providedIn: 'root',
})
export class YoutubeFacadeService {
  private youtubeService = inject(YoutubeService);

  public detailedVideoSignal = signal<VideoItem | null>(null);

  public async fetchGetDetaledVideo(id: string): Promise<void> {
    const getDetailedVideoResponse =
      await this.youtubeService.getDetailedVideo(id);
    this.detailedVideoSignal.set(getDetailedVideoResponse);
  }
}
