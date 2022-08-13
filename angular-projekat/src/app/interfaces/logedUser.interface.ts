import { profileType } from '../enums/profile-type.enum';

export interface LogedUser {
  username: string;
  access_token: string;
  profileType: profileType;
}
