import { Pipe, PipeTransform } from '@angular/core';
import { VideoItem } from './you-tube-interface';

@Pipe({
  name: 'filteringKeyWord',
  standalone: true,
})
export class FilteringKeyWordPipe implements PipeTransform {
  transform(videos: VideoItem[], keyword: string): VideoItem[] {
    return videos.filter((video) => video.snippet.title.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()));
  }
}
