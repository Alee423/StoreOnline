import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedInvoiceDataService {
  private invoiceIdSource = new BehaviorSubject<string>('');
  currentInvoiceId = this.invoiceIdSource.asObservable();

  setInvoiceId(invoiceId: string) {
    this.invoiceIdSource.next(invoiceId);
  }
}
