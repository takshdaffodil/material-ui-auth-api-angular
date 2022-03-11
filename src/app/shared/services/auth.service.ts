import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logOut } from 'src/app/store/actions/sign-in.actions';
import { environment } from 'src/environments/environment';
import { LoginUserData, APIUser } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userDataFromApi: any;
  constructor(
    public http: HttpClient,
    public router: Router,
    public store: Store<{ auth: any }>
  ) {
    if (localStorage.getItem('user') !== null) {
      this.userDataFromApi = JSON.parse(localStorage.getItem('user')!);
    }
  }

  SignUpUser(userData: APIUser) {
    let payload = { ...userData };
    return this.http.post(`${environment.api_key}/signup`, { payload });
  }

  SignInUser(userData: any) {
    let payload = { ...userData };
    console.log(payload);

    return this.http.post(`${environment.api_key}/auth/login`, { payload });
  }

  SaveUserInLocalStorage(userData: any) {
    localStorage.setItem('user', JSON.stringify(userData));
  }

  SignOutUser() {
    localStorage.removeItem('user');
    this.userDataFromApi = null;
    this.router.navigate(['sign-in']);
    this.store.dispatch(logOut());
  }
}
