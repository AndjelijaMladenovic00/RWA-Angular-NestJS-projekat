import { createFeatureSelector, createSelector } from '@ngrx/store';
import { profileType } from '../enums/profile-type.enum';
import { UserState } from '../state/userState';
import { AppState } from './app.state';

export const selectUserState = createFeatureSelector<UserState>('auth');

export const selectToken = createSelector(
  selectUserState,
  (state) => state.access_token
);

export const selectUsername = createSelector(
  selectUserState,
  (state) => state.username
);

export const selectProfileType = createSelector(
  selectUserState,
  (state) => state.profileType
);

export const selectUserData = createSelector(
  selectUsername,
  selectProfileType,
  (username: string | null, profileType: profileType | null) => {
    return {
      username,
      profileType,
    };
  }
);
