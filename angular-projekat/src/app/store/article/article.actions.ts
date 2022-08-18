import { createAction, props } from '@ngrx/store';
import { ArticleInfo } from 'src/app/interfaces/articleInfo.interface';
import { UpdateArticle } from 'src/app/interfaces/updateArticle.interface';
import { Article } from 'src/app/models/article.model';

export const postArticle = createAction(
  'PostArticle',
  props<{ article: ArticleInfo }>()
);

export const postArticleSuccess = createAction(
  'PostArticleSuccess',
  props<{ article: Article }>()
);

export const postArticleSuccessNavigate = createAction(
  'PostArticleSuccessNavigate',
  props<{ article: Article }>()
);

export const postArticleFail = createAction('PostArticleFail');

export const loadMyArticles = createAction(
  'LoadMyArticles',
  props<{ id: number }>()
);

export const loadMyArticlesSuccess = createAction(
  'LoadMyArticlesSuccess',
  props<{ articles: Article[] }>()
);

export const loadMyArticlesFail = createAction('LoadMyArticlesFail');

export const selectMyArticle = createAction(
  'selectMyArticle',
  props<{ id: number }>()
);

export const deleteArticle = createAction(
  'DeleteArticle',
  props<{ id: number }>()
);

export const deleteArticleSuccessNavigate = createAction(
  'DeleteArticleSuccesssNavigate',
  props<{ id: number }>()
);

export const deleteArticleSuccess = createAction(
  'DeleteArticleSuccess',
  props<{ id: number }>()
);

export const deleteArticleFail = createAction('DeleteArticleFail');

export const updateMyArticle = createAction(
  'UpdateMyArticle',
  props<{ data: UpdateArticle }>()
);

export const updateMyArticleSuccess = createAction(
  'UpdateMyArticleSuccess',
  props<{ article: Article }>()
);

export const updateMyArticleFail = createAction('UpdateMyArticleFail');

export const updateArticleScore = createAction(
  'UpdateArticleScore',
  props<{ id: number; score: number }>()
);

export const updateArticleScoreSuccess = createAction(
  'UpdateArticleScoreSuccess',
  props<{ id: number; score: number }>()
);

export const updateArticleForDisplayScore = createAction(
  'UpdateArticleForDisplayScore',
  props<{ score: number }>()
);

export const updateArticleScoreFail = createAction('UpdateArticleScoreFail');

export const setArticleForDisplay = createAction(
  'SetArticleForDisplay',
  props<{ article: Article }>()
);

export const clearMyArticlesState = createAction('ClearMyArticlesState');

export const clearArticleForDisplayState = createAction(
  'ClearActionForDisplayState'
);
