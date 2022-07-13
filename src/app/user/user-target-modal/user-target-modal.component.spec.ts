import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTargetModalComponent } from './user-target-modal.component';

describe('UserTargetModalComponent', () => {
  let component: UserTargetModalComponent;
  let fixture: ComponentFixture<UserTargetModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTargetModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTargetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
