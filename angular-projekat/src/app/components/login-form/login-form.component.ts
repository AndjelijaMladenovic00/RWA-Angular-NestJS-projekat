import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LogedUser } from 'src/app/interfaces/logedUser.interface';
import { LoginData } from 'src/app/interfaces/loginData.interface';
import { Token } from 'src/app/interfaces/token.interface';
import { LoginService } from 'src/app/services/login-service/login.service';
import * as LoginActions from '../../store/login.actions';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  constructor(
    private router: Router,
    private loginService: LoginService,
    private store: Store
  ) {}

  username: string = '';
  password: string = '';

  ngOnInit(): void {}

  gotoSignup(): void {
    this.router.navigate(['signup']);
  }

  login() {
    const credentials: LoginData = {
      username: this.username,
      password: this.password,
    };
    this.store.dispatch(LoginActions.login({ credentials }));
    /*if (this.username === '' || this.password === '') {
      const label: HTMLElement | null = document.getElementById('errorMessage');
      if (label) label.style.visibility = 'visible';
      return;
    }
    this.loginService
      .login(this.username, this.password)
      .subscribe((result: Token) => {
        console.log(result);
        const userData: LogedUser = {
          username: this.username,
          token: result,
        };
      });*/
  }

  setUsername(username: string) {
    this.username = username;
  }

  setPassword(password: string) {
    this.password = password;
  }
}
