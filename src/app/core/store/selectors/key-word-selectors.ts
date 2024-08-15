import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app-state';
import { KeyWordState } from '../state/sort-key-word-state';

export const selectFeature = (state: AppState) => state.sortKeyWord;

export const selectKeyWord = createSelector(
  selectFeature,
  (state: KeyWordState) => state.sortKeyWord,
);
