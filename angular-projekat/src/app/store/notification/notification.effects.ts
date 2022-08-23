import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import * as NotificationsActions from './notification.actions';
import { Notification } from 'src/app/models/notification.model';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationEffects {
  constructor(
    private action$: Actions,
    private notificationService: NotificationService,
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
