import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerLeadListComponent } from './dealer-lead-list.component';

describe('DealerLeadListComponent', () => {
  let component: DealerLeadListComponent;
  let fixture: ComponentFixture<DealerLeadListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerLeadListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerLeadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
