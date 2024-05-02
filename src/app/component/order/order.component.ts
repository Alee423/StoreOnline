import { Component } from '@angular/core';
import { ProductDataService } from 'src/app/Service/product-data-service.service';
import { CustomerDataService } from 'src/app/Service/customer-data-service.service';
import { SharedInvoiceDataService } from 'src/app/Service/shared-invoice-data-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';


export interface SalesData {
  date: Date;
  totalSales: number;
}


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  cartItems: any[] = [];
  totalSum: number = 0;

  payment = {
    amount: 0,
    currency: 'NZD',
    customerId: '',

  };

  invoiceNumber: string = '';

  alertVisible: boolean = false;

  constructor(private productService: ProductDataService,
              private customerDataService: CustomerDataService,
              private sharedInvoiceDataService: SharedInvoiceDataService,
              private toastr:ToastrService,
              private router : Router) {}

  ngOnInit() {

    this.productService.getCartItems().subscribe((data: any) => {
      this.cartItems = data;
      this.calculateTotalSum(); 
      
    });
    
    this.customerDataService.stripeCustomerId$.subscribe((customerId: string) => {
      this.payment.customerId = customerId;
    });
  }
  
     
  addStripePayment() {

    this.calculateTotalSum();

    this.productService.addStripePayment(this.payment).subscribe(
      (result: any) => {
    console.log('Payment successful:', result);

     this.deleteCartItems(); 
     
     this.removeCustomerIdFromLocalStorage();

     this.generateInvoiceReport();


     this.showNotification('Payment successful');
      },
      (error: any) => {
      console.error('Payment error:', error);
      this.showNotification('Failed Payment error');
      }
    );

    this.router.navigate(['/']);

  }

  showNotification(message: string): void {
    this.toastr.success(message, 'Success', { timeOut: 1000 });
  }
  

  calculateTotalSum() {
    this.totalSum = this.cartItems.reduce((sum, item) => sum + item.price, 0);
    this.payment.amount = this.totalSum;
  }

  deleteCartItems() {

    const customerId = this.payment.customerId;
    this.productService.deleteAllItemsFromCart(customerId).subscribe(
      () => {
        console.log('All cart items deleted successfully');
        this.removeFromLocalStorage('cartItems');
      },
      (error: any) => {
        console.error('Error deleting cart items:', error);
      }
    );
  }

  generateReport(invoiceNumber: string, customerEmail: string, customerName: string, amount: number) {

    this.productService.generateInvoiceReport(customerEmail, customerName, invoiceNumber, amount).subscribe((blob: Blob) => {
        const file = new Blob([blob], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL); 
      },
      (error: any) => {
        console.error('Error generating invoice report:', error);
      }
    );
  } 

  generateInvoiceReport() {
    // Combine the observables to wait for all values
    combineLatest([
      this.customerDataService.customerEmail$,
      this.customerDataService.customerName$,
      this.sharedInvoiceDataService.currentInvoiceId
    ]).subscribe(([customerEmail, customerName, invoiceId]) => {
      const amount = this.payment.amount; // Assuming payment.amount is what you want to use
  
      if (customerEmail && customerName && invoiceId) {
        // Call the generateReport function with dynamically obtained values
        this.generateReport(invoiceId, customerEmail, customerName, amount);
      } else {
        console.error('Unable to generate invoice report. Some information is missing.');
      }
    });
  }
  

  removeFromLocalStorage(key: string): void {

   localStorage.removeItem(key);
}

removeCustomerIdFromLocalStorage(): void {

  localStorage.removeItem('CustomerId');
}


}
