import { createAction, props } from '@ngrx/store';
import { APIUser } from 'src/app/shared/models';

export const signUpRequest = createAction(
  '[Sign-Up Page], SignupRequest',
  props<APIUser>()
);

export const signUpSuccess = createAction('[Sign-Up Page], SignupSuccess');

export const signUpError = createAction(
  '[Sign-Up Page], SignupError',
  props<any>()
);
