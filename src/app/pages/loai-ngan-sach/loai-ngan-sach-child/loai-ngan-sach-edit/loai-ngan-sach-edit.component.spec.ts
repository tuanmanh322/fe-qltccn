import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiNganSachEditComponent } from './loai-ngan-sach-edit.component';

describe('LoaiNganSachEditComponent', () => {
  let component: LoaiNganSachEditComponent;
  let fixture: ComponentFixture<LoaiNganSachEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaiNganSachEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiNganSachEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
