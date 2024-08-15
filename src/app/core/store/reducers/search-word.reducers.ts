import { createReducer, on } from '@ngrx/store';
import {
  initionalSearchWordState,
  SearchWordState,
} from '../state/search-word-state';
import { getSearchWord } from '../actions/search.action';

export const searchReducer = createReducer(
  initionalSearchWordState,
  on(
    getSearchWord,
    (state, { word }): SearchWordState => ({
      ...state,
      searchWord: word,
    }),
  ),
);
