import { User } from './user.model';
import { Text } from './text.model';

export interface Review {
  id: number;
  user: User;
  text: Text;
  score: number;
  comment: string;
}
