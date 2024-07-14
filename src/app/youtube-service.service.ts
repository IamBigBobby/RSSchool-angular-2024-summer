import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { mockData } from '../../mock-data';
import { VideoItem, YouTubeInterface } from './you-tube-interface';

@Injectable({
  providedIn: 'root',
})
export default class YoutubeService {
  protected youTubeData: YouTubeInterface = mockData;

  protected keyword: string | undefined;

  private youTubeSetData = new Subject<VideoItem[] | undefined>();

  private keywordSet = new Subject<string | undefined>();

  currentData: VideoItem[] | undefined;

  youtubeSet$ = this.youTubeSetData.asObservable();

  keywordSet$ = this.keywordSet.asObservable();

  getVideos(value: string) {
    if (value === '') {
      this.currentData = [];
      this.youTubeSetData.next(this.currentData);
    } else {
      this.currentData = this.youTubeData.items.filter((video) =>
        video.snippet.title
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase()),
      );
      this.youTubeSetData.next(this.currentData);
    }
  }

  sortByDateUp() {
    if (this.currentData) {
      this.currentData.sort((a, b) => {
        const dateA = new Date(a.snippet.publishedAt);
        const dateB = new Date(b.snippet.publishedAt);
        return dateB.getTime() - dateA.getTime();
      });
      this.youTubeSetData.next(this.currentData);
    }
  }

  sortByDateDown() {
    if (this.currentData) {
      this.currentData.sort((a, b) => {
        const dateA = new Date(a.snippet.publishedAt);
        const dateB = new Date(b.snippet.publishedAt);
        return dateA.getTime() - dateB.getTime();
      });
      this.youTubeSetData.next(this.currentData);
    }
  }

  sortByViewsUp() {
    if (this.currentData) {
      this.currentData.sort((a, b) => {
        const viewsA: number = Number(a.statistics.viewCount);
        const viewsB: number = Number(b.statistics.viewCount);
        return viewsB - viewsA;
      });
      this.youTubeSetData.next(this.currentData);
    }
  }

  sortByViewsDown() {
    if (this.currentData) {
      this.currentData.sort((a, b) => {
        const viewsA: number = Number(a.statistics.viewCount);
        const viewsB: number = Number(b.statistics.viewCount);
        return viewsA - viewsB;
      });
      this.youTubeSetData.next(this.currentData);
    }
  }

  sortByKeyWord(keyword: string) {
    this.keyword = keyword;
    this.keywordSet.next(this.keyword);
  }
}
