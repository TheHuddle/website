import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

const MaterialImports = [
  MatIconModule,
  MatTooltipModule,
  MatButtonModule,
]

import { DiscordComponent } from './discord/discord.component';

const DeclarationsAndExports = [
    DiscordComponent,
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
  ],
})
export class ButtonsModule { }
