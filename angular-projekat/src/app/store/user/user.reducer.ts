import { Action, createReducer, on } from '@ngrx/store';
import { UserState } from 'src/app/state/userState';

import {
  loginFail,
  loginSuccess,
  loginWithToken,
  logout,
  signupSuccess,
} from './user.actions';

export const initialUserState: UserState = {
  id: null,
  username: null,
  profileType: null,
  access_token: null,
};

const _userReducer = createReducer(
  initialUserState,

  on(loginSuccess, (state: UserState, { userData }) => {
    return {
      id: userData.id,
      username: userData.username,
      access_token: userData.access_token,
      profileType: userData.profileType,
    };
  }),

  on(loginFail, (state: UserState) => {
    return {
      id: null,
      username: null,
      access_token: null,
      profileType: null,
    };
  }),

  on(logout, (state: UserState) => {
    return {
      id: null,
      username: null,
      access_token: null,
      profileType: null,
    };
  })
);

export function UserReducer(state: UserState | undefined, action: Action) {
  return _userReducer(state, action);
}
