import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { UserState } from '../state/userState';
import { loginFail, loginSuccess } from './user.actions';

export const initialUserState: UserState = {
  username: null,
  profileType: null,
  access_token: null,
};

const _userReducer = createReducer(
  initialUserState,
  on(loginSuccess, (state: UserState, { userData }) => {
    return {
      username: userData.username,
      access_token: userData.access_token,
      profileType: userData.profileType,
    };
  }),
  on(loginFail, (state: UserState) => {
    return {
      username: null,
      access_token: null,
      profileType: null,
    };
  })
);

export function UserReducer(state: UserState | undefined, action: Action) {
  return _userReducer(state, action);
}
