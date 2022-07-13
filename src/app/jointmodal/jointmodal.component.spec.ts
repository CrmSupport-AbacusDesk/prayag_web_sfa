import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JointmodalComponent } from './jointmodal.component';

describe('JointmodalComponent', () => {
  let component: JointmodalComponent;
  let fixture: ComponentFixture<JointmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JointmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JointmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
