import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionLegderModelComponent } from './distribution-legder-model.component';

describe('DistributionLegderModelComponent', () => {
  let component: DistributionLegderModelComponent;
  let fixture: ComponentFixture<DistributionLegderModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributionLegderModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributionLegderModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
