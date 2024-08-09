import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VideoItem, YouTubeInterface } from './you-tube-interface';
// import { mockData } from '../../../../mock-data';

// const MOCK_RESPONSE = mockData;

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private API_KEY = 'AIzaSyAsslk2ZsR14rpQXl-gaqRyDkrs4Syi9w0';

  // with MOCK_RESPONSE private youtubeResponse$ = new BehaviorSubject<YouTubeInterface>(MOCK_RESPONSE);
  private youtubeResponse$ = new BehaviorSubject<YouTubeInterface | null>(null);

  private sortCallback$ = new BehaviorSubject((data: VideoItem[]) => data);

  private http = inject(HttpClient);

  public keyword$ = new BehaviorSubject('');

  public searchword$ = new BehaviorSubject('');

  public idDetailedPage$ = new BehaviorSubject('');

  public videos$: Observable<VideoItem[] | undefined> = combineLatest({
    youtubeResponse: this.youtubeResponse$,
    sortCallback: this.sortCallback$,
    searchword: this.searchword$.pipe(debounceTime(500)),
  }).pipe(
    map(({ youtubeResponse, sortCallback, searchword }) => {
      const filteredVideos = youtubeResponse?.items.filter((video) =>
        video.snippet.title.toLowerCase().includes(searchword.toLowerCase()),
      );
      return filteredVideos ? sortCallback(filteredVideos) : undefined;
    }),
  );

  public detailedVideo$: Observable<VideoItem | undefined> = combineLatest({
    youtubeResponse: this.youtubeResponse$,
    idDetailedPage: this.idDetailedPage$,
  }).pipe(
    map(({ youtubeResponse, idDetailedPage }) => {
      const findedVideo = youtubeResponse?.items.find((video) => {
        if (typeof video.id === 'string') {
          return video.id === idDetailedPage;
        }
        return undefined;
      });
      return findedVideo;
    }),
  );

  constructor() {
    this.loadVideos().subscribe({
      next: (data) => {
        this.youtubeResponse$.next(data);
      },
      error: (err) => console.error('Error fetching data:', err),
    });
  }

  // for MOCK_RESPONSE
  // loadVideos() {
  //   this.youtubeResponse$.next(MOCK_RESPONSE);
  // }

  searchVideos(query: string = 'js'): Observable<string[]> {
    // const url = `https://www.googleapis.com/youtube/v3/search?key=${this.API_KEY}&type=video&part=snippet&maxResults=${maxResults}&q=${query}`;
    return this.http
      .get<YouTubeInterface>('search', {
        params: {
          type: 'video',
          maxResults: 15,
          query,
        },
      })
      .pipe(
        map((response) =>
          response.items.map((item: VideoItem) => {
            if (typeof item.id === 'object') {
              return item.id.videoId;
            }
            return '';
          }),
        ),
      );
  }

  getVideoStatistics(videoIds: string[]): Observable<YouTubeInterface> {
    const ids = videoIds.join(',');
    // const url = `https://www.googleapis.com/youtube/v3/videos?key=${this.API_KEY}&id=${ids}&part=snippet,statistics`;
    return this.http.get<YouTubeInterface>('videos', {
      params: {
        part: 'snippet,statistics',
        id: ids,
      },
    });
  }

  loadVideos(): Observable<YouTubeInterface> {
    return this.searchVideos().pipe(
      switchMap((videoIds) => {
        return this.getVideoStatistics(videoIds);
      }),
    );
  }

  sortByDateAsc() {
    this.sortCallback$.next((videos) =>
      videos.sort((a, b) => {
        const dateA = new Date(a.snippet.publishedAt);
        const dateB = new Date(b.snippet.publishedAt);
        return dateB.getTime() - dateA.getTime();
      }),
    );
  }

  sortByDateDesc() {
    this.sortCallback$.next((videos) =>
      videos.sort((a, b) => {
        const dateA = new Date(a.snippet.publishedAt);
        const dateB = new Date(b.snippet.publishedAt);
        return dateA.getTime() - dateB.getTime();
      }),
    );
  }

  sortByViewsAsc() {
    this.sortCallback$.next((videos) =>
      videos.sort((a, b) => {
        const viewsA: number = Number(a.statistics.viewCount);
        const viewsB: number = Number(b.statistics.viewCount);
        return viewsB - viewsA;
      }),
    );
  }

  sortByViewsDesc() {
    this.sortCallback$.next((videos) =>
      videos.sort((a, b) => {
        const viewsA: number = Number(a.statistics.viewCount);
        const viewsB: number = Number(b.statistics.viewCount);
        return viewsA - viewsB;
      }),
    );
  }

  sortByKeyWord(keyword: string) {
    this.keyword$.next(keyword);
  }

  getPageId(id: string) {
    this.idDetailedPage$.next(id);
  }
}
