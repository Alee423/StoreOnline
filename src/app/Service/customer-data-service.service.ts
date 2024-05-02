import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {

  constructor() { }
  private stripeCustomerIdSubject = new BehaviorSubject<string>('');
  stripeCustomerId$ = this.stripeCustomerIdSubject.asObservable();

  private customerEmailSubject = new BehaviorSubject<string>('');
  customerEmail$ = this.customerEmailSubject.asObservable();

  private customerNameSubject = new BehaviorSubject<string>('');
  customerName$ = this.customerNameSubject.asObservable();

  setStripeCustomerId(customerId: string) {
    this.stripeCustomerIdSubject.next(customerId);
  }

  setCustomerEmail(email: string) {
    this.customerEmailSubject.next(email);
  }

  setCustomerName(name: string) {
    this.customerNameSubject.next(name);
  }
}
