import { state } from '@angular/animations';
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { profileType } from '../enums/profile-type.enum';
import { Token } from '../interfaces/token.interface';
import { loginFailure, loginSuccess } from './login.actions';
import { AppRoutingModule } from '../app-routing.module';

export interface userState {
  username: string | null;
  profileType: profileType | null;
  access_token: Token | null;
}

export const currentUserState: userState = {
  username: null,
  profileType: null,
  access_token: null,
};

export const LoginReducer: ActionReducer<userState, Action> = createReducer(
  currentUserState,
  on(loginSuccess, (currentUserState, { userData }) => {
    return {
      ...state,
      username: userData.username,
      profileType: userData.profileType,
      access_token: userData.access_token,
    };
  }),
  on(loginFailure, (state, { error }) => {
    return {
      ...state,
      username: null,
      profileType: null,
      access_token: null,
    };
  })
);
