import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityreportComponent } from './activityreport.component';

describe('ActivityreportComponent', () => {
  let component: ActivityreportComponent;
  let fixture: ComponentFixture<ActivityreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
