import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlumberDetailComponent } from './plumber-detail.component';

describe('PlumberDetailComponent', () => {
  let component: PlumberDetailComponent;
  let fixture: ComponentFixture<PlumberDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlumberDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlumberDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
