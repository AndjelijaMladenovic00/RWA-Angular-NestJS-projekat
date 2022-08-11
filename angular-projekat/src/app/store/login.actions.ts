import { Token } from '@angular/compiler';
import { createAction, props } from '@ngrx/store';
import { profileType } from '../enums/profile-type.enum';
import { LogedUser } from '../interfaces/logedUser.interface';
import { LoginData } from '../interfaces/loginData.interface';

export const login = createAction(
  'Login Request',
  props<{ credentials: LoginData }>()
);

export const loginSuccess = createAction(
  'Login Success',
  props<{ userData: LogedUser }>()
);

export const loginFailure = createAction(
  'Login Failure',
  props<{ error: string }>()
);
