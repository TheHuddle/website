import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';

const MaterialImports = [
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatInputModule,
  MatProgressBarModule,
  MatTabsModule,
  MatSidenavModule,
];

import { FileViewerComponent } from './viewer/component';
import { FileUploaderComponent } from './uploader/component';
import { FileManagerComponent } from './manager/component';
import { FileManagerDialogComponent } from './dialog/component';

const DeclarationsAndExports = [
  FileManagerComponent,
  FileManagerDialogComponent,
];

@NgModule({
  declarations: [
    FileUploaderComponent,
    FileViewerComponent,
    ...DeclarationsAndExports,
  ],
  imports: [CommonModule, ReactiveFormsModule, ...MaterialImports],
  exports: [...DeclarationsAndExports],
})
export class FilesModule {}
