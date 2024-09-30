import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VideoItemId, VideoItem, YouTubeResponse } from './you-tube-interface';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private http = inject(HttpClient);

  private VIDEOS_MAX_RESULTS = 20;

  // private searchedVideosSignal = signal<YouTubeResponse | null>(null);

  public async getDetailedVideo(id: string): Promise<VideoItem | null> {
    const response = await firstValueFrom(this.getVideosWithStatistics([id]));
    const detailedVideo = response.items[0] || null;
    return detailedVideo;
  }

  public getSearchedVideos(
    query: string,
    pageToken?: string,
  ): Observable<YouTubeResponse> {
    return this.http.get<YouTubeResponse>('search', {
      params: {
        q: query,
        part: 'snippet',
        type: 'video',
        maxResults: this.VIDEOS_MAX_RESULTS,
        pageToken: pageToken || '',
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public getVideoIds(response: YouTubeResponse): VideoItemId['videoId'][] {
    return response.items.map(({ id }) =>
      typeof id === 'string' ? id : id.videoId,
    );
  }

  public getVideosWithStatistics(
    videoIds: string[],
  ): Observable<YouTubeResponse> {
    const ids = videoIds.join(',');
    return this.http.get<YouTubeResponse>('videos', {
      params: {
        part: 'snippet,statistics',
        id: ids,
      },
    });
  }
}
