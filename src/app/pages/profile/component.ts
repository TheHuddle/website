import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'

import { ApiService } from '@services/api.service'
import { AssetsService } from '@services/assets.service'

import { FileManagerDialogComponent } from '@components/files/dialog/component'

@Component({
  selector: 'app-profile',
  templateUrl: './component.html',
  styleUrls: ['./component.sass']
})
export class ProfileComponent implements OnInit {
  public editing = false
  public editingPassword = false
  public loaded = false
  public uploading = false
  public uploadingPassword = false
  public avatar = ''

  private initial = {}

  public password: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(10)]),
    confirm: new FormControl('', [Validators.required, Validators.minLength(10)]),
    isPassword: new FormControl(true),
  }, this.validatePasswordsEqual);

  validatePasswordsEqual(group) {
    const password = group.get('password')?.value
    const confirm  = group.get('confirm')?.value

    if (!password || !confirm || password === confirm) {
      return null
    } else {
      return {'passwordDoesNotMatch': true };
    }
  }

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
    private api: ApiService,
    private assets: AssetsService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.form.disable();
    this.form.controls['discord_handle'].valueChanges.subscribe(handle => this.formatDiscordHandle(handle));
    this.api.get('users/me').subscribe(result => this.refreshData(result.data));
  }

  refreshData(user) {
    this.avatar = this.assets.get(user.avatar);
    this.initial = {...user, password: '', confirm: ''};
    this.form.patchValue(this.initial);
    this.form.markAsPristine();

    this.password.patchValue(this.initial);
    this.password.markAsPristine();

    this.uploading = false;
    this.uploadingPassword = false;
    this.loaded = true;
  }

  submit(form) {
    if (!form.valid) return;
    let data = {}
    form.disable();

    this.editingPassword = false;
    this.editing = false;

    if (form.get('isPassword')?.value) {
      this.uploadingPassword = true;
      data = {password: form.get('password').value}
    } else {
      this.uploading = true;
      data = form.value
    }
    this.loaded = false;

    this.api.patch(
      'users/me',
      data,
    ).subscribe(result => this.refreshData(result.data));
  }

  edit(form) {
    if (!this.loaded) return;
    this.discard(this.form);
    this.discard(this.password);

    form.enable()
    if (form.get('isPassword')?.value) {
      this.editingPassword = true;
    } else {
      this.editing = true;
    }
  }

  discard(form) {
    form.disable();
    form.patchValue(this.initial);
    form.markAsPristine();
    this.editing = false;
    this.editingPassword = false;
  }

  private formatDiscordHandle(handle) {
    if ( /^@/.test(handle) ) return;

    this.form.controls['discord_handle'].setValue(`@${handle}`)
  }

  openDialog() {
    const dialogRef = this.dialog.open(FileManagerDialogComponent, {width: "90%"})

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return
      this.form.disable()
      this.uploading = true
      this.api.patch(
        'users/me', {avatar: result},
      ).subscribe(result => this.refreshData(result.data));
    })
  }
}
