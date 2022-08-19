import { faArrowsLeftRightToLine } from '@fortawesome/free-solid-svg-icons';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Notification } from 'src/app/models/notification.model';
import * as NotificationsActions from './notification.actions';

export interface NotificationsState extends EntityState<Notification> {}

const adapter: EntityAdapter<Notification> =
  createEntityAdapter<Notification>();

export const noitficationsInitialState = adapter.getInitialState();

const _notificationsReducer = createReducer(
  noitficationsInitialState,

  on(
    NotificationsActions.addNotificationsToState,
    (state: NotificationsState, { notifications }) => {
      return adapter.addMany(notifications, state);
    }
  ),

  on(
    NotificationsActions.openNotificationSuccess,
    (state: NotificationsState, { id }) => {
      return adapter.updateOne({ id: id, changes: { opened: true } }, state);
    }
  ),

  on(NotificationsActions.openNotificationFail, (state: NotificationsState) => {
    alert('Error while updating the state of notification.');
    return state;
  }),

  on(
    NotificationsActions.addNotificationsToState,
    (state: NotificationsState, { notifications }) => {
      const notificationsIcon: HTMLElement | null =
        document.getElementById('notificationsIcon');
      if (
        notificationsIcon &&
        notifications != null &&
        notifications.length != 0
      )
        notificationsIcon.style.color = 'red';
      else if (notificationsIcon) notificationsIcon.style.color = 'azure';
      return adapter.addMany(notifications, state);
    }
  ),

  on(
    NotificationsActions.notificationUpdateFail,
    (state: NotificationsState) => {
      alert('Error while updating your notifications, try again later!');
      return state;
    }
  ),

  on(NotificationsActions.clearNotifications, (state: NotificationsState) => {
    return {
      ...state,
      ids: [],
      entities: {},
    };
  })
);

export function NotificationsReducer(
  state: NotificationsState | undefined,
  action: Action
) {
  return _notificationsReducer(state, action);
}
