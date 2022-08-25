import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { selectSubscriptions } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-my-subscriptions',
  templateUrl: './my-subscriptions.component.html',
  styleUrls: ['./my-subscriptions.component.css'],
})
export class MySubscriptionsComponent implements OnInit {
  subscriptions: (User | undefined)[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectSubscriptions)
      .subscribe(
        (subscritpions: (User | undefined)[]) =>
          (this.subscriptions = subscritpions.filter(
            (subscription: User | undefined) => subscription
          ))
      );
  }
}
