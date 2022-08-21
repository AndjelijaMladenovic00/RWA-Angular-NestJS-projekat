import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginData } from 'src/app/interfaces/loginData.interface';
import * as UserActions from '../../store/user/user.actions';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  constructor(private router: Router, private store: Store) {}

  username: string = '';
  password: string = '';

  ngOnInit(): void {}

  gotoSignup(): void {
    this.router.navigate(['signup']);
  }

  login() {
    if (this.username === '' || this.password === '') {
      const label: HTMLElement | null = document.getElementById('errorMessage');
      if (label) label.style.visibility = 'visible';
      return;
    }
    const userData: LoginData = {
      username: this.username,
      password: this.password,
    };
    this.store.dispatch(UserActions.login({ userData }));
  }

  setUsername(username: string) {
    this.username = username;
  }

  setPassword(password: string) {
    this.password = password;
  }
}
