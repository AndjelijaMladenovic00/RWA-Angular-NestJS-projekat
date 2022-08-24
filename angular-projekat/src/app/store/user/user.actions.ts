import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { LogedUser } from '../../interfaces/logedUser.interface';
import { LoginData } from '../../interfaces/loginData.interface';
import { SignupData } from '../../interfaces/signupData.interface';

export const login = createAction('Login', props<{ userData: LoginData }>());

export const loginSuccess = createAction(
  'LoginSuccess',
  props<{ userData: LogedUser }>()
);

export const loginFail = createAction('LoginFail');

export const logout = createAction('Logout');

export const signup = createAction(
  'Signup',
  props<{ signupData: SignupData }>()
);

export const signupSuccess = createAction('SignupSuccess');

export const signupFail = createAction('SignupFail');

export const loginWithToken = createAction(
  'LoginWithToken',
  props<{ username: string }>()
);

export const loginWithTokenSuccess = createAction(
  'LoginWithTokenSuccess',
  props<{ userData: LogedUser }>()
);

export const getSubscriptions = createAction(
  'GetSubscription',
  props<{ id: number }>()
);

export const getSubscriptionsSuccess = createAction(
  'GetSubscriptionsSuccess',
  props<{ subscriptions: User[] }>()
);

export const getSubscriptionsFail = createAction('GetSubscriptionsFail');

export const subscribe = createAction(
  'Subscribe',
  props<{ id: number; subscriptionID: number }>()
);

export const subscribeSuccess = createAction(
  'SubscribeSuccess',
  props<{ subscription: User }>()
);

export const unsubscribe = createAction(
  'Unsubscribe',
  props<{ id: number; subscriptionID: number }>()
);

export const unsubscribeSuccess = createAction(
  'UnsubscribeSuccess',
  props<{ subscription: User }>()
);

export const subscriptionFail = createAction('SubscriptionFail');

export const clearSubscriptions = createAction('ClearSubscriptions');
