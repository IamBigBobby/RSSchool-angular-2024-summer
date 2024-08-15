import { createAction, props } from '@ngrx/store';

export const setSortType = createAction(
  '[Videos] Set Sort Type',
  props<{ sortType: 'dateAsc' | 'dateDesc' | 'viewsAsc' | 'viewsDesc' }>(),
);
