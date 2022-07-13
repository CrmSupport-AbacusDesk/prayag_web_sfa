import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemRequestListComponent } from './redeem-request-list.component';

describe('RedeemRequestListComponent', () => {
  let component: RedeemRequestListComponent;
  let fixture: ComponentFixture<RedeemRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedeemRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
