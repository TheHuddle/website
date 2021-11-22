import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { MatSidenavModule } from '@angular/material/sidenav'

const MaterialImports = [
  MatSidenavModule,
];

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { NavModule }   from '@nav/nav.module'
import { PagesModule } from '@pages/pages.module'


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    ...MaterialImports,
    AppRoutingModule,
    NavModule,
    PagesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
