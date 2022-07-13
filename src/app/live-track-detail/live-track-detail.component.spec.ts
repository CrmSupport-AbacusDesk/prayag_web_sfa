import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveTrackDetailComponent } from './live-track-detail.component';

describe('LiveTrackDetailComponent', () => {
  let component: LiveTrackDetailComponent;
  let fixture: ComponentFixture<LiveTrackDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveTrackDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveTrackDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
