import { Component, Input, OnInit } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'huddle-mini-event',
  templateUrl: './component.html',
  styleUrls: ['./component.sass']
})
export class MiniEventCardComponent implements OnInit {
  @Input() event
  private readonly datestring = 'MM/DD/YYYY'

  ngOnInit() {
    this.event.start = moment(this.event.start).format(this.datestring);
    this.event.deadline = moment(this.event.deadline).format(this.datestring);
  }
}
