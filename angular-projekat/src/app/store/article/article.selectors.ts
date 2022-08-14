import { createFeatureSelector, createSelector } from '@ngrx/store';
import { map } from 'rxjs';
import { MyArticlesState } from './article.reducer';

export const selectMyArticlesState =
  createFeatureSelector<MyArticlesState>('myArticles');

export const selectMyArticles = createSelector(
  selectMyArticlesState,
  (state: MyArticlesState) => {
    return state.ids.map((id: number | string) => state.entities[id]);
  }
);
