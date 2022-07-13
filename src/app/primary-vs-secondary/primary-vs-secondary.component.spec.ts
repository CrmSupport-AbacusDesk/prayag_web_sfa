import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryVsSecondaryComponent } from './primary-vs-secondary.component';

describe('PrimaryVsSecondaryComponent', () => {
  let component: PrimaryVsSecondaryComponent;
  let fixture: ComponentFixture<PrimaryVsSecondaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimaryVsSecondaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryVsSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
