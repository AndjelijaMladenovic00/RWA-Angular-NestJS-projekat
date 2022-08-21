import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { LogedUser } from 'src/app/interfaces/logedUser.interface';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user-service/user.service';

import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  constructor(
    private action$: Actions,
    private userService: UserService,
    private router: Router
  ) {}

  loginRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.login),
      exhaustMap((action) =>
        this.userService
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

  loginWithTokenRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.loginWithToken),
      exhaustMap((action) =>
        this.userService.loginWithToken(action.username).pipe(
          map((userData: LogedUser) => {
            this.router.navigate(['feed']);
            return UserActions.loginWithTokenSuccess({ userData });
          }),
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

  loginWithTokenSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(UserActions.loginWithTokenSuccess),
        tap(({ userData }) => {
          localStorage.setItem('JWT', userData.access_token);
        })
      ),
    { dispatch: false }
  );

  signupRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.signup),
      exhaustMap((action) =>
        this.userService.signup(action.signupData).pipe(
          map((userData: User) => UserActions.signupSuccess()),
          catchError(() => of(UserActions.signupFail()))
        )
      )
    )
  );

  signupSucce$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(UserActions.signupSuccess),
        tap(() => {
          alert(
            'Profile successfully created, you can now login and use the app!'
          );
          this.router.navigate(['login']);
        })
      ),
    { dispatch: false }
  );

  signupFail$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(UserActions.signupFail),
        tap(() => {
          alert(
            'Profile cannot be created with the data you have provided because username and/or email are already taken!'
          );
        })
      ),
    { dispatch: false }
  );
}
