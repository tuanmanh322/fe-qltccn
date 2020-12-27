import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiThongBaoCreateComponent } from './loai-thong-bao-create.component';

describe('LoaiThongBaoCreateComponent', () => {
  let component: LoaiThongBaoCreateComponent;
  let fixture: ComponentFixture<LoaiThongBaoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaiThongBaoCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiThongBaoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
