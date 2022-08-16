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
      localStorage.removeItem('text');
      localStorage.removeItem('title');
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
      return adapter.addMany(articles, state);
    }
  ),

  on(ArticleActions.loadMyArticlesFail, (state: MyArticlesState) => {
    console.log('fail');
    return state;
  }),

  on(ArticleActions.selectMyArticle, (state: MyArticlesState, { id }) => {
    const newState: MyArticlesState = {
      ...state,
      selectedArticle: id,
    };
    return newState;
  }),

  on(ArticleActions.deleteArticleSuccess, (state: MyArticlesState, { id }) => {
    alert('Article succesfully deleted!');
    return adapter.removeOne(id, state);
  }),

  on(ArticleActions.deleteArticleFail, (state: MyArticlesState) => {
    alert('An error occured while deleting an article, try again later!');
    return state;
  }),

  on(
    ArticleActions.updateMyArticleSuccess,
    (state: MyArticlesState, { article }) => {
      alert('Article successfully updated!');
      return adapter.updateOne(
        {
          id: article.id,
          changes: {
            title: article.title,
            text: article.text,
            genre: article.genre,
            lastEdited: new Date(),
          },
        },
        state
      );
    }
  ),

  on(
    ArticleActions.updateArticleScore,
    (state: MyArticlesState, { id, score }) => {
      return adapter.updateOne(
        {
          id: id,
          changes: {
            averageScore: score,
          },
        },
        state
      );
    }
  ),

  on(ArticleActions.updateMyArticleFail, (state: MyArticlesState) => {
    alert('Error occured while updating an article, please try again later!');
    return state;
  })
);

export function MyArticleReducer(
  state: MyArticlesState | undefined,
  action: Action
) {
  return _myArticleReducer(state, action);
}
