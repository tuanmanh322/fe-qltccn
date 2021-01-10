import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiViCreateComponent } from './loai-vi-create.component';

describe('LoaiViCreateComponent', () => {
  let component: LoaiViCreateComponent;
  let fixture: ComponentFixture<LoaiViCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaiViCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiViCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
