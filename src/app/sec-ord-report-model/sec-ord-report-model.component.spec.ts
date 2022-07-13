import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecOrdReportModelComponent } from './sec-ord-report-model.component';

describe('SecOrdReportModelComponent', () => {
  let component: SecOrdReportModelComponent;
  let fixture: ComponentFixture<SecOrdReportModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecOrdReportModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecOrdReportModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
