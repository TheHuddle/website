import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatDialogModule } from '@angular/material/dialog'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

const MaterialImports = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatDialogModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
]

import { ButtonsModule } from '@components/buttons/module'
import { FilesModule } from '@components/files/module'

import { CodeOfConductComponent } from './code-of-conduct/component'
import { ContactCardComponent } from './contact/card/component'
import { ContactComponent } from './contact/component'
import { EventsComponent } from './events/component'
import { FirstLoginComponent } from './first-login/component'
import { HomeComponent } from './home/component'
import { LoginComponent } from './login/component'
import { PeopleComponent } from './people/component'
import { ProfileComponent } from './profile/component'

const DeclarationsAndExports = [
  CodeOfConductComponent,
  ContactComponent,
  EventsComponent,
  FirstLoginComponent,
  HomeComponent,
  LoginComponent,
  PeopleComponent,
  ProfileComponent,
]

@NgModule({
  declarations: [
    ContactCardComponent,
    ...DeclarationsAndExports,
    PeopleComponent,
    FirstLoginComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ...MaterialImports,
    ButtonsModule,
    FilesModule,
  ],
  exports: [
    ...DeclarationsAndExports,
  ]
})
export class PagesModule { }