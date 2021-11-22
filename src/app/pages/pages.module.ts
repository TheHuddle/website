import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const MaterialImports = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatDialogModule,
  MatProgressBarModule,
]

import { ButtonsModule } from '@components/buttons/buttons.module';

import { CodeOfConductComponent } from './code-of-conduct/code-of-conduct.component';
import { ContactComponent } from './contact/contact.component';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { ContactCardComponent } from './contact/contact-card/contact-card.component';

const DeclarationsAndExports = [
    CodeOfConductComponent,
    ContactComponent,
    EventsComponent,
    HomeComponent,
    ProfileComponent,
    LoginComponent,
]

@NgModule({
  declarations: [
    ...DeclarationsAndExports,
    ContactCardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MaterialImports,
    ButtonsModule,
  ],
  exports: [
    ...DeclarationsAndExports,
  ]
})
export class PagesModule { }
