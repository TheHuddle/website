import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable, of } from 'rxjs';

import { ApiService } from '@services/api';
import { HuddleValidators } from '@forms/validators';

export class RegistrationForm {
  public readonly name = 'registration';
  private readonly memberRole = 'f534e9f5-1dcb-47dd-b7d5-e7d5933bb30e';

  group: FormGroup = new FormGroup(
    {
      bio: new FormControl(''),
      discord_handle: new FormControl('', [
        Validators.required,
        HuddleValidators.discord,
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl(''),
      in_logan: new FormControl(false, [Validators.required]),
      pronouns: new FormControl(''),
      website: new FormControl(''),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      passwordconfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      agree: new FormControl('', [Validators.requiredTrue]),
    },
    HuddleValidators.passwordsMatch
  );

  constructor(private api: ApiService) {}

  submit(): Observable<any> {
    if (!this.group.valid) return of({});
    this.group.disable();

    const data = this.group.value;
    delete data['passwordconfirm'];
    delete data['agree'];
    data['role'] = this.memberRole;

    return this.api.post('users', this.group.value);
  }
}
