import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { empty } from 'rxjs';
import {
  emptyError,
  signinRequest,
} from 'src/app/store/actions/sign-in.actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  hide = true;
  error = this.store.select((state) => state.auth?.error);
  isLoading = this.store.select((state) => state.auth?.loading);

  signinForm = new FormGroup({
    email: new FormControl(' ', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.minLength(3),
      Validators.required,
    ]),
  });

  constructor(
    public store: Store<{ auth: any }>,
    public snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.showSnackbarOnError();
  }
  signinUser() {
    this.store.dispatch(signinRequest(this.signinForm.value));
  }

  showSnackbarOnError() {
    this.error.subscribe((res) => {
      if (res) {
        this.snackbar.open(res, 'OK!', { duration: 2000 });
        this.store.dispatch(emptyError());
      }
    });
  }
}
