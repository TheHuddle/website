import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { debounceTime, distinctUntilChanged, from, delay } from 'rxjs';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './component.html',
  styleUrls: ['./component.sass']
})
export class LoginComponent implements OnInit {
  loggingIn = false
  failedLogin = false

  validBar = 0
  validEmail = 0
  validPassword = 0

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    if(this.authService.loggedIn()) {
      this.router.navigate(['/home']);
    }
    this.form.valueChanges.pipe(
        debounceTime(200),
        distinctUntilChanged(),
      ).subscribe(() => {
      this.validEmail = this.form.controls['email'].valid ? 50 : 0
      this.validPassword = this.form.controls['password'].valid ? 50 : 0
      this.validBar = this.validEmail + this.validPassword
    });
  }

  submit() {
    if (this.form.valid) {
      this.loggingIn = true

      this.authService.login(
        this.form.value.email,
        this.form.value.password,
      ).subscribe(
        success => this.router.navigate(['/home']),
        failure => {
          this.loggingIn = false;
          this.failedLogin = true;
          this.failedDialog()
      });
    }
  }

  failedDialog() {
    this.dialog.open(FailedDialog)
  }
}

@Component({
  selector: 'failed-login-dialog',
  template: `
    <h1>login failed</h1>
  `,
}) export class FailedDialog {}
