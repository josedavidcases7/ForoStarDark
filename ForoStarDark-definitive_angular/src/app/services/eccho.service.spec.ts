import { TestBed } from '@angular/core/testing';

import { EcchoService } from './eccho.service';

describe('EcchoService', () => {
  let service: EcchoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcchoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
