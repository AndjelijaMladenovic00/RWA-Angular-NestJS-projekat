import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArticleForDisplayState } from 'src/app/state/articleForDisplayState';
import { MyArticlesState } from './article.reducer';

export const selectMyArticlesState =
  createFeatureSelector<MyArticlesState>('myArticles');

export const selectArticleForDisplayState =
  createFeatureSelector<ArticleForDisplayState>('articleForDisplay');

export const selectMyArticles = createSelector(
  selectMyArticlesState,
  (state: MyArticlesState) => {
    return state.ids.map((id: number | string) => state.entities[id]);
  }
);

export const selectMySelectedArticleID = createSelector(
  selectMyArticlesState,
  (state: MyArticlesState) => {
    return state.selectedArticle;
  }
);

export const selectMySelectedArticle = createSelector(
  selectMyArticles,
  selectMySelectedArticleID,
  (articles, id) => {
    return articles.find((article) => {
      if (article && article.id == id) return true;
      else return false;
    });
  }
);

export const selectArticleForDisplay = createSelector(
  selectArticleForDisplayState,
  (state: ArticleForDisplayState) => state.article
);
