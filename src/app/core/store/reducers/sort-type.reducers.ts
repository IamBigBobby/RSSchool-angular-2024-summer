import { createReducer, on } from '@ngrx/store';
import {
  initialSortVideosState,
  SortVideosState,
} from '../state/sort-type-state';
import { setSortType } from '../actions/sort-type.actions';

export const sortVideosReducer = createReducer(
  initialSortVideosState,
  on(
    setSortType,
    (state, { sortType }): SortVideosState => ({
      ...state,
      sortType,
    }),
  ),
);
