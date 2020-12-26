import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NganSachCreateComponent } from './ngan-sach-create.component';

describe('NganSachCreateComponent', () => {
  let component: NganSachCreateComponent;
  let fixture: ComponentFixture<NganSachCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NganSachCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NganSachCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
