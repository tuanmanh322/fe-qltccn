import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NganSachEditComponent } from './ngan-sach-edit.component';

describe('NganSachEditComponent', () => {
  let component: NganSachEditComponent;
  let fixture: ComponentFixture<NganSachEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NganSachEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NganSachEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
