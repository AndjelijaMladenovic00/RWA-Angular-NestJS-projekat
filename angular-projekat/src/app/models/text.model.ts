import { BookGenre } from '../enums/book-genre.enum';
import { Report } from './report.model';
import { Review } from './review.model';
import { User } from './user.model';

export interface Text {
  id: number;
  user: User;
  publishedOn: Date;
  lastEdited: Date;
  text: string;
  reviews?: Review[];
  reports?: Report[];
  averageScore?: number;
  genres?: BookGenre[];
}
