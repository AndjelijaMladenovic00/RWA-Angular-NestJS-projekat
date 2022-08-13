import { profileType } from '../enums/profile-type.enum';

export interface UserState {
  username: string | null;
  access_token: string | null;
  profileType: profileType | null;
}
