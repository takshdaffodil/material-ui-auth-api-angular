import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  hide = true;
  error = '';

  signinForm = new FormGroup({
    email: new FormControl(' ', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.minLength(3),
      Validators.required,
    ]),
  });

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    this.onFormChange();
  }

  signinUser() {
    this.authService.SignInUser(this.signinForm.value).subscribe(
      (res) => {
        this.authService.userDataFromApi = res;
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['dashboard']);
      },
      (err) => {
        if (err.error) {
          this.error = err.error;
        }
      },
      () => console.log('Signin completed.')
    );
  }
  onFormChange() {
    this.signinForm.valueChanges.subscribe((val) => {
      this.error = '';
    });
  }
}
