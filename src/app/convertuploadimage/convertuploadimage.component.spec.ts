import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertuploadimageComponent } from './convertuploadimage.component';

describe('ConvertuploadimageComponent', () => {
  let component: ConvertuploadimageComponent;
  let fixture: ComponentFixture<ConvertuploadimageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvertuploadimageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertuploadimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
