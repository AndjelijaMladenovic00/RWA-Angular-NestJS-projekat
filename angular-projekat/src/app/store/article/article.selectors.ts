import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArticleForDisplayState } from 'src/app/state/articleForDisplayState.state';
import { MyArticlesState } from 'src/app/state/myArticlesState.state';
import { Article } from 'src/app/models/article.model';

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

export const selectMyArticlesNumber = createSelector(
  selectMyArticles,
  (articles) => {
    return articles.length;
  }
);

export const selectMyArticlesAverageScore = createSelector(
  selectMyArticles,
  (articles) => {
    let i: number = 0;
    let sum: number = 0;
    articles.forEach((article: Article | undefined) => {
      if (article) {
        if (article.averageScore) {
          i++;
          sum += article.averageScore;
        }
      }
    });
    if (i == 0) return 0;
    const averageArticleScore: number = Math.round((sum / i) * 100) / 100;
    return averageArticleScore;
  }
);

export const selectMyArticlesProfileInfo = createSelector(
  selectMyArticlesNumber,
  selectMyArticlesAverageScore,
  (number, averageScore) => {
    return {
      number,
      averageScore,
    };
  }
);

export const selectArticleForDisplay = createSelector(
  selectArticleForDisplayState,
  (state: ArticleForDisplayState) => state.article
);
