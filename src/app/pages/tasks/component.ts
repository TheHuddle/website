import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

import { ApiService } from '@services/api';

@Component({
  selector: 'app-tasks',
  templateUrl: './component.html',
  styleUrls: ['./component.sass'],
})
export class TasksComponent implements OnInit {
  score = 0;
  initialTasks: any[] = [];
  tasks: any[] = [];
  completedTasks: any[] = [];
  taskTypeFilters: any = {
    "Completed": (task : any) : boolean => { return Boolean(task.completedOn); },
    "Available": (task : any) : boolean => { return Boolean(task.active); },
    "Unavailable": (task : any) : boolean => { return !Boolean(task.active); }
  };
  taskScores: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getTaskData();
  }

  private getTaskData() {
    const query = `
    query {
      users_me {
        tasks {
          task { id }
          completed_on
          multiplier
        }
      }
    }
    `;
    const options = { isSystemQuery: true };
    this.api.query(query, options).subscribe((response) => {
      this.setCompletedTaskData(response.data);
      this.getTasks();
    });
  }

  private getTasks() {
    const query = `
    query {
      Task {
        id
        repeatable
        value
        description_short
        description
        hidden
        event {
          title
          start
          deadline
        }
      }
    }
    `;

    this.api
      .query(query)
      .subscribe((response) => {
        this.setTaskData(response.data);

        this.taskScores = Object.keys(this.taskTypeFilters).map((function(obj : any) {
          function getTask(taskType : string) {
            const filtered = obj.filterByTaskType(taskType);
            return {
              descriptionShort: taskType,
              earnedPoints: filtered.reduce((acc, x) => x.earnedPoints + acc, 0),
              value: filtered.reduce((acc, x) => x.value + acc, 0),
            }
          }
          return getTask;
        })(this));
      });
  }

  private filterByTaskType(taskType : string) {
    return this.initialTasks.filter(this.taskTypeFilters[taskType]);
  }

  private setCompletedTaskData(data) {
    if (!data.users_me) return;
    data.users_me.tasks.map((task) => {
      this.completedTasks.push({
        id: task.task.id,
        multiplier: task.multiplier,
        completedOn: task.completed_on,
      });
    });
  }

  private setTaskData(data) {
    const today = moment();
    data.Task.map((task) => {
      task.active = true;

      if (task.event) {
        task.start = moment(task.event.start);
        task.deadline = moment(task.event.deadline);
        if (today < task.start || today >= task.deadline) {
          task.active = false;
        }
        task.event = task.event.title;
      }

      task.earnedPoints = 0;
      const completed = this.completedTasks.find((t) => t.id === task.id);
      if (completed) {
        task.completedOn = completed.completedOn;
        task.earnedPoints = Math.round(task.value * completed.multiplier);
        if (completed.multiplier != 1) {
          task.multiplier = `x${completed.multiplier}`;
        } else {
          task.multiplier = 'complete';
        }
        this.score += task.earnedPoints;
      }

      task.descriptionShort = task.description_short;
      delete task.description_short;

      task.value = Math.round(task.value);

      this.tasks.push({ ...task });
      this.initialTasks.push({ ...task });
    });

    console.log(this.tasks);
  }

  public setTaskType(taskType: any) {
    this.tasks = this.filterByTaskType(taskType.descriptionShort)
                     .sort(
          (taskA : any, taskB : any) : number => { 
            // Sort first by earned points
            let ret = taskB.earnedPoints - taskA.earnedPoints;
            if (ret == 0) {
              // Then by total possble points
              ret = taskB.value - taskA.value;
            }
            return ret;
          });

    if (this.tasks.length == 0) {
      this.tasks = [{
          "active": false,
          "descriptionShort": "No Results"
        }
      ]
    }
  }
}
