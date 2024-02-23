import { TestBed } from '@angular/core/testing';

import { StatsservService } from './statsserv.service';

describe('StatsservService', () => {
  let service: StatsservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatsservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
