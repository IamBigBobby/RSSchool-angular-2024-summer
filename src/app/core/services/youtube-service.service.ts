import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { mockData } from '../../../../mock-data';
import { VideoItem, YouTubeInterface } from './you-tube-interface';

// const MOCK_RESPONSE = mockData;

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private API_KEY = 'AIzaSyAsslk2ZsR14rpQXl-gaqRyDkrs4Syi9w0';

  private YOUTUBE_REQEST_STATISTICS = `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&id=nq4aU9gmZQk,REu2BcnlD34,qbPTdW7KgOg&part=snippet,statistics
`;

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
      console.log('filtered videos', filteredVideos);
      return filteredVideos ? sortCallback(filteredVideos) : undefined;
    }),
  );

  public detailedVideo$: Observable<VideoItem | undefined> = combineLatest({
    youtubeResponse: this.youtubeResponse$,
    idDetailedPage: this.idDetailedPage$,
  }).pipe(
    map(({ youtubeResponse, idDetailedPage }) => {
      const findedVideo = youtubeResponse?.items.find(
        (video) => video.id === idDetailedPage,
      );
      return findedVideo;
    }),
  );

  constructor() {
    this.loadVideos().subscribe({
      next: (data) => {
        if (data?.items) {
          console.log('Fetched items:', data.items);
        } else {
          console.log('No items found in response');
        }
        this.youtubeResponse$.next(data);
      },
      error: (err) => console.error('Error fetching data:', err),
    });
  }

  // for MOCK_RESPONSE
  // loadVideos() {
  //   this.youtubeResponse$.next(MOCK_RESPONSE);
  // }

  searchVideos(
    query: string = 'js',
    maxResults: number = 15,
  ): Observable<string[]> {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${this.API_KEY}&type=video&part=snippet&maxResults=${maxResults}&q=${query}`;
    return this.http.get<YouTubeInterface>(url).pipe(
      map((response) =>
        response.items.map((item: VideoItem) => {
          return item.id;
        }),
      ),
    );
  }

  getVideoStatistics(videoIds: string[]): Observable<YouTubeInterface> {
    const ids = videoIds.join(',');
    const url = `https://www.googleapis.com/youtube/v3/videos?key=${this.API_KEY}&id=${ids}&part=snippet,statistics`;
    this.http.get<YouTubeInterface>(url).pipe(
      map((response) => {
        console.log('statistic', response);
      }),
    );
    return this.http.get<YouTubeInterface>(url);
  }

  loadVideos(): Observable<YouTubeInterface> {
    return this.searchVideos().pipe(
      switchMap((videoIds) => {
        console.log('Video IDs:', videoIds);
        const statistic = this.getVideoStatistics(videoIds);
        return statistic.pipe(
          tap((response) => console.log('Fetched statistics:', response)),
        );
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
