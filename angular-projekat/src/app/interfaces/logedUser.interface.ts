import { profileType } from '../enums/profile-type.enum';
import { Token } from './token.interface';

export interface LogedUser {
  username: string;
  access_token: Token;
  profileType: profileType;
}
