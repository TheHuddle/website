import { Component } from '@angular/core';

@Component({
  selector: 'huddle-task-legend',
  templateUrl: './component.html',
  styleUrls: ['./component.sass'],
})
export class TaskLegendComponent {
  readonly tasks = [
    {
      descriptionShort: 'Completed',
      completedOn: true,
      earnedPoints: '-',
      value: '-',
    },
    {
      descriptionShort: 'Available',
      completedOn: false,
      active: true,
      earnedPoints: '-',
      value: '-',
    },
    {
      descriptionShort: 'No longer available',
      completedOn: false,
      active: false,
      earnedPoints: '-',
      value: '-',
    },
  ];
}
