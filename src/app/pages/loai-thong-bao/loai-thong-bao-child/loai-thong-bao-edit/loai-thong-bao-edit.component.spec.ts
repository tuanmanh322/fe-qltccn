import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiThongBaoEditComponent } from './loai-thong-bao-edit.component';

describe('LoaiThongBaoEditComponent', () => {
  let component: LoaiThongBaoEditComponent;
  let fixture: ComponentFixture<LoaiThongBaoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaiThongBaoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiThongBaoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
