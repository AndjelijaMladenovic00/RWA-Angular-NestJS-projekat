import { User } from './user.model';

export interface Notification {
  user: User;
  sentOn: Date;
  opened: boolean;
  message: string;
}
