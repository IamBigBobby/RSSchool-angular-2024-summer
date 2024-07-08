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

  youtubeSet$ = this.youTubeSetData.asObservable();

  getVideos(value: string) {
    console.log("service", value)
    this.youTubeSetData.next(this.youTubeData.items.filter(video => video.snippet.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())));
  }
}
