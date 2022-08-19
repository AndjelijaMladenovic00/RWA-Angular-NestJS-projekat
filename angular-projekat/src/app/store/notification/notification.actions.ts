import { createAction, props } from '@ngrx/store';
import { Notification } from 'src/app/models/notification.model';

export const addNotificationsToState = createAction(
  'AddNotificationsToState',
  props<{ notifications: Notification[] }>()
);

export const openNotification = createAction(
  'OpenNotification',
  props<{ id: number }>()
);

export const openNotificationSuccess = createAction(
  'OpenNotificationSuccess',
  props<{ id: number }>()
);

export const openNotificationFail = createAction('OpenNotificationFail');

export const initNotificationsState = createAction(
  'InitNotificationsState',
  props<{ id: number }>()
);

export const updateNotifications = createAction(
  'UpdateNotifications',
  props<{ id: number; after: Date }>()
);

export const notificationUpdateFail = createAction('NotificationUpdateFail');

export const clearNotifications = createAction('ClearNotifications');
