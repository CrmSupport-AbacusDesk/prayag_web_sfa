import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrDiscountComponent } from './dr-discount.component';

describe('DrDiscountComponent', () => {
  let component: DrDiscountComponent;
  let fixture: ComponentFixture<DrDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
