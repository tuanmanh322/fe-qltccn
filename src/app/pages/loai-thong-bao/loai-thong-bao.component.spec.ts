import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiThongBaoComponent } from './loai-thong-bao.component';

describe('LoaiThongBaoComponent', () => {
  let component: LoaiThongBaoComponent;
  let fixture: ComponentFixture<LoaiThongBaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaiThongBaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiThongBaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
