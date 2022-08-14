import { LogedUser } from '../interfaces/logedUser.interface';
import { MyArticleReducer, MyArticlesState } from './article/article.reducer';
import { UserReducer } from './user/user.reducer';

export interface AppState {
  auth: LogedUser;
  myArticles: MyArticlesState;
}

export const Reducers = {
  auth: UserReducer,
  myArticles: MyArticleReducer,
};
