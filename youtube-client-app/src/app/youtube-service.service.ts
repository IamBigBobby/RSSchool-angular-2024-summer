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

  getAllVideos() {
    this.youTubeSetData.next(this.youTubeData.items);
  }
}
