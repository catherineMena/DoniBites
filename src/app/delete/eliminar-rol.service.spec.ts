import { TestBed } from '@angular/core/testing';

import { EliminarRolService } from './eliminar-rol.service';

describe('EliminarRolService', () => {
  let service: EliminarRolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EliminarRolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
