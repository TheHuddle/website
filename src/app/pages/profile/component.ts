import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ApiService } from '@services/api';
import { AssetsService } from '@services/assets';

import { FileManagerDialogComponent } from '@components/files/dialog/component';

import { ProfileForm } from '@forms/profile';
import { PasswordForm } from '@forms/password';

@Component({
  selector: 'app-profile',
  templateUrl: './component.html',
  styleUrls: ['./component.sass'],
})
export class ProfileComponent implements OnInit {
  public loaded = false;
  public upload = '';
  public editing = '';

  public avatar = '';
  private initial = {};

  constructor(
    private api: ApiService,
    private assets: AssetsService,
    private dialog: MatDialog
  ) {}

  public forms = {
    password: new PasswordForm(this.api),
    profile: new ProfileForm(this.api),
  };

  ngOnInit(): void {
    this.reset();
    this.refreshUser();
  }

  private refreshUser() {
    const query = `
    query {
      users_me {
        avatar { id }
        bio
        discord_handle
        email
        first_name last_name
        in_logan
        pronouns
        website
      }
    }
    `;

    const options = { isSystemQuery: true };
    this.api
      .query(query, options)
      .subscribe((result) => this.refresh(result.data));
  }

  private refresh(data) {
    let user = data;
    if (data.users_me) {
      user = data.users_me;
    }
    this.avatar = this.assets.get(user.avatar);
    this.initial = { ...user, password: '', confirm: '' };

    this.reset();
    this.loaded = true;
  }

  reset() {
    this.forms.password.group.disable();
    this.forms.password.group.patchValue(this.initial);
    this.forms.password.group.markAsPristine();

    this.forms.profile.group.disable();
    this.forms.profile.group.patchValue(this.initial);
    this.forms.profile.group.markAsPristine();

    this.upload = '';
    this.editing = '';
  }

  submit(form) {
    if (!form.group.valid) return;
    this.upload = form.name;
    this.loaded = false;

    form.submit().subscribe((result) => this.refresh(result.data));
  }

  edit(form) {
    if (!this.loaded) return;
    this.reset();

    form.group.enable();
    this.editing = form.name;
  }

  openDialog() {
    const dialogRef = this.dialog.open(FileManagerDialogComponent, {
      width: '90%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.reset();
      this.upload = 'avatar';
      this.api
        .patch('users/me', { avatar: result })
        .subscribe((result) => this.refreshUser());
    });
  }
}
