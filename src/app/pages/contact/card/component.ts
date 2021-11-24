import { Component, Input } from '@angular/core';

@Component({
  selector: 'contact-card',
  templateUrl: './component.html',
  styleUrls: ['./component.sass']
})
export class ContactCardComponent {
  @Input() card: any = {};
}
