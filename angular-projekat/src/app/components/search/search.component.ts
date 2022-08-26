import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { debounceTime, filter, fromEvent, map } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { User } from 'src/app/models/user.model';
import { ArticleService } from 'src/app/services/article-service/article.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { selectID } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;

  articles: Article[] = [];
  users: User[] = [];
  usernames: string[] = [];
  articleNames: string[] = [];
  input: string = '';
  id: number | null = null;
  parameter: string = 'all';

  constructor(
    private store: Store,
    private userService: UserService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.store.select(selectID).subscribe((id: number | null) => {
      this.id = id;
    });

    const autocomplete: HTMLInputElement | null = <HTMLInputElement>(
      document.getElementById('searchInput')
    );
    if (autocomplete) {
      fromEvent(autocomplete, 'input')
        .pipe(
          debounceTime(1000),
          map(() => autocomplete.value.toLowerCase()),
          filter((value: string) => value.length >= 3)
        )
        .subscribe((value: string) => {
          this.input = value;
          console.log(this.input);
          this.search();
        });
    }
  }

  selectParameter(param: string) {
    this.parameter = param;
  }

  search() {
    this.articles = [];
    this.articleNames = [];
    this.usernames = [];
    this.users = [];
    switch (this.parameter) {
      case 'user': {
        this.searchUsers();
        break;
      }
      case 'article': {
        this.searchArticles();
        break;
      }
      default: {
        this.searchArticles();
        this.searchUsers();
      }
    }
    console.log(this.articleNames, this.usernames);
  }

  searchUsers() {
    if (this.id && this.input) {
      this.userService
        .searchUsers(this.input, this.id)
        .subscribe((users: User[]) => {
          this.users = users;
          this.usernames = this.users.map((user: User) => user.username);
          if (this.usernames.length > 3)
            this.usernames = this.usernames.slice(0, 3);
        });
    }
  }

  searchArticles() {
    if (this.id && this.input) {
      this.articleService
        .searchArticles(this.input, this.id)
        .subscribe((articles: Article[]) => {
          this.articles = articles;
          this.articleNames = this.articles.map(
            (article: Article) => article.title
          );
          if (this.articleNames.length > 3)
            this.articleNames = this.articleNames.slice(0, 3);
        });
    }
  }
}
