import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeListComponent } from './qr-code-list.component';

describe('QrCodeListComponent', () => {
  let component: QrCodeListComponent;
  let fixture: ComponentFixture<QrCodeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrCodeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrCodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
