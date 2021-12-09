import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { MatCardModule } from '@angular/material/card'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatTooltipModule } from '@angular/material/tooltip'

const MaterialImports = [
  MatCardModule,
  MatProgressBarModule,
  MatTooltipModule,
]

import { MiniEventCardComponent } from './event/component'


const DeclarationsAndExports = [
  MiniEventCardComponent,
]


@NgModule({
  declarations: [
    ...DeclarationsAndExports,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ...MaterialImports,
  ],
  exports: [
    ...DeclarationsAndExports,
  ]
})
export class MiniModule { }
