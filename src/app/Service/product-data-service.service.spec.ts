import { TestBed } from '@angular/core/testing';

import { ProductDataServiceService } from './product-data-service.service';

describe('ProductDataServiceService', () => {
  let service: ProductDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
