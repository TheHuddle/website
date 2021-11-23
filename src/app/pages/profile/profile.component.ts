import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ApiService } from '@services/api.service';
import { AssetsService } from '@services/assets.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  public editing = false
  public loaded = false
  public uploading = false
  public avatar = ''
  private initial = {}

  public form: FormGroup = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl(''),
    pronouns: new FormControl(''),
    discord_handle: new FormControl('', [Validators.required, Validators.pattern('^@.+$')]),
    avatar: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    website: new FormControl(''),
    in_logan: new FormControl(false, [Validators.required]),
    bio: new FormControl(''),
  })
  constructor(
    private apiService: ApiService,
    private assets: AssetsService,
  ) { }

  ngOnInit(): void {
    this.form.disable();
    this.form.controls['discord_handle'].valueChanges.subscribe(handle => this.formatDiscordHandle(handle));
    this.apiService.get('users/me').subscribe(result => this.refreshData(result.data));
  }

  refreshData(user) {
    this.avatar = this.assets.get(user.avatar);
    this.initial = {...user};
    this.form.patchValue(this.initial);
    this.form.markAsPristine();
    this.uploading = false;
    this.loaded = true;
  }

  submit() {
    if (!this.form.valid) return;
    this.form.disable();
    this.editing = false;
    this.uploading = true;
    this.loaded = false;

    this.apiService.patch(
      'users/me',
      this.form.value,
    ).subscribe(result => this.refreshData(result.data));
  }

  edit() {
    if (!this.loaded) return;
    this.form.enable();
    this.editing = true;
  }

  discard() {
    this.form.disable();
    this.form.patchValue(this.initial);
    this.form.markAsPristine();
    this.editing = false;
  }

  private formatDiscordHandle(handle) {
    if ( /^@/.test(handle) ) return;

    this.form.controls['discord_handle'].setValue(`@${handle}`)
  }
}
