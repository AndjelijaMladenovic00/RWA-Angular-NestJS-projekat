import { Component, OnInit } from '@angular/core';
import { ParamMap, Router } from '@angular/router';
import { UserProfileData } from 'src/app/interfaces/userProfileData.interface';
import { UserService } from 'src/app/services/user-service/user.service';
import { ActivatedRoute } from '@angular/router';
import { faCircleUser, faStar } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import {
  selectID,
  selectSubscriptions,
} from 'src/app/store/user/user.selectors';
import { User } from 'src/app/models/user.model';
import { subscribe, unsubscribe } from 'src/app/store/user/user.actions';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  faCircleUser = faCircleUser;
  faStar = faStar;

  id: number = -1;
  profileData: UserProfileData | null = null;
  subscribed: boolean = false;
  logedUserID: number | null = -1;

  constructor(
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const idParam: string | null = params.get('id');
      if (idParam) {
        this.id = parseInt(idParam);

        this.userService
          .getProfileData(this.id)
          .subscribe((data: UserProfileData) => (this.profileData = data));

        this.store
          .select(selectSubscriptions)
          .subscribe((subscriptions: (User | undefined)[]) => {
            subscriptions.forEach((subscription: User | undefined) => {
              if (subscription && subscription.id == this.id)
                this.subscribed = true;
            });
          });

        this.store
          .select(selectID)
          .subscribe((id: number | null) => (this.logedUserID = id));
      }
    });
  }

  gotoUserArticles() {
    if (this.profileData)
      this.router.navigate([
        'userArticles',
        `${this.profileData.userId}`,
        `${this.profileData.username}`,
      ]);
  }

  subscribe() {
    if (!this.subscribed && this.profileData && this.logedUserID) {
      this.subscribed = true;
      const id: number = this.logedUserID;
      const subscriptionID: number = this.profileData.userId;
      this.store.dispatch(subscribe({ id, subscriptionID }));
    }
  }

  unsubscribe() {
    if (this.subscribed && this.profileData && this.logedUserID) {
      this.subscribed = false;
      const id: number = this.logedUserID;
      const subscriptionID: number = this.profileData.userId;
      this.store.dispatch(unsubscribe({ id, subscriptionID }));
    }
  }

  gotoSubscribers() {
    if (this.profileData)
      this.router.navigate([
        'subscribers',
        `${this.profileData.userId}`,
        `${this.profileData.username}`,
      ]);
  }

  gotoSubscriptions() {
    if (this.profileData)
      this.router.navigate([
        'subscriptions',
        `${this.profileData.userId}`,
        `${this.profileData.username}`,
      ]);
  }
}
