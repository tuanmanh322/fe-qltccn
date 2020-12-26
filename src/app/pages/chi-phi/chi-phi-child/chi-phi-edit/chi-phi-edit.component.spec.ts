import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiEditComponent } from './chi-phi-edit.component';

describe('ChiPhiEditComponent', () => {
  let component: ChiPhiEditComponent;
  let fixture: ComponentFixture<ChiPhiEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChiPhiEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
