import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDwrComponent } from './monthly-dwr.component';

describe('MonthlyDwrComponent', () => {
  let component: MonthlyDwrComponent;
  let fixture: ComponentFixture<MonthlyDwrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyDwrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyDwrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
