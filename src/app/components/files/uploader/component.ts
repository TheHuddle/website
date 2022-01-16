import { Component, Input } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ApiService } from '@services/api.service'

@Component({
  selector: 'huddle-file-uploader',
  templateUrl: './component.html',
  styleUrls: ['./component.sass']
})
export class FileUploaderComponent {
  public form: FormGroup = new FormGroup({
    file: new FormControl('', [Validators.required]),
  })

  @Input() fileViewer: any;

  progress = 0

  public filepath: any

  constructor(
    private api: ApiService,
  ) { }

  select(event) {
    console.log(event.target.files)

    const files = event.target.files;
    if (!files || files.length < 1 || files.length > 1) return;

    const file = files[0];
    this.form.controls['file'].setValue(file)
    this.form.markAsDirty()
    console.log(file)
    if (!file.type.match(/image\/*/)) return;

    const reader = new FileReader()
    reader.readAsDataURL(file)
    this.progress = 50
    reader.onload = (x) => {
      this.filepath = reader.result?.toString()
      this.progress = 100
    }
  }

  submit(form) {
    if (!form.valid) return;
    form.disable();
    const file = this.form.controls['file'].value

    this.api.upload(file).subscribe(
      success => this.success(success),
      failure => this.failure(),
    )
  }

  cancel() {
    this.filepath = null
    this.form.reset()
  }

  private success(x) {
    this.cancel()
    this.progress = 0
    this.form.enable()

    this.fileViewer.updateImages()
  }

  private failure() {
    this.form.enable()
  }
}
