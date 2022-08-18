import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map, catchError, of, tap } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article-service/article.service';
import * as ArticleActions from './article.actions';

@Injectable()
export class ArticleEffects {
  constructor(
    private action$: Actions,
    private articleService: ArticleService,
    private router: Router,
    private store: Store
  ) {}

  createArticleRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(ArticleActions.postArticle),
      exhaustMap((action) =>
        this.articleService.createArticle(action.article).pipe(
          map((article: Article) =>
            ArticleActions.postArticleSuccessNavigate({ article })
          ),
          catchError(() => of(ArticleActions.postArticleFail()))
        )
      )
    )
  );

  createArticleSuccessNavigate$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(ArticleActions.postArticleSuccessNavigate),
        tap((action) => {
          const article: Article = action.article;
          this.router.navigate(['myArticles']);
          this.store.dispatch(ArticleActions.postArticleSuccess({ article }));
        })
      ),
    { dispatch: false }
  );

  loadMyArticle$ = createEffect(() =>
    this.action$.pipe(
      ofType(ArticleActions.loadMyArticles),
      exhaustMap((action) =>
        this.articleService
          .loadArticles(action.id)
          .pipe(
            map((articles: Article[]) =>
              ArticleActions.loadMyArticlesSuccess({ articles })
            )
          )
      ),
      catchError(() => of(ArticleActions.loadMyArticlesFail()))
    )
  );

  deleteArticle$ = createEffect(() =>
    this.action$.pipe(
      ofType(ArticleActions.deleteArticle),
      exhaustMap((action) => {
        const id: number = action.id;
        return this.articleService
          .deleteArticle(action.id)
          .pipe(
            map((res: Article) =>
              ArticleActions.deleteArticleSuccessNavigate({ id })
            )
          );
      }),
      catchError(() => of(ArticleActions.deleteArticleFail()))
    )
  );

  deleteArticleSuccessNavigate$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(ArticleActions.deleteArticleSuccessNavigate),
        tap((action) => {
          const id: number = action.id;
          this.router.navigate(['myArticles']);
          this.store.dispatch(ArticleActions.deleteArticleSuccess({ id }));
        })
      ),
    { dispatch: false }
  );

  updateMyArticle$ = createEffect(() =>
    this.action$.pipe(
      ofType(ArticleActions.updateMyArticle),
      exhaustMap((action) =>
        this.articleService.updateArticle(action.data).pipe(
          map((article: Article) => {
            this.router.navigate(['myArticles']);
            return ArticleActions.updateMyArticleSuccess({ article });
          })
        )
      ),
      catchError(() => of(ArticleActions.updateMyArticleFail()))
    )
  );

  upadateArticleScore$ = createEffect(() =>
    this.action$.pipe(
      ofType(ArticleActions.updateArticleScore),
      exhaustMap((action) => {
        return this.articleService
          .updateArticleScore(action.id, action.score)
          .pipe(
            map((article: Article) => {
              const id: number = action.id;
              const score: number = action.score;
              return ArticleActions.updateArticleScoreSuccess({ id, score });
            })
          );
      }),
      catchError(() => of(ArticleActions.updateArticleScoreFail()))
    )
  );
}
