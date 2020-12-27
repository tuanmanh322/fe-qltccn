import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiNganSachComponent } from './loai-ngan-sach.component';

describe('LoaiNganSachComponent', () => {
  let component: LoaiNganSachComponent;
  let fixture: ComponentFixture<LoaiNganSachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaiNganSachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiNganSachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
