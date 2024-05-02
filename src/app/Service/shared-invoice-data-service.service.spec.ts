import { TestBed } from '@angular/core/testing';

import { SharedInvoiceDataServiceService } from './shared-invoice-data-service.service';

describe('SharedInvoiceDataServiceService', () => {
  let service: SharedInvoiceDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedInvoiceDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
