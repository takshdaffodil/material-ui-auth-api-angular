import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginUserData, APIUser } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userDataFromApi: any;
  constructor(public http: HttpClient, public router: Router) {
    if (localStorage.getItem('user') !== null) {
      this.userDataFromApi = JSON.parse(localStorage.getItem('user')!);
    }
  }

  SignUpUser(userData: APIUser) {
    let payload = { ...userData };
    return this.http.post(`${environment.api_key}/signup`, { payload });
  }

  SignInUser(userData: LoginUserData) {
    let payload = { ...userData };
    return this.http.post(`${environment.api_key}/auth/login`, { payload });
  }

  SignOutUser() {
    localStorage.removeItem('user');
    this.userDataFromApi = null;
    this.router.navigate(['sign-in']);
  }
}
