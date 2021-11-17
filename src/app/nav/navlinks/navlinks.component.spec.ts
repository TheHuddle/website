import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavlinksComponent } from './navlinks.component';

describe('NavlinksComponent', () => {
  let component: NavlinksComponent;
  let fixture: ComponentFixture<NavlinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavlinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavlinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
