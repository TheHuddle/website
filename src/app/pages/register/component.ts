import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { ApiService } from '@services/api';
import { AuthService } from '@services/auth';

import { RegistrationForm } from '@forms/registration';

@Component({
  selector: 'huddle-registration',
  templateUrl: './component.html',
  styleUrls: ['./component.sass'],
})
export class RegistrationComponent implements OnInit {
  public status = '';
  public registered = {};
  private email = '';
  private password = '';

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.auth.loggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  public form = new RegistrationForm(this.api);

  submit(form) {
    if (!form.group.valid) return;
    this.status = 'loading';

    this.email = this.form.group.get('email')?.value;
    this.password = this.form.group.get('password')?.value;

    form
      .submit()
      .pipe(finalize(() => this.success()))
      .subscribe(
        (result) => true,
        (error) => this.failure(error)
      );
  }

  success() {
    this.auth
      .login(this.email, this.password)
      .subscribe((result) => this.router.navigate(['/home']));
  }

  failure(data) {
    this.status = '';
    this.form.group.enable();
  }
}
