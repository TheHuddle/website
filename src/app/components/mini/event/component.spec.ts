import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniEventCardComponent } from './component';

describe('MiniEventCardComponent', () => {
  let component: MiniEventCardComponent;
  let fixture: ComponentFixture<MiniEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniEventCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
