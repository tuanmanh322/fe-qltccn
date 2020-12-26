import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiComponent } from './chi-phi.component';

describe('ChiPhiComponent', () => {
  let component: ChiPhiComponent;
  let fixture: ComponentFixture<ChiPhiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChiPhiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
