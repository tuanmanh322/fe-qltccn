import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiViEditComponent } from './loai-vi-edit.component';

describe('LoaiViEditComponent', () => {
  let component: LoaiViEditComponent;
  let fixture: ComponentFixture<LoaiViEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaiViEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiViEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
