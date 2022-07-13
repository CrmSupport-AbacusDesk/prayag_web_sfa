import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlumberEditModelComponent } from './plumber-edit-model.component';

describe('PlumberEditModelComponent', () => {
  let component: PlumberEditModelComponent;
  let fixture: ComponentFixture<PlumberEditModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlumberEditModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlumberEditModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
