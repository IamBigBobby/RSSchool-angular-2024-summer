import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app-state';
import { VideosState } from '../state/video-state';
import { SortVideosState } from '../state/sort-type-state';
import { VideoItem } from '../../services/you-tube-interface';
import { KeyWordState } from '../state/sort-key-word-state';

const selectVideosState = (state: AppState) => state.videos;
const selectVideosSortType = (state: AppState) => state.sortType;
const selectVideosKeyType = (state: AppState) => state.sortKeyWord;

export const selectVideoItems = createSelector(
  selectVideosState,
  (videosState: VideosState) => videosState.videosObj.items,
);

export const selectSortType = createSelector(
  selectVideosSortType,
  (videoSortType: SortVideosState) => videoSortType.sortType,
);

export const selectKeyType = createSelector(
  selectVideosKeyType,
  (videoKeyType: KeyWordState) => videoKeyType.sortKeyWord,
);

export const selectSortedVideoItems = createSelector(
  selectVideoItems,
  selectSortType,
  selectKeyType,
  (videoItems: VideoItem[], sortType: string, keyword: string) => {
    let sortedItems = [...videoItems];

    switch (sortType) {
      case 'dateAsc':
        sortedItems = sortedItems.sort(
          (a, b) =>
            new Date(a.snippet?.publishedAt ?? '').getTime() -
            new Date(b.snippet?.publishedAt ?? '').getTime(),
        );
        break;
      case 'dateDesc':
        sortedItems = sortedItems.sort(
          (a, b) =>
            new Date(b.snippet?.publishedAt ?? '').getTime() -
            new Date(a.snippet?.publishedAt ?? '').getTime(),
        );
        break;
      case 'viewsAsc':
        sortedItems = sortedItems.sort(
          (a, b) =>
            Number(a.statistics?.viewCount ?? 0) -
            Number(b.statistics?.viewCount ?? 0),
        );
        break;
      case 'viewsDesc':
        sortedItems = sortedItems.sort(
          (a, b) =>
            Number(b.statistics?.viewCount ?? 0) -
            Number(a.statistics?.viewCount ?? 0),
        );
        break;
      default:
        break;
    }

    if (keyword) {
      sortedItems = sortedItems.filter((video) =>
        video.snippet?.title.toLowerCase().includes(keyword.toLowerCase()),
      );
    }

    return sortedItems;
  },
);
