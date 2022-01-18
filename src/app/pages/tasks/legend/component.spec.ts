import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { ApiService } from '@services/api';
import { TaskLegendComponent } from './component';

describe('TaskLegendComponent', () => {
  let component: TaskLegendComponent;
  let fixture: ComponentFixture<TaskLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskLegendComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});
