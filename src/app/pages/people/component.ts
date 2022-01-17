import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { ApiService } from '@services/api';
import { AssetsService } from '@services/assets';

@Component({
  selector: 'app-people',
  templateUrl: './component.html',
  styleUrls: ['./component.sass', '../profile/component.sass'],
})
export class PeopleComponent implements OnInit {
  loading = true;
  success = false;
  avatar = '';

  public form: FormGroup = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    pronouns: new FormControl(''),
    discord_handle: new FormControl(''),
    email: new FormControl(''),
    website: new FormControl(''),
    bio: new FormControl(''),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private assets: AssetsService
  ) {}

  ngOnInit(): void {
    this.form.disable();
    this.route.params.subscribe(
      (params) => this.getUserData(params['id']),
      (error) => this.error()
    );
  }

  private getUserData(userId) {
    const query = `
    query($id: ID!) {
      users_by_id(id: $id) {
        avatar { id }
        bio
        discord_handle
        first_name last_name
        pronouns
        website
      }
    }
    `;

    const options = {
      isSystemQuery: true,
      variables: {
        id: userId,
      },
    };
    this.api.query(query, options).subscribe(
      (result) => this.updateUser(result.data),
      (error) => this.error()
    );
  }

  private updateUser(data) {
    const user = data.users_by_id;
    this.form.patchValue(user);
    this.avatar = this.assets.get(user.avatar);
    this.success = true;
    this.loading = false;
  }

  private error() {
    this.loading = false;
    this.success = false;
    this.router.navigate(['/']);
  }
}
