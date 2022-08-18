import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import * as NotificationsActions from './notification.actions';

@Injectable()
export class ArticleEffects {
  constructor(
    private action$: Actions,
    private notificationService: NotificationService,
    private router: Router,
    private store: Store
  ) {}

  openArticleRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(NotificationsActions.openNotification),
      exhaustMap((action) =>
        this.notificationService.openNotification(action.id).pipe(
          map((notification: Notification) => {
            const id: number = action.id;
            return NotificationsActions.openNotificationSuccess({ id });
          }),
          catchError(() => of(NotificationsActions.openNotificationFail()))
        )
      )
    )
  );
}
