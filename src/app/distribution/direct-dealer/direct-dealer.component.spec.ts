import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectDealerComponent } from './direct-dealer.component';

describe('DirectDealerComponent', () => {
  let component: DirectDealerComponent;
  let fixture: ComponentFixture<DirectDealerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectDealerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
