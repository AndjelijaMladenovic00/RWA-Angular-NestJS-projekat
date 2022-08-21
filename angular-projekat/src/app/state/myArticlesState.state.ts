import { EntityState } from '@ngrx/entity';
import { Article } from '../models/article.model';

export interface MyArticlesState extends EntityState<Article> {
  selectedArticle: number;
}
