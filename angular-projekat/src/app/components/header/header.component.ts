import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faScroll } from '@fortawesome/free-solid-svg-icons';
import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { profileType } from 'src/app/enums/profile-type.enum';
import { AppState } from 'src/app/store/app.state';
import { faBookBookmark } from '@fortawesome/free-solid-svg-icons';
import {
  clearSubscriptions,
  getSubscriptions,
  loginWithToken,
  logout,
} from 'src/app/store/user/user.actions';
import { selectUserData } from 'src/app/store/user/user.selectors';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  clearArticleForDisplayState,
  clearMyArticlesState,
  loadMyArticles,
} from 'src/app/store/article/article.actions';
import * as NotificationsActions from '../../store/notification/notification.actions';
import { interval } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faPencil = faPencil;
  faScroll = faScroll;
  faBookOpenReader = faBookOpenReader;
  faComment = faComment;
  faFlag = faFlag;
  faBookBookmark = faBookBookmark;
  faMagnifyingGlass = faMagnifyingGlass;

  private jwtService: JwtHelperService = new JwtHelperService();

  username: string | null = null;
  profileType: profileType | null = null;
  userID: number | null = null;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    const token: string | null = localStorage.getItem('JWT');
    if (token) {
      const username: string = this.jwtService.decodeToken(token).username;
      this.store.dispatch(loginWithToken({ username }));
    }

    this.store.select(selectUserData).subscribe((stateData) => {
      if (stateData.username && stateData.profileType && stateData.id) {
        this.username = stateData.username;
        this.profileType = stateData.profileType;
        const id: number = stateData.id;
        this.userID = id;
        this.store.dispatch(loadMyArticles({ id }));

        this.store.dispatch(
          NotificationsActions.initNotificationsState({
            id,
          })
        );

        this.store.dispatch(getSubscriptions({ id }));

        const after: Date = new Date(new Date().valueOf() - 60000);

        interval(60000).subscribe(() => {
          if (this.username) {
            this.store.dispatch(
              NotificationsActions.updateNotifications({ id, after })
            );
          }
        });

        this.setHeader();
      } else {
        this.clearHeader();
      }
    });
  }

  gotoArticleEdit() {
    this.router.navigate(['articleEdit']);
  }

  gotoFeed() {
    this.router.navigate(['feed']);
  }

  gotoSubscriptionFeed() {
    this.router.navigate(['subscriptionFeed']);
  }

  gotoMyArticles() {
    this.router.navigate(['myArticles']);
  }

  gotoReports() {
    this.router.navigate(['reports']);
  }

  gotoSearch() {
    this.router.navigate(['search']);
  }

  gotoNotifications() {
    const notificationsIcon: HTMLElement | null =
      document.getElementById('notificationsIcon');
    if (notificationsIcon) notificationsIcon.style.color = 'azure';
    this.router.navigate(['notifications']);
  }

  gotoMyProfile() {
    if (this.username == null) return;
    else {
      this.router.navigate(['myProfile']);
    }
  }

  logout() {
    localStorage.removeItem('JWT');
    this.router.navigate(['login']);
    this.store.dispatch(logout());
    this.store.dispatch(clearMyArticlesState());
    this.store.dispatch(clearArticleForDisplayState());
    this.store.dispatch(NotificationsActions.clearNotifications());
    this.store.dispatch(clearSubscriptions());
    localStorage.removeItem('text');
    localStorage.removeItem('title');
    this.username = null;
    this.profileType = null;
    this.userID = null;
  }

  setHeader() {
    const userLabel: HTMLElement | null = document.getElementById('userLabel');
    if (userLabel) userLabel.textContent = this.username;

    const userInfo: HTMLElement | null = document.getElementById('userInfo');
    if (userInfo) userInfo.style.visibility = 'visible';

    const title: HTMLElement | null = document.getElementById('title');
    if (title) title.className = 'headerTitle';

    const menu: HTMLElement | null = document.getElementById('menu');
    if (menu) menu.style.visibility = 'visible';

    const button: HTMLElement | null = document.getElementById('reports');
    if (button && this.profileType === 'user') {
      button.style.visibility = 'hidden';
      button.style.pointerEvents = 'none';
    }
  }

  clearHeader() {
    const userInfo: HTMLElement | null = document.getElementById('userInfo');
    if (userInfo) userInfo.style.visibility = 'hidden';

    const title: HTMLElement | null = document.getElementById('title');
    if (title) title.className = 'titleNotLogedIn';

    const menu: HTMLElement | null = document.getElementById('menu');
    if (menu) menu.style.visibility = 'hidden';
  }
}
