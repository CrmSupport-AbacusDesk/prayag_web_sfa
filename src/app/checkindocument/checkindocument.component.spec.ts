import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckindocumentComponent } from './checkindocument.component';

describe('CheckindocumentComponent', () => {
  let component: CheckindocumentComponent;
  let fixture: ComponentFixture<CheckindocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckindocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckindocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
