import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css'],
})
export class SubscriptionsComponent implements OnInit {
  username: string | null = '';
  userId: number = -1;
  subscriptions: User[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.username = param.get('username');
      const idParam: string | null = param.get('id');
      if (idParam) this.userId = parseInt(idParam);

      this.userService
        .getSubscriptions(this.userId)
        .subscribe(
          (subscriptions: User[]) => (this.subscriptions = subscriptions)
        );
    });
  }
}
