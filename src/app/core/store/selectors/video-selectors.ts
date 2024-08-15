import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app-state';
import { VideosState } from '../state/video-state';
import { SortVideosState } from '../state/sort-type-state';
import { VideoItem } from '../../services/you-tube-interface';

const selectVideosState = (state: AppState) => state.videos;
const selectVideosSortType = (state: AppState) => state.sortType;

export const selectVideoItems = createSelector(
  selectVideosState,
  (videosState: VideosState) => videosState.videosObj.items,
);

export const selectSortType = createSelector(
  selectVideosSortType,
  (videoSortType: SortVideosState) => videoSortType.sortType,
);

export const selectSortedVideoItems = createSelector(
  selectVideoItems,
  selectSortType,
  (videoItems: VideoItem[], sortType: string) => {
    const sortedItems = [...videoItems];

    switch (sortType) {
      case 'dateAsc':
        return sortedItems.sort(
          (a, b) =>
            new Date(a.snippet?.publishedAt ?? '').getTime() -
            new Date(b.snippet?.publishedAt ?? '').getTime(),
        );
      case 'dateDesc':
        return sortedItems.sort(
          (a, b) =>
            new Date(b.snippet?.publishedAt ?? '').getTime() -
            new Date(a.snippet?.publishedAt ?? '').getTime(),
        );
      case 'viewsAsc':
        return sortedItems.sort(
          (a, b) =>
            Number(a.statistics?.viewCount ?? 0) -
            Number(b.statistics?.viewCount ?? 0),
        );
      case 'viewsDesc':
        return sortedItems.sort(
          (a, b) =>
            Number(b.statistics?.viewCount ?? 0) -
            Number(a.statistics?.viewCount ?? 0),
        );
      default:
        return sortedItems;
    }
  },
);
