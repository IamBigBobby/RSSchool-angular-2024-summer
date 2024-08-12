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
import { Store } from '@ngrx/store';
import { VideoItem, YouTubeInterface } from './you-tube-interface';
import { updateVideos } from '../../redux/actions/edit-video.actions';
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

  private store = inject(Store);

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
        this.store.dispatch(updateVideos({ videos: data.items }));
        console.log('state into service', this.store);
      },
      error: (err) => console.error('Error fetching data:', err),
    });
  }

  // for MOCK_RESPONSE
  // loadVideos() {
  //   this.youtubeResponse$.next(MOCK_RESPONSE);
  // }

  searchVideos(query: string = 'js'): Observable<string[]> {
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
