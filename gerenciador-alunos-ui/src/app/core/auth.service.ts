import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../environments/environment';
import { Login } from './../login/model/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {}

  realizarLogin(login: Login) {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );

    this.http
      .post(`${environment.URL_API}/oauth/token`, JSON.stringify(login), {
        headers,
      })
      .subscribe(
        (result: any) => {
          this.setToken(result);

          this.router.navigate(['home']);
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  logout(): void {
    localStorage.clear();

    this.router.navigate(['login']);
  }

  isTokenExpired(): boolean {
    const token = this.getToken();

    return this.jwtHelper.isTokenExpired(token);
  }

  getDecodeToken(): any {
    const token = this.getToken();

    return this.jwtHelper.decodeToken(token);
  }

  private getToken(): any {
    return localStorage.getItem('access_token');
  }

  private setToken(token: any): void {
    localStorage.setItem('access_token', token.token);
  }
}
