import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { emptyError } from 'src/app/store/actions/sign-in.actions';
import { signUpRequest } from 'src/app/store/actions/sign-up.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  hidePass = true;
  hideCpass = true;
  passwordMatch = true;
  error = this.store.select((state) => state.auth?.error);
  isLoading = this.store.select((state) => state.auth?.loading);

  signupForm = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastname: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    cpassword: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    acceptTerms: new FormControl(true, [Validators.required]),
  });

  get password() {
    return this.signupForm.get('password');
  }
  get cpassword() {
    return this.signupForm.get('cpassword');
  }

  constructor(
    public store: Store<{ auth: any }>,
    public snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.passwordsMatch();
    this.showSnackbarOnError();
  }

  signupUser() {
    if (
      this.signupForm.get('password')?.value ===
      this.signupForm.get('cpassword')?.value
    ) {
      this.store.dispatch(signUpRequest(this.signupForm.value));
    } else {
      this.passwordMatch = false;
    }
  }

  passwordsMatch() {
    this.cpassword?.valueChanges.subscribe((val) => {
      if (val !== this.password?.value) {
        this.passwordMatch = false;
      } else {
        this.passwordMatch = true;
      }
    });
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
