import { createAction, props } from '@ngrx/store';
import { LoginUserData } from 'src/app/shared/models';

export const signinRequest = createAction(
  '[Sign-In Page],SigninRequest',
  props<{ userData: any }>()
);

export const signinSuccess = createAction(
  '[Sign-In Page],SigninSuccess',
  props<{ userData: any }>()
);

export const signinError = createAction(
  '[Sign-In Page],SigninError',
  props<{ error: any }>()
);
export const logOut = createAction('[Dashboard Page],Logout');

export const emptyError = createAction('[Sign-In Page], Emptyerror');
