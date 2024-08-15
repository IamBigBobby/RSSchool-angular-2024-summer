import { createReducer, on } from '@ngrx/store';
import { getSortKeyWord } from '../actions/key-word.action';
import {
  initionalKeyWordState,
  KeyWordState,
} from '../state/sort-key-word-state';

export const keyWordReducer = createReducer(
  initionalKeyWordState,
  on(
    getSortKeyWord,
    (state, { key }): KeyWordState => ({
      ...state,
      sortKeyWord: key,
    }),
  ),
);
