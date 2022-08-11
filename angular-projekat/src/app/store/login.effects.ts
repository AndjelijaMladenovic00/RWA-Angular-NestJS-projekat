import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { LogedUser } from '../interfaces/logedUser.interface';
import { LoginService } from '../services/login-service/login.service';
import * as LoginActions from '../store/login.actions';

@Injectable()
export class LoginEffects {
  constructor(private actions$: Actions, private loginService: LoginService) {}

  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.login),
      exhaustMap((action) =>
        this.loginService
          .login(action.credentials.username, action.credentials.password)
          .pipe(
            map(
              (userData) => LoginActions.loginSuccess({ userData }),
              catchError(() => of({ type: 'load error' }))
            )
          )
      )
    )
  );
}
