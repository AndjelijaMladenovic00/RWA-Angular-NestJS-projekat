import { createAction, props } from '@ngrx/store';
import { ArticleInfo } from 'src/app/interfaces/articleInfo.interface';
import { Article } from 'src/app/models/article.model';

export const postArticle = createAction(
  'PostArticle',
  props<{ article: ArticleInfo }>()
);

export const postArticleSuccess = createAction(
  'PostArticleSuccess',
  props<{ article: Article }>()
);

export const postArticleFail = createAction('PostArticleFail');
