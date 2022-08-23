import { Component, OnInit } from '@angular/core';
import { ParamMap, Router } from '@angular/router';
import { UserProfileData } from 'src/app/interfaces/userProfileData.interface';
import { UserService } from 'src/app/services/user-service/user.service';
import { ActivatedRoute } from '@angular/router';
import { faCircleUser, faStar } from '@fortawesome/free-solid-svg-icons';

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

  constructor(
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const idParam: string | null = params.get('id');
      if (idParam) {
        this.id = parseInt(idParam);

        this.userService
          .getProfileData(this.id)
          .subscribe((data: UserProfileData) => (this.profileData = data));
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

  subscribeOrUnsubscribe() {}
}
