import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiViComponent } from './loai-vi.component';

describe('LoaiViComponent', () => {
  let component: LoaiViComponent;
  let fixture: ComponentFixture<LoaiViComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaiViComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiViComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
