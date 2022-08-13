import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectUserState = createFeatureSelector<AppState>('user');

export const selectToken = createSelector(
  selectUserState,
  (state) => state.user.access_token
);

export const selectUsername = createSelector(
  selectUserState,
  (state) => state.user.username
);

export const profileType = createSelector(
  selectUserState,
  (state) => state.user.profileType
);
