import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  Subject,
  switchMap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VideoItemId, VideoItem, YouTubeResponse } from './you-tube-interface';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private http = inject(HttpClient);

  private VIDEOS_MAX_RESULTS = 15;

  private VIDEOS_SEARCH_DEBOUNCE_TIME = 500;

  private videosQuery$ = new Subject<string>();

  private videosRequest$ = this.videosQuery$.pipe(
    debounceTime(this.VIDEOS_SEARCH_DEBOUNCE_TIME),
    distinctUntilChanged(),
    switchMap((query) => this.getSearchedVideos(query)),
    map((response) => this.getVideoIds(response)),
    switchMap((videoIds) => this.getVideosWithStatistics(videoIds)),
  );

  private sortCallback$ = new BehaviorSubject((data: VideoItem[]) => data);

  public keyword$ = new BehaviorSubject('');

  public videos$: Observable<VideoItem[]> = combineLatest({
    youtubeResponse: this.videosRequest$,
    sortCallback: this.sortCallback$,
  }).pipe(
    map(({ youtubeResponse, sortCallback }) =>
      sortCallback(youtubeResponse?.items ?? []),
    ),
  );

  public loadVideos(): void {
    this.videosQuery$.next('');
  }

  public searchVideos(query: string): void {
    this.videosQuery$.next(query);
  }

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
    // const url = `https://www.googleapis.com/youtube/v3/search?key=${this.API_KEY}&type=video&part=snippet&maxResults=${maxResults}&q=${query}`;
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
    // const url = `https://www.googleapis.com/youtube/v3/videos?key=${this.API_KEY}&id=${ids}&part=snippet,statistics`;
    return this.http.get<YouTubeResponse>('videos', {
      params: {
        part: 'snippet,statistics',
        id: ids,
      },
    });
  }
}
