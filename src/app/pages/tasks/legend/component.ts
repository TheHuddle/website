import { Component, Output, Input, OnChanges, SimpleChanges, EventEmitter} from '@angular/core';

@Component({
  selector: 'huddle-task-legend',
  templateUrl: './component.html',
  styleUrls: ['./component.sass'],
})
export class TaskLegendComponent implements OnChanges{
  @Output() selectedTaskType = new EventEmitter<object>();
  @Input() taskTypeScores : any[] = [];
  selected: number = -1; // Don't auto-select a category

  ngOnChanges(changes: SimpleChanges) {
    let taskScores = changes['taskTypeScores']['currentValue'];
    this.setScores(taskScores);
  }

  tasks: any[] = [
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
      value: '-'
    },
    {
      descriptionShort: 'Unavailable',
      completedOn: false,
      active: false,
      earnedPoints: '-',
      value: '-'
    },
  ];

  public setSelector(i : number) {
    this.selected = i;
    this.selectedTaskType.emit(this.tasks[i]);
  }

  public setScores(scores : any[]) {
    scores.map((function (obj : any) {
      function setScore(taskScore : any) {
        const index = obj.tasks.findIndex((task) => task.descriptionShort == taskScore.descriptionShort);
        obj.tasks[index].value = taskScore.value; 
        obj.tasks[index].earnedPoints = taskScore.earnedPoints; 
      }
      return setScore;
    })(this));
  }
}
