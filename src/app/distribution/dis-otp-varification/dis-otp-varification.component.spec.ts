import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisOtpVarificationComponent } from './dis-otp-varification.component';

describe('DisOtpVarificationComponent', () => {
  let component: DisOtpVarificationComponent;
  let fixture: ComponentFixture<DisOtpVarificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisOtpVarificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisOtpVarificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
