import { Injectable } from '@angular/core';
import { mockData } from '../../mock-data';
import { VideoItem, YouTubeInterface } from './you-tube-interface';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  protected youTubedata: YouTubeInterface = mockData;

  getAllVideos(): VideoItem[] {
    return this.youTubedata.items;
  }
}
