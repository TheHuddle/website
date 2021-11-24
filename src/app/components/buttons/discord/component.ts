import { Component, Input } from '@angular/core';

import { environment } from '@environment';

@Component({
  selector: 'mat-discord-button',
  templateUrl: './component.html',
  styleUrls: ['./component.sass']
})
export class DiscordButtonComponent {
  @Input() public link: string = environment.discordLink;
  @Input() public text: string = ''
}
