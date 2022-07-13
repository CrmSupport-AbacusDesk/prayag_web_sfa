import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeModelComponent } from './qr-code-model.component';

describe('QrCodeModelComponent', () => {
  let component: QrCodeModelComponent;
  let fixture: ComponentFixture<QrCodeModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrCodeModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrCodeModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
