import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdminModelComponent } from './update-admin-model.component';

describe('UpdateAdminModelComponent', () => {
  let component: UpdateAdminModelComponent;
  let fixture: ComponentFixture<UpdateAdminModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAdminModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAdminModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
