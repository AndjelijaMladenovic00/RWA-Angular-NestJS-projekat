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
