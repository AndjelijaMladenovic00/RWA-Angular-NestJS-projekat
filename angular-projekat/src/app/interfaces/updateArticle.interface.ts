import { BookGenre } from '../enums/book-genre.enum';

export interface UpdateArticle {
  id: number;
  title: string;
  text: string;
  genre: BookGenre;
}
