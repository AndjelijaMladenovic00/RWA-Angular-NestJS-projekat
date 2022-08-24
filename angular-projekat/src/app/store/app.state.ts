import { LogedUser } from '../interfaces/logedUser.interface';
import { ArticleForDisplayState } from '../state/articleForDisplayState.state';
import { MyArticlesState } from '../state/myArticlesState.state';
import { SubscriptionsState } from '../state/subscriptionsState.state';
import {
  ArticleForDisplayReducer,
  MyArticleReducer,
} from './article/article.reducer';
import {
  NotificationsReducer,
  NotificationsState,
} from './notification/notification.reducer';
import { SubscriptionsReducer, UserReducer } from './user/user.reducer';

export interface AppState {
  auth: LogedUser;
  myArticles: MyArticlesState;
  articleForDisplay: ArticleForDisplayState;
  notifications: NotificationsState;
  subscriptions: SubscriptionsState;
}

export const Reducers = {
  auth: UserReducer,
  myArticles: MyArticleReducer,
  articleForDisplay: ArticleForDisplayReducer,
  notifications: NotificationsReducer,
  subscriptions: SubscriptionsReducer,
};
