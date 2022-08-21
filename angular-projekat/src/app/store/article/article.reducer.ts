import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Article } from 'src/app/models/article.model';
import { ArticleForDisplayState } from 'src/app/state/articleForDisplayState.state';
import { MyArticlesState } from 'src/app/state/myArticlesState.state';
import * as ArticleActions from './article.actions';

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
    ArticleActions.updateArticleScoreSuccess,
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
  }),

  on(ArticleActions.clearMyArticlesState, (state: MyArticlesState) => {
    return {
      ...state,
      ids: [],
      entities: {},
      selectedArticle: -1,
    };
  })
);

export const initialArticleForShowState: ArticleForDisplayState = {
  article: null,
};

const _articleForDisplayReducer = createReducer(
  initialArticleForShowState,
  on(
    ArticleActions.setArticleForDisplay,
    (state: ArticleForDisplayState, { article }) => {
      return {
        ...state,
        article: article,
      };
    }
  ),

  on(
    ArticleActions.updateArticleForDisplayScore,
    (state: ArticleForDisplayState, { score }) => {
      if (!state || !state.article) return state;
      else {
        const article: Article = {
          ...state.article,
          averageScore: score,
        };
        return {
          ...state,
          article: article,
        };
      }
    }
  ),

  on(
    ArticleActions.clearArticleForDisplayState,
    (state: ArticleForDisplayState) => {
      return {
        ...state,
        article: null,
      };
    }
  )
);

export function MyArticleReducer(
  state: MyArticlesState | undefined,
  action: Action
) {
  return _myArticleReducer(state, action);
}

export function ArticleForDisplayReducer(
  state: ArticleForDisplayState | undefined,
  action: Action
) {
  return _articleForDisplayReducer(state, action);
}
