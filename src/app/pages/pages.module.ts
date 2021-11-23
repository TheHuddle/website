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

import { ButtonsModule } from '@components/buttons/buttons.module'

import { CodeOfConductComponent } from './code-of-conduct/code-of-conduct.component'
import { ContactCardComponent } from './contact/contact-card/contact-card.component'
import { ContactComponent } from './contact/contact.component'
import { EventsComponent } from './events/events.component'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { PeopleComponent } from './people/people.component';
import { ProfileComponent } from './profile/profile.component'

const DeclarationsAndExports = [
    CodeOfConductComponent,
    ContactComponent,
    EventsComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
]

@NgModule({
  declarations: [
    ContactCardComponent,
    ...DeclarationsAndExports,
    PeopleComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ...MaterialImports,
    ButtonsModule,
  ],
  exports: [
    ...DeclarationsAndExports,
  ]
})
export class PagesModule { }
