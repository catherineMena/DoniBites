import { TestBed } from '@angular/core/testing';

import { OutgoingsService } from './outgoings.service';

describe('OutgoingsService', () => {
  let service: OutgoingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutgoingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
