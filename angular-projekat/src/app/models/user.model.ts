import { profileType } from '../enums/profile-type.enum';
import { Text } from './text.model';
import { Review } from './review.model';
import { Report } from './report.model';

export interface User {
  id: number;
  username: string;
  email: string;
  profileType: profileType;
  texts?: Text[];
  reviews?: Review[];
  reports?: Report[];
}

export interface LoginUser {
  user: User;
  token: string;
}
