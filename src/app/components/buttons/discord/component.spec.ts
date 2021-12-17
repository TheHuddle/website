import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DiscordButtonComponent } from './component'

describe('DiscordButtonComponent', () => {
  let component: DiscordButtonComponent;
  let fixture: ComponentFixture<DiscordButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscordButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscordButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
