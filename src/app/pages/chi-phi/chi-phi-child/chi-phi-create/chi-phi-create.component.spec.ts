import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiCreateComponent } from './chi-phi-create.component';

describe('ChiPhiCreateComponent', () => {
  let component: ChiPhiCreateComponent;
  let fixture: ComponentFixture<ChiPhiCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChiPhiCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
