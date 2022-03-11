import { createReducer, on } from '@ngrx/store';
import {
  emptyError,
  logOut,
  signinError,
  signinRequest,
  signinSuccess,
} from '../actions/sign-in.actions';
import {
  signUpError,
  signUpRequest,
  signUpSuccess,
} from '../actions/sign-up.actions';

const initialState = {
  userData: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const AuthReducer = createReducer(
  initialState,
  on(signinRequest, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(signinSuccess, (state, { userData }) => {
    return {
      ...state,
      userData: userData,
      loading: false,
      isAuthenticated: true,
    };
  }),
  on(signinError, (state, { error }) => {
    return {
      ...state,
      error: error.error,
      loading: false,
    };
  }),
  on(signUpRequest, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(signUpSuccess, (state) => {
    return {
      ...state,
      error: null,
      loading: false,
    };
  }),
  on(signUpError, (state, { error }) => {
    return {
      ...state,
      error: error.error,
      loading: false,
    };
  }),
  on(logOut, (state) => {
    return {
      ...state,
      userData: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    };
  }),
  on(emptyError, (state) => {
    return {
      ...state,
      error: null,
    };
  })
);
