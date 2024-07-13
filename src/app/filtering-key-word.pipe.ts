import { Pipe, PipeTransform } from '@angular/core';

import { VideoItem } from './you-tube-interface';

@Pipe({
  name: 'filteringKeyWord',
  standalone: true,
  pure: false,
})
export default class FilteringKeyWordPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  transform(videos: VideoItem[], keyword: string): VideoItem[] {
    return videos.filter((video) =>
      video.snippet.title.toLowerCase().includes(keyword.toLowerCase()),
    );
  }
}
