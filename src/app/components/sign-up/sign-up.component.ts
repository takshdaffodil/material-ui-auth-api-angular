import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  hidePass = true;
  hideCpass = true;
  error = '';
  passwordMatch = true;

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

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    this.onFormChange();
    this.passwordsMatch();
  }

  signupUser() {
    if (this.password?.value === this.cpassword?.value) {
      this.authService.SignUpUser(this.signupForm.value).subscribe(
        (res) => {
          this.router.navigate(['sign-in']);
        },
        (err) => {
          if (err.error) {
            this.error = err.error;
          }
        },
        () => console.log('Signup completed.')
      );
    } else {
      this.passwordMatch = false;
    }
  }

  onFormChange() {
    this.signupForm.valueChanges.subscribe((val) => {
      this.error = '';
    });
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
}
