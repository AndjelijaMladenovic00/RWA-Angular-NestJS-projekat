import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Article } from 'src/app/models/article.model';
import * as ArticleActions from './article.actions';

export interface MyArticlesState extends EntityState<Article> {
  selectedArticle: number;
}
const adapter: EntityAdapter<Article> = createEntityAdapter<Article>();

export const myArticlesInitialState = adapter.getInitialState({
  selectedArticle: -1,
});

const _myArticleReducer = createReducer(
  myArticlesInitialState,

  on(
    ArticleActions.postArticleSuccess,
    (state: MyArticlesState, { article }) => {
      alert(`Article "${article.title}" posted!`);
      return adapter.addOne(article, state);
    }
  ),

  on(ArticleActions.postArticleFail, (state: MyArticlesState) => {
    alert(`An error occured while posting an article!`);
    return state;
  }),

  on(
    ArticleActions.loadMyArticlesSuccess,
    (state: MyArticlesState, { articles }) => {
      console.log('SUCCESS: ', articles);
      return adapter.addMany(articles, state);
    }
  ),

  on(ArticleActions.loadMyArticlesFail, (state: MyArticlesState) => {
    console.log('fail');
    return state;
  })
);

export function MyArticleReducer(
  state: MyArticlesState | undefined,
  action: Action
) {
  return _myArticleReducer(state, action);
}
