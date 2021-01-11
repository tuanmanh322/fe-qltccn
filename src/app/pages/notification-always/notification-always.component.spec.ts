import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationAlwaysComponent } from './notification-always.component';

describe('NotificationAlwaysComponent', () => {
  let component: NotificationAlwaysComponent;
  let fixture: ComponentFixture<NotificationAlwaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationAlwaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationAlwaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
