import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NavbarComponent } from './navbar/navbar.component';
import { NavlinksComponent } from './navlinks/navlinks.component';


const MaterialImports = [
  MatToolbarModule,
  MatIconModule,
  MatTabsModule,
  MatTooltipModule,
  MatButtonModule,
]

const DeclarationsAndExports = [
    NavbarComponent,
    NavlinksComponent,
]

@NgModule({
  declarations: [
    ...DeclarationsAndExports,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ...MaterialImports,
  ],
  exports: [
    ...DeclarationsAndExports,
  ],
})
export class NavModule { }
