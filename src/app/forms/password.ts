import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable, of } from 'rxjs';

import { ApiService } from '@services/api';
import { HuddleValidators } from '@forms/validators';

export class PasswordForm {
  public readonly name = 'password';

  group: FormGroup = new FormGroup(
    {
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      passwordconfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      isPassword: new FormControl(true),
    },
    HuddleValidators.passwordsMatch
  );

  constructor(private api: ApiService) {}

  submit() {
    if (!this.group.valid) return of({});
    this.group.disable();

    const data = { password: this.group.get('password')?.value };

    return this.api.patch('users/me', data);
  }
}
