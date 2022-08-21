import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  private jwtHelper: JwtHelperService;
  constructor(private router: Router) {
    this.jwtHelper = new JwtHelperService();
  }

  canActivate(): boolean {
    const token: string | null = localStorage.getItem('JWT');
    if (token) {
      if (this.jwtHelper.isTokenExpired(token)) {
        this.router.navigate(['login']);
        return false;
      }
      const decodedToken = this.jwtHelper.decodeToken(token);
      if (decodedToken.profileType && decodedToken.profileType != 'admin') {
        this.router.navigate(['feed']);
        return false;
      } else {
        return true;
      }
    } else {
      this.router.navigate(['feed']);
      return false;
    }
  }
}
