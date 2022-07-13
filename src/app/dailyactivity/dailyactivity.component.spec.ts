import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyactivityComponent } from './dailyactivity.component';

describe('DailyactivityComponent', () => {
  let component: DailyactivityComponent;
  let fixture: ComponentFixture<DailyactivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyactivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
