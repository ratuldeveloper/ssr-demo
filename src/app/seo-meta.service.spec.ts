import { TestBed } from '@angular/core/testing';

import { SeoMetaService } from './seo-meta.service';

describe('SeoMetaService', () => {
  let service: SeoMetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoMetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
