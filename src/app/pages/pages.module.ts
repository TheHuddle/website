import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const MaterialImports = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatProgressBarModule,
]

import { CodeOfConductComponent } from './code-of-conduct/code-of-conduct.component';
import { ContactComponent } from './contact/contact.component';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

const DeclarationsAndExports = [
    CodeOfConductComponent,
    ContactComponent,
    EventsComponent,
    HomeComponent,
    ProfileComponent,
]

@NgModule({
  declarations: [
    ...DeclarationsAndExports,
  ],
  imports: [
    CommonModule,
    ...MaterialImports,
  ],
  exports: [
    ...DeclarationsAndExports,
  ]
})
export class PagesModule { }
