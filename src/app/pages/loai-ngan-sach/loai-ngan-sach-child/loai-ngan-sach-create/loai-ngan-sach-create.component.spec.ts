import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiNganSachCreateComponent } from './loai-ngan-sach-create.component';

describe('LoaiNganSachCreateComponent', () => {
  let component: LoaiNganSachCreateComponent;
  let fixture: ComponentFixture<LoaiNganSachCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaiNganSachCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiNganSachCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
