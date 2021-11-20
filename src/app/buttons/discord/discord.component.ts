import { Component } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'mat-discord-button',
  templateUrl: './discord.component.html',
  styleUrls: ['./discord.component.sass']
})
export class DiscordComponent {
  public link: string = environment.discordLink;
}
