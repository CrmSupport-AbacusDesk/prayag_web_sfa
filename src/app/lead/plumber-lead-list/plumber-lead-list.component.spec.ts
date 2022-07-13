import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlumberLeadListComponent } from './plumber-lead-list.component';

describe('PlumberLeadListComponent', () => {
  let component: PlumberLeadListComponent;
  let fixture: ComponentFixture<PlumberLeadListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlumberLeadListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlumberLeadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
