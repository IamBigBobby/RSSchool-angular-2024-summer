import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, Subject } from 'rxjs';
import { mockData } from '../../../../mock-data';
import { VideoItem, YouTubeInterface } from './you-tube-interface';

const MOCK_RESPONSE = mockData;

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private youtubeResponse$ = new Subject<YouTubeInterface>();

  private sortCallback$ = new BehaviorSubject((data: VideoItem[]) => data);

  public keyword$ = new BehaviorSubject('');

  public searchword$ = new BehaviorSubject('');

  public videos$: Observable<VideoItem[]> = combineLatest({
    youtubeResponse: this.youtubeResponse$,
    sortCallback: this.sortCallback$,
    searchword: this.searchword$,
  }).pipe(
    map(({ youtubeResponse, sortCallback, searchword }) => {
      const filteredVideos = youtubeResponse.items.filter((video) =>
        video.snippet.title.toLowerCase().includes(searchword.toLowerCase()),
      );
      return sortCallback(filteredVideos);
    }),
  );

  loadVideos() {
    this.youtubeResponse$.next(MOCK_RESPONSE);
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

  fetchBySearchWord(searchword: string) {
    this.searchword$.next(searchword);
  }
}
