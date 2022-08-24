import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { SubscriptionsState } from 'src/app/state/subscriptionsState.state';
import { UserState } from 'src/app/state/userState.state';
import * as UserActions from 'src/app/store/user/user.actions';

declare var bootbox: any;

export const initialUserState: UserState = {
  id: null,
  username: null,
  profileType: null,
  access_token: null,
};

const _userReducer = createReducer(
  initialUserState,

  on(UserActions.loginSuccess, (state: UserState, { userData }) => {
    return {
      id: userData.id,
      username: userData.username,
      access_token: userData.access_token,
      profileType: userData.profileType,
    };
  }),

  on(UserActions.loginWithTokenSuccess, (state: UserState, { userData }) => {
    return {
      id: userData.id,
      username: userData.username,
      access_token: userData.access_token,
      profileType: userData.profileType,
    };
  }),

  on(UserActions.loginFail, (state: UserState) => {
    return {
      id: null,
      username: null,
      access_token: null,
      profileType: null,
    };
  }),

  on(UserActions.logout, (state: UserState) => {
    return {
      id: null,
      username: null,
      access_token: null,
      profileType: null,
    };
  })
);

export function UserReducer(state: UserState | undefined, action: Action) {
  return _userReducer(state, action);
}

const adapter: EntityAdapter<User> = createEntityAdapter<User>();

const initialSubscriptionsState: SubscriptionsState = adapter.getInitialState();

const _subscriptionsReducer = createReducer(
  initialSubscriptionsState,

  on(
    UserActions.getSubscriptionsSuccess,
    (state: SubscriptionsState, { subscriptions }) => {
      return adapter.addMany(subscriptions, state);
    }
  ),

  on(UserActions.getSubscriptionsFail, (state: SubscriptionsState) => {
    bootbox.alert('Geting subscriptions failed!');
    return state;
  }),

  on(
    UserActions.subscribeSuccess,
    (state: SubscriptionsState, { subscription }) => {
      return adapter.addOne(subscription, state);
    }
  ),

  on(
    UserActions.unsubscribeSuccess,
    (state: SubscriptionsState, { subscription }) => {
      return adapter.removeOne(subscription.id, state);
    }
  ),

  on(UserActions.subscriptionFail, (state: SubscriptionsState) => {
    bootbox.alert('Error while dealing with subscriptions!');
    return state;
  }),

  on(UserActions.clearSubscriptions, (state: SubscriptionsState) => {
    return {
      ids: [],
      entities: {},
    };
  })
);

export function SubscriptionsReducer(
  state: SubscriptionsState | undefined,
  action: Action
) {
  return _subscriptionsReducer(state, action);
}
