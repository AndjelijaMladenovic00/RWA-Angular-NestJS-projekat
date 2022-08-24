import { EntityState } from '@ngrx/entity';
import { User } from '../models/user.model';

export interface SubscriptionsState extends EntityState<User> {}
