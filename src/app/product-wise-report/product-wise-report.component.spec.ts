import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductWiseReportComponent } from './product-wise-report.component';

describe('ProductWiseReportComponent', () => {
  let component: ProductWiseReportComponent;
  let fixture: ComponentFixture<ProductWiseReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductWiseReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductWiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
