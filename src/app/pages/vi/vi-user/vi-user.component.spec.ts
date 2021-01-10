import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViUserComponent } from './vi-user.component';

describe('ViUserComponent', () => {
  let component: ViUserComponent;
  let fixture: ComponentFixture<ViUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
