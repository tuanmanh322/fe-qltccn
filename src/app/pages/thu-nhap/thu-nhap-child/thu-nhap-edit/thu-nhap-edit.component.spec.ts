import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThuNhapEditComponent } from './thu-nhap-edit.component';

describe('ThuNhapEditComponent', () => {
  let component: ThuNhapEditComponent;
  let fixture: ComponentFixture<ThuNhapEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThuNhapEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThuNhapEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
