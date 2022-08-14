import { profileType } from '../enums/profile-type.enum';

export interface LogedUser {
  id: number;
  username: string;
  access_token: string;
  profileType: profileType;
}
