import { profileType } from '../enums/profile-type.enum';

export interface User {
  id: number;
  username: string;
  email: string;
  profileType: profileType;
}
