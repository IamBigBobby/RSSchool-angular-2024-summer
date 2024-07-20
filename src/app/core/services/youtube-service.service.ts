import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, Subject } from 'rxjs';
import { mockData } from '../../../../mock-data';
import { VideoItem, YouTubeInterface } from './you-tube-interface';

const MOCK_RESPONSE = mockData;

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  // protected youTubeData: YouTubeInterface = mockData;

  // protected keyword: string | undefined;

  // private youTubeSetData = new Subject<VideoItem[] | undefined>();

  // private keywordSet = new Subject<string | undefined>();

  // currentData: VideoItem[] | undefined;

  // youtubeSet$ = this.youTubeSetData.asObservable();

  // keywordSet$ = this.keywordSet.asObservable();

  private youtubeResponse$ = new Subject<YouTubeInterface>();

  private sortCallback$ = new BehaviorSubject((data: VideoItem[]) => data);

  public videos$: Observable<VideoItem[]> = combineLatest({
    youtubeResponse: this.youtubeResponse$,
    sortCallback: this.sortCallback$,
  }).pipe(
    map(({youtubeResponse, sortCallback}) => sortCallback(youtubeResponse.items)),
  );

  public keyword$ = new BehaviorSubject('');


  getVideos(value: string) { // rename with 'load'
    // if (value === '') {
    //   this.currentData = [];
    //   this.youTubeSetData.next(this.currentData);
    // } else {
    //   this.currentData = this.youTubeData.items.filter((video) =>
    //     video.snippet.title
    //       .toLocaleLowerCase()
    //       .includes(value.toLocaleLowerCase()),
    //   );
    //   this.youTubeSetData.next(this.currentData);
    // }

    this.youtubeResponse$.next(MOCK_RESPONSE);
  }

  sortByDateUp() { // use Desc/Asc in methhods names
    // if (this.currentData) {
    //   this.currentData.sort((a, b) => {
    //     const dateA = new Date(a.snippet.publishedAt);
    //     const dateB = new Date(b.snippet.publishedAt);
    //     return dateB.getTime() - dateA.getTime();
    //   });
    //   this.youTubeSetData.next(this.currentData);
    // }

    this.sortCallback$.next((videos) => videos.sort((a, b) => {
      const dateA = new Date(a.snippet.publishedAt);
      const dateB = new Date(b.snippet.publishedAt);
      return dateB.getTime() - dateA.getTime();
    }));
  }

  sortByDateDown() {
    // if (this.currentData) {
    //   this.currentData.sort((a, b) => {
    //     const dateA = new Date(a.snippet.publishedAt);
    //     const dateB = new Date(b.snippet.publishedAt);
    //     return dateA.getTime() - dateB.getTime();
    //   });
    //   this.youTubeSetData.next(this.currentData);
    // }

    this.sortCallback$.next((videos) => videos.sort((a, b) => {
      const dateA = new Date(a.snippet.publishedAt);
      const dateB = new Date(b.snippet.publishedAt);
      return dateA.getTime() - dateB.getTime();
    }));
  }

  sortByViewsUp() {
    // if (this.currentData) {
    //   this.currentData.sort((a, b) => {
    //     const viewsA: number = Number(a.statistics.viewCount);
    //     const viewsB: number = Number(b.statistics.viewCount);
    //     return viewsB - viewsA;
    //   });
    //   this.youTubeSetData.next(this.currentData);
    // }

    this.sortCallback$.next((videos) => videos.sort((a, b) => {
      const viewsA: number = Number(a.statistics.viewCount);
      const viewsB: number = Number(b.statistics.viewCount);
      return viewsB - viewsA;
    }));
  }

  sortByViewsDown() {
    // if (this.currentData) {
    //   this.currentData.sort((a, b) => {
    //     const viewsA: number = Number(a.statistics.viewCount);
    //     const viewsB: number = Number(b.statistics.viewCount);
    //     return viewsA - viewsB;
    //   });
    //   this.youTubeSetData.next(this.currentData);
    // }

    this.sortCallback$.next((videos) => videos.sort((a, b) => {
      const viewsA: number = Number(a.statistics.viewCount);
      const viewsB: number = Number(b.statistics.viewCount);
      return viewsA - viewsB;
    }));
  }

  sortByKeyWord(keyword: string) {
    // this.keyword = keyword;
    // this.keywordSet.next(this.keyword);

    this.keyword$.next(keyword);
  }
}
