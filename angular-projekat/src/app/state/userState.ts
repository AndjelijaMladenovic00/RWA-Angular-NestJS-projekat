import { profileType } from '../enums/profile-type.enum';

export interface UserState {
  id: number | null;
  username: string | null;
  access_token: string | null;
  profileType: profileType | null;
}
