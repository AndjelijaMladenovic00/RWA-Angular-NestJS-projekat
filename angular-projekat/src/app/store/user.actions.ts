import { createAction, props } from '@ngrx/store';
import { LogedUser } from '../interfaces/logedUser.interface';
import { LoginData } from '../interfaces/loginData.interface';

export const login = createAction('Login', props<{ userData: LoginData }>());
export const loginSuccess = createAction(
  'LoginSuccess',
  props<{ userData: LogedUser }>()
);
export const loginFail = createAction('LoginFail');
