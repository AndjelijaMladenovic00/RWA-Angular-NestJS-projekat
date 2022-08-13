import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { LogedUser } from '../interfaces/logedUser.interface';
import { LoginService } from '../services/login-service/login.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  constructor(
    private action$: Actions,
    private loginService: LoginService,
    private router: Router
  ) {}

  loginRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.login),
      exhaustMap((action) =>
        this.loginService
          .login(action.userData.username, action.userData.password)
          .pipe(
            map((userData: LogedUser) =>
              UserActions.loginSuccess({ userData })
            ),
            catchError(() => of(UserActions.loginFail()))
          )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(UserActions.loginSuccess),
        tap(({ userData }) => {
          localStorage.setItem('JWT', userData.access_token);
          this.router.navigate(['feed']);

          alert('Login successful! Welcome ' + userData.username);
        })
      ),
    { dispatch: false }
  );

  loginFail$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(UserActions.loginFail),
        tap(() => {
          alert('Login failed, invalid data!');
        })
      ),
    { dispatch: false }
  );
}
