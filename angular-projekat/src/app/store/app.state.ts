import { LogedUser } from '../interfaces/logedUser.interface';
import {
  ArticleForDisplayReducer,
  MyArticleReducer,
  MyArticlesState,
} from './article/article.reducer';
import { UserReducer } from './user/user.reducer';

export interface AppState {
  auth: LogedUser;
  myArticles: MyArticlesState;
}

export const Reducers = {
  auth: UserReducer,
  myArticles: MyArticleReducer,
  articleForDisplay: ArticleForDisplayReducer,
};
