import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable, of } from 'rxjs';

import { ApiService } from '@services/api';
import { HuddleValidators } from '@forms/validators';

export class ProfileForm {
  public readonly name = 'profile';

  group: FormGroup = new FormGroup({
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
  });

  constructor(private api: ApiService) {}

  submit(): Observable<any> {
    if (!this.group.valid) return of({});
    this.group.disable();

    return this.api.patch('users/me', this.group.value);
  }
}
