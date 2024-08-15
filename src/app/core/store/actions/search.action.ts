import { createAction, props } from '@ngrx/store';

export const getSearchWord = createAction(
  '[Search Component] Get search word',
  props<{ word: string }>(),
);
