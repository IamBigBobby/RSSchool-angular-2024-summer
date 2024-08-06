import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  Observable,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { mockData } from '../../../../mock-data';
import { VideoItem, YouTubeInterface } from './you-tube-interface';

const MOCK_RESPONSE = mockData;

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private API_KEY = 'AIzaSyAsslk2ZsR14rpQXl-gaqRyDkrs4Syi9w0';

  private YOUTUBE_REQUES = `https://www.googleapis.com/youtube/v3/search?key=${this.API_KEY}&type=video&part=snippet&maxResults=15&q=js`;

  private youtubeResponse$ = new BehaviorSubject<YouTubeInterface>(
    MOCK_RESPONSE,
  );

  private sortCallback$ = new BehaviorSubject((data: VideoItem[]) => data);

  private http = inject(HttpClient);

  public keyword$ = new BehaviorSubject('');

  public searchword$ = new BehaviorSubject('');

  public idDetailedPage$ = new BehaviorSubject('');

  public videos$: Observable<VideoItem[]> = combineLatest({
    youtubeResponse: this.youtubeResponse$,
    sortCallback: this.sortCallback$,
    searchword: this.searchword$.pipe(debounceTime(500)),
  }).pipe(
    map(({ youtubeResponse, sortCallback, searchword }) => {
      const filteredVideos = youtubeResponse.items.filter((video) =>
        video.snippet.title.toLowerCase().includes(searchword.toLowerCase()),
      );
      return sortCallback(filteredVideos);
    }),
  );

  public detailedVideo$: Observable<VideoItem | undefined> = combineLatest({
    youtubeResponse: this.youtubeResponse$,
    idDetailedPage: this.idDetailedPage$,
  }).pipe(
    map(({ youtubeResponse, idDetailedPage }) => {
      const findedVideo = youtubeResponse.items.find(
        (video) => video.id === idDetailedPage,
      );
      return findedVideo;
    }),
  );

  constructor() {
    this.testLoadVideos().subscribe({
      next: (data) => console.log('Fetched data:', data),
      error: (err) => console.error('Error fetching data:', err),
    });
  }

  loadVideos() {
    this.youtubeResponse$.next(MOCK_RESPONSE);
  }

  testLoadVideos() {
    return this.http.get<YouTubeInterface>(this.YOUTUBE_REQUES).pipe(
      map((data) => {
        console.log('fetch data', data);
        return data;
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
