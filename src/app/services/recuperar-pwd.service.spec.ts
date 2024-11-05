import { TestBed } from '@angular/core/testing';

import { RecuperarPwdService } from './recuperar-pwd.service';

describe('RecuperarPwdService', () => {
  let service: RecuperarPwdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecuperarPwdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
