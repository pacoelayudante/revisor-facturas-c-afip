import { TestBed } from '@angular/core/testing';

import { InfoAfipService } from './info-afip.service';

describe('InfoAfipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InfoAfipService = TestBed.get(InfoAfipService);
    expect(service).toBeTruthy();
  });
});
