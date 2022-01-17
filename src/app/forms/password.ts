import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable, of } from 'rxjs';

import { ApiService } from '@services/api';

export class PasswordForm {
  public readonly name = 'password';

  group: FormGroup = new FormGroup(
    {
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      confirm: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      isPassword: new FormControl(true),
    },
    this.validatePasswordsEqual
  );

  constructor(private api: ApiService) {}

  private validatePasswordsEqual(group) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirm')?.value;

    if (!password || !confirm || password === confirm) {
      return null;
    } else {
      return { passwordDoesNotMatch: true };
    }
  }

  submit() {
    if (!this.group.valid) return of({});
    this.group.disable();

    const data = { password: this.group.get('password')?.value };

    return this.api.patch('users/me', data);
  }
}
