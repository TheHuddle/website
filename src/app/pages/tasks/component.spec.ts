import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { ApiService } from '@services/api';
import { TasksComponent } from './component';

import * as moment from 'moment';

function createTask(isValid = true) {
  return {
    id: ~~(Math.random() * 9999999),
    multiplier: Math.random() * 2,
    value: ~~(Math.random() * 100),
    event: {
      title: 'The Most Amazing Event',
      start: moment().add(isValid ? -1 : 10, 'days'),
      deadline: moment().add(isValid ? 1 : 11, 'days'),
    },
  };
}

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ApiService,
          useValue: {
            query: () => of([1]),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should not append inactive tasks', () => {
    const tasks = [createTask(true), createTask(true), createTask(false)];

    component.setTaskData({ Task: tasks });
    const hasTask = (i) => {
      return component.tasks.find((t) => t.id === tasks[i].id);
    };

    expect(component.tasks.length).toEqual(2);
    expect(hasTask(0)).toBeTruthy();
    expect(hasTask(1)).toBeTruthy();
    expect(hasTask(2)).toBeFalsy();
  });
});
