export interface SortVideosState {
  sortType: 'dateAsc' | 'dateDesc' | 'viewsAsc' | 'viewsDesc';
}

export const initialSortVideosState: SortVideosState = {
  sortType: 'dateAsc',
};
