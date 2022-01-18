import { Component, Input } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'huddle-task-card',
  templateUrl: './component.html',
  styleUrls: ['./component.sass'],
})
export class TaskCardComponent {
  @Input() task: any;
}
