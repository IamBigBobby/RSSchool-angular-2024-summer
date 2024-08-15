import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VideoItemId, VideoItem, YouTubeResponse } from './you-tube-interface';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private http = inject(HttpClient);

  private VIDEOS_MAX_RESULTS = 15;

  private sortCallback$ = new BehaviorSubject((data: VideoItem[]) => data);

  public keyword$ = new BehaviorSubject('');

  public getDetailedVideo(id: string): Observable<VideoItem | null> {
    return this.getVideosWithStatistics([id]).pipe(
      map((response) => response.items[0]),
    );
  }

  public sortByDateAsc() {
    this.sortCallback$.next((videos) =>
      videos.sort((a, b) => {
        const dateA = new Date(a.snippet?.publishedAt ?? '');
        const dateB = new Date(b.snippet?.publishedAt ?? '');
        return dateB.getTime() - dateA.getTime();
      }),
    );
  }

  public sortByDateDesc() {
    this.sortCallback$.next((videos) =>
      videos.sort((a, b) => {
        const dateA = new Date(a.snippet?.publishedAt ?? '');
        const dateB = new Date(b.snippet?.publishedAt ?? '');
        return dateA.getTime() - dateB.getTime();
      }),
    );
  }

  public sortByViewsAsc() {
    this.sortCallback$.next((videos) =>
      videos.sort((a, b) => {
        const viewsA: number = Number(a.statistics?.viewCount ?? 0);
        const viewsB: number = Number(b.statistics?.viewCount ?? 0);
        return viewsB - viewsA;
      }),
    );
  }

  public sortByViewsDesc() {
    this.sortCallback$.next((videos) =>
      videos.sort((a, b) => {
        const viewsA: number = Number(a.statistics?.viewCount ?? 0);
        const viewsB: number = Number(b.statistics?.viewCount ?? 0);
        return viewsA - viewsB;
      }),
    );
  }

  public sortByKeyWord(keyword: string) {
    this.keyword$.next(keyword);
  }

  public getSearchedVideos(query: string): Observable<YouTubeResponse> {
    return this.http.get<YouTubeResponse>('search', {
      params: {
        q: query,
        part: 'snippet',
        type: 'video',
        maxResults: this.VIDEOS_MAX_RESULTS,
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
