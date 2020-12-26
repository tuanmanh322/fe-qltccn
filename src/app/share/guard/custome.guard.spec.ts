import { TestBed } from '@angular/core/testing';

import { CustomeGuard } from './custome.guard';

describe('CustomeGuard', () => {
  let guard: CustomeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CustomeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
