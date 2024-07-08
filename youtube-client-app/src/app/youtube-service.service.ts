import { Injectable } from '@angular/core';
import { mockData } from '../../mock-data';
import { VideoItem, YouTubeInterface } from './you-tube-interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  protected youTubeData: YouTubeInterface = mockData;
  private youTubeSetData = new Subject<VideoItem[] | undefined>();
  currentData: VideoItem[] | undefined;

  youtubeSet$ = this.youTubeSetData.asObservable();

  getVideos(value: string) {
    this.currentData = this.youTubeData.items.filter((video) =>
      video.snippet.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
    );
    this.youTubeSetData.next(this.currentData);
  }

  sortByDate() {
    if (this.currentData) {
      this.currentData.sort((a, b) => {
        const dateA = new Date(a.snippet.publishedAt);
        const dateB = new Date(b.snippet.publishedAt);
        return dateB.getTime() - dateA.getTime();
      });
      this.youTubeSetData.next(this.currentData);
    }
  }
}
