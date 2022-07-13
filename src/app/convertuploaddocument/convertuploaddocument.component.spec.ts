import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertuploaddocumentComponent } from './convertuploaddocument.component';

describe('ConvertuploaddocumentComponent', () => {
  let component: ConvertuploaddocumentComponent;
  let fixture: ComponentFixture<ConvertuploaddocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvertuploaddocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertuploaddocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
