import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { ApiService } from '@services/api';
import { AssetsService } from '@services/assets';

@Component({
  selector: 'huddle-file-dialog',
  templateUrl: './component.html',
  styleUrls: ['./component.sass'],
})
export class FileManagerDialogComponent {
  constructor(public dialogRef: MatDialogRef<FileManagerDialogComponent>) {}

  select(fileId) {
    this.dialogRef.close(fileId);
  }
}
