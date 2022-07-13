import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistriutorSalesReportComponent } from './distriutor-sales-report.component';

describe('DistriutorSalesReportComponent', () => {
  let component: DistriutorSalesReportComponent;
  let fixture: ComponentFixture<DistriutorSalesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistriutorSalesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistriutorSalesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
