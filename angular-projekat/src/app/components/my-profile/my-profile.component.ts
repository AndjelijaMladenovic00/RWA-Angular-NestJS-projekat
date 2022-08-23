import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { selectMyArticlesProfileInfo } from 'src/app/store/article/article.selectors';
import { selectUsername } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  faCircleUser = faCircleUser;
  faStar = faStar;

  username: string | null = '';
  numberOfArticles: number = 0;
  averageArticleScore: number = 0;

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectUsername)
      .subscribe((username: string | null) => (this.username = username));

    this.store.select(selectMyArticlesProfileInfo).subscribe((data) => {
      this.numberOfArticles = data.number;
      this.averageArticleScore = data.averageScore;
    });
  }

  gotoMyArticles() {
    this.router.navigate(['myArticles']);
  }

  gotoMySubscriptions() {
    this.router.navigate(['mySubscriptions']);
  }
}
