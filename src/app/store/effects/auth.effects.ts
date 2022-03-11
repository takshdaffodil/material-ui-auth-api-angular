import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { LoginUserData } from 'src/app/shared/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import {
  signinError,
  signinRequest,
  signinSuccess,
} from '../actions/sign-in.actions';
import {
  signUpError,
  signUpRequest,
  signUpSuccess,
} from '../actions/sign-up.actions';

@Injectable()
export class AuthEffects {
  constructor(
    public action$: Actions,
    public authService: AuthService,
    public router: Router,
    public snackbar: MatSnackBar
  ) {}

  signInUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(signinRequest),
      switchMap((userData) => {
        return this.authService.SignInUser(userData).pipe(
          map((userData) => {
            this.authService.SaveUserInLocalStorage(userData);
            this.router.navigate(['dashboard']);
            return signinSuccess({ userData });
          }),
          catchError((error) => {
            return of(signinError({ error }));
          })
        );
      })
    )
  );
  signUpUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(signUpRequest),
      switchMap((userData) => {
        return this.authService.SignUpUser(userData).pipe(
          map((userData) => {
            this.router.navigate(['sign-in']);
            return signUpSuccess();
          }),
          catchError((error) => {
            return of(signUpError({ error }));
          })
        );
      })
    )
  );
}
