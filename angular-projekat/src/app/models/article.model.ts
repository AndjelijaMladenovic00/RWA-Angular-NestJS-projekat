import { BookGenre } from '../enums/book-genre.enum';

export interface Article {
  id: number;
  userId: number;
  username: string;
  publishedOn: Date;
  lastEdited: Date;
  text: string;
  title: string;
  averageScore?: number;
  genre: BookGenre;
}
