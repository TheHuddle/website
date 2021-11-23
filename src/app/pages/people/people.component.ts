import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FormGroup, FormControl } from '@angular/forms'

import { ApiService } from '@services/api.service'
import { AssetsService } from '@services/assets.service'

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.sass', '../profile/profile.component.sass']
})
export class PeopleComponent implements OnInit {
  loading = true
  success = false
  avatar = ''

  public form: FormGroup = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    pronouns: new FormControl(''),
    discord_handle: new FormControl(''),
    avatar: new FormControl(''),
    email: new FormControl(''),
    website: new FormControl(''),
    bio: new FormControl(''),
  })

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private assets: AssetsService,
  ) {}

  ngOnInit(): void {
    this.form.disable();
    this.route.params.subscribe(
      params => this.getUserData(params['id']),
      error => this.error(),
    );
  }

  getUserData(userId) {
    this.apiService.get(`users/${userId}`).subscribe(
      result => this.updateUser(result.data),
      error => this.error(),
    );
  }

  updateUser(user) {
    this.form.patchValue(user)
    this.avatar = this.assets.get(user.avatar);
    this.success = true
    this.loading = false
  }

  error() {
    this.loading = false
    this.success = false
    this.router.navigate(['/'])
  }
}
