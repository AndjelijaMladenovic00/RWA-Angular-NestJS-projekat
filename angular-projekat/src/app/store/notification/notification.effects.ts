import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import * as NotificationsActions from './notification.actions';
import { Notification } from 'src/app/models/notification.model';

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

  initNotificationsState$ = createEffect(() =>
    this.action$.pipe(
      ofType(NotificationsActions.initNotificationsState),
      exhaustMap((action) =>
        this.notificationService.getNonOpenedNotifications(action.id).pipe(
          map((notifications: Notification[]) => {
            return NotificationsActions.addNotificationsToState({
              notifications,
            });
          }),
          catchError(() => of(NotificationsActions.notificationUpdateFail()))
        )
      )
    )
  );

  updateNotification$ = createEffect(() =>
    this.action$.pipe(
      ofType(NotificationsActions.updateNotifications),
      exhaustMap((action) =>
        this.notificationService
          .getNotificationsUpdate(action.id, action.after)
          .pipe(
            map((notifications: Notification[]) => {
              return NotificationsActions.addNotificationsToState({
                notifications,
              });
            }),
            catchError(() => of(NotificationsActions.notificationUpdateFail()))
          )
      )
    )
  );
}
