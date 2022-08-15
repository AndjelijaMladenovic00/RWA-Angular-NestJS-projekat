import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from 'src/app/models/review.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  public getReviewsForArticle(id: number) {
    return this.http.get<Review[]>(
      `${environment.url}/reviews/getReviewsForArticle/${id}`
    );
  }
}
