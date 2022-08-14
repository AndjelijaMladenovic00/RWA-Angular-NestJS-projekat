import { createAction, props } from '@ngrx/store';
import { LogedUser } from '../../interfaces/logedUser.interface';
import { LoginData } from '../../interfaces/loginData.interface';
import { SignupData } from '../../interfaces/signupData.interface';

export const login = createAction('Login', props<{ userData: LoginData }>());

export const loginSuccess = createAction(
  'LoginSuccess',
  props<{ userData: LogedUser }>()
);

export const loginFail = createAction('LoginFail');

export const logout = createAction('Logout');

export const signup = createAction(
  'Signup',
  props<{ signupData: SignupData }>()
);

export const signupSuccess = createAction('SignupSuccess');

export const signupFail = createAction('SignupFail');
