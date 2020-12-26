import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NganSachComponent } from './ngan-sach.component';

describe('NganSachComponent', () => {
  let component: NganSachComponent;
  let fixture: ComponentFixture<NganSachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NganSachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NganSachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
