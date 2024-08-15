import { createAction, props } from '@ngrx/store';

export const getSortKeyWord = createAction(
  '[Videos] Get Key Word',
  props<{ key: string }>(),
);
