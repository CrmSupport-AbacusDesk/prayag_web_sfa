import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerPlumberDetailComponent } from './consumer-plumber-detail.component';

describe('ConsumerPlumberDetailComponent', () => {
  let component: ConsumerPlumberDetailComponent;
  let fixture: ComponentFixture<ConsumerPlumberDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerPlumberDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerPlumberDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
