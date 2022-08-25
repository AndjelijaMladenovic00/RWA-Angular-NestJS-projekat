import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { subscribe, unsubscribe } from 'src/app/store/user/user.actions';
import { selectID } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-user-thumb',
  templateUrl: './user-thumb.component.html',
  styleUrls: ['./user-thumb.component.css'],
})
export class UserThumbComponent implements OnInit {
  faCircleUser = faCircleUser;

  @Input() user: User | undefined = undefined;
  subscribed: boolean = false;
  logedUserID: number | null = null;

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectID)
      .subscribe((id: number | null) => (this.logedUserID = id));
  }

  subscribe() {
    if (!this.subscribed && this.user && this.logedUserID) {
      this.subscribed = true;
      const id: number = this.logedUserID;
      const subscriptionID: number = this.user.id;
      this.store.dispatch(subscribe({ id, subscriptionID }));
    }
  }

  unsubscribe() {
    if (this.subscribed && this.user && this.logedUserID) {
      this.subscribed = false;
      const id: number = this.logedUserID;
      const subscriptionID: number = this.user.id;
      this.store.dispatch(unsubscribe({ id, subscriptionID }));
    }
  }

  gotoProfile() {
    if (this.user) this.router.navigate(['profile', `${this.user.id}`]);
  }
}
