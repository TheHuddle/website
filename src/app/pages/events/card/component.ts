import { Component, OnInit, Input } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'huddle-event-card',
  templateUrl: './component.html',
  styleUrls: ['./component.sass'],
})
export class EventCardComponent implements OnInit {
  @Input() event: any;
  @Input() historical: boolean = false;
  public readonly datestring = 'dddd MMMM D[<span class="mobile-hide">, ]YYYY[</span>] [<br>at] hh:mma';

  ngOnInit(): void {
	if (this.event && this.event.start && this.event.deadline) {
      this.event.start = moment(this.event.start).format(this.datestring);
      this.event.deadline = moment(this.event.deadline).format(this.datestring);
	}
  }
}
