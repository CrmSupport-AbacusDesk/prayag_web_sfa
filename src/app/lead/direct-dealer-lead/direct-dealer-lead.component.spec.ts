import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectDealerLeadComponent } from './direct-dealer-lead.component';

describe('DirectDealerLeadComponent', () => {
  let component: DirectDealerLeadComponent;
  let fixture: ComponentFixture<DirectDealerLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectDealerLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectDealerLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
