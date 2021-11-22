import { Component, Input } from '@angular/core';

import { environment } from '@environment';

@Component({
  selector: 'mat-discord-button',
  templateUrl: './discord.component.html',
  styleUrls: ['./discord.component.sass']
})
export class DiscordComponent {
  @Input() public link: string = environment.discordLink;
  @Input() public text: string = ''
}
