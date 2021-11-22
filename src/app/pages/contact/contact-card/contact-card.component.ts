import { Component, Input } from '@angular/core';

@Component({
  selector: 'contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.sass']
})
export class ContactCardComponent {
  @Input() avatar: string = '';
  @Input() cover: string = '';

  @Input() first: string = '';
  @Input() last: string = '';
  @Input() pronouns: string = '';

  @Input() bio: string = '';

  @Input() discordLink: string = '';
  @Input() discordText: string = '';

  @Input() email: string = '';
}
