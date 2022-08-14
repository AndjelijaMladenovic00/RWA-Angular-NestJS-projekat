import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from 'src/app/state/userState';
import { profileType } from 'src/app/enums/profile-type.enum';

export const selectUserState = createFeatureSelector<UserState>('auth');

export const selectID = createSelector(
  selectUserState,
  (state) => state.id
);

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
