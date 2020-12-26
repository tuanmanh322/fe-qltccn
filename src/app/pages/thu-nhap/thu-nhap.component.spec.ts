import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThuNhapComponent } from './thu-nhap.component';

describe('ThuNhapComponent', () => {
  let component: ThuNhapComponent;
  let fixture: ComponentFixture<ThuNhapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThuNhapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThuNhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
