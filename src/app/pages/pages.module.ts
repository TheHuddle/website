import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { CodeOfConductComponent } from './code-of-conduct/code-of-conduct.component';


@NgModule({
  declarations: [
    HomeComponent,
    EventsComponent,
    ContactComponent,
    ProfileComponent,
    CodeOfConductComponent,
  ],
  imports: [
    CommonModule,
    HomeComponent,
  ],
  exports: []
})
export class PagesModule { }
