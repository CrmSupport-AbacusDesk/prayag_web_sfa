import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerLeadListComponent } from './consumer-lead-list.component';

describe('ConsumerLeadListComponent', () => {
  let component: ConsumerLeadListComponent;
  let fixture: ComponentFixture<ConsumerLeadListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerLeadListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerLeadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
