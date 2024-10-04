import { FilteringKeyWordPipe } from './filtering-key-word.pipe';
import { VideoItem } from '../../core/services/you-tube-interface';

describe('FilteringKeyWordPipe', () => {
  let pipe: FilteringKeyWordPipe;

  beforeEach(() => {
    pipe = new FilteringKeyWordPipe();
  });

  it('should filter videos by keyword', () => {
    const videos: VideoItem[] = [
      {
        id: { videoId: '1' },
        snippet: { title: 'Angular Tutorial' },
      } as VideoItem,
      {
        id: { videoId: '2' },
        snippet: { title: 'React Tutorial' },
      } as VideoItem,
      {
        id: { videoId: '3' },
        snippet: { title: 'Angular Testing' },
      } as VideoItem,
    ];

    const keyword = 'angular';
    const filteredVideos = pipe.transform(videos, keyword);

    expect(filteredVideos.length).toBe(2);
    expect(filteredVideos).toEqual([videos[0], videos[2]]);
  });

  it('should return an empty array when no videos match the keyword', () => {
    const videos: VideoItem[] = [
      {
        id: { videoId: '1' },
        snippet: { title: 'Angular Tutorial' },
      } as VideoItem,
      {
        id: { videoId: '2' },
        snippet: { title: 'React Tutorial' },
      } as VideoItem,
    ];

    const keyword = 'Vue';
    const filteredVideos = pipe.transform(videos, keyword);

    expect(filteredVideos).toEqual([]);
  });

  it('should return all videos when keyword is empty', () => {
    const videos: VideoItem[] = [
      {
        id: { videoId: '1' },
        snippet: { title: 'Angular Tutorial' },
      } as VideoItem,
      {
        id: { videoId: '2' },
        snippet: { title: 'React Tutorial' },
      } as VideoItem,
    ];

    const keyword = '';
    const filteredVideos = pipe.transform(videos, keyword);

    expect(filteredVideos).toEqual(videos);
  });
});
