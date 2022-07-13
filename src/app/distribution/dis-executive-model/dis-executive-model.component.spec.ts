import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisExecutiveModelComponent } from './dis-executive-model.component';

describe('DisExecutiveModelComponent', () => {
  let component: DisExecutiveModelComponent;
  let fixture: ComponentFixture<DisExecutiveModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisExecutiveModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisExecutiveModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
