import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThuNhapCreateComponent } from './thu-nhap-create.component';

describe('ThuNhapCreateComponent', () => {
  let component: ThuNhapCreateComponent;
  let fixture: ComponentFixture<ThuNhapCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThuNhapCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThuNhapCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
