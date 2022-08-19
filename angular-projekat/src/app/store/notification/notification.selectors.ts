import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotificationsState } from './notification.reducer';
import { Notification } from 'src/app/models/notification.model';

export const selectNotificationsState =
  createFeatureSelector<NotificationsState>('notifications');

export const selectNotifications = createSelector(
  selectNotificationsState,
  (state) => {
    const notifications: (Notification | undefined)[] = state.ids.map(
      (id: number | string) => state.entities[id]
    );
    return notifications;
  }
);
