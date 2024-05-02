import { Component } from '@angular/core';
import { ProductDataService } from 'src/app/Service/product-data-service.service';
import { Customer } from 'src/app/customer';
import { Invoice } from 'src/app/invoice';
import { Router } from '@angular/router';
import { CustomerDataService } from 'src/app/Service/customer-data-service.service';
import { SharedInvoiceDataService } from 'src/app/Service/shared-invoice-data-service.service';


@Component({
  selector: 'app-checkout',       
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
 
  customerWrapper: any = {
    customer: {
      email: '',
      name: '',
      phone: '',
    
    },
    cartItems: []
  };
 
  invoice: Invoice = {
    CustomerId: '',
    CustomerName: '',
    CustomerEmail: '',
    CustomerPhone: '',
    InvoiceId: '',
    AmountDue: '',
    Currency: '',

  };
 


 constructor(private productdata: ProductDataService,
             private router : Router,
             private customerDataService: CustomerDataService,
             private sharedInvoiceDataService: SharedInvoiceDataService) {}

 
 addCustomer() {

  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  this.customerWrapper.cartItems = cartItems;

  this.productdata.addCustomer(this.customerWrapper).subscribe(
   (customerResponse: any) => {
  console.log('Customer added successfully. Customer ID:', customerResponse.stripeCustomerId);
  this.addToLocalStorage('customerId', customerResponse.stripeCustomerId)
  
  this.customerDataService.setStripeCustomerId(customerResponse.stripeCustomerId);
  this.customerDataService.setCustomerEmail(customerResponse.customerEmail);
  this.customerDataService.setCustomerName(customerResponse.customerName);
  
 


  this.invoice.CustomerId = customerResponse.stripeCustomerId;
     
      this.customerWrapper.customer.name = '';  
      this.customerWrapper.customer.email = '';
      this.customerWrapper.customer.phone = '';

    this.addCartItemWithCustomer();
   // Now, create the invoice after adding the customer
    this.createInvoice();
    this.router.navigate(['/add-customer']);
    },   
    (customerError: any) => {
      console.error('Failed to add customer:', customerError);
    }
  );
}

addToLocalStorage(key:string, Value:string): void {

  const   CusId = JSON.parse(localStorage.getItem('CustomerId') || '{}');
  CusId[key] = Value;
  localStorage.setItem('CustomerId',JSON.stringify(CusId));

}

addCartItemWithCustomer() {

  const customerId = JSON.parse(localStorage.getItem('CustomerId') || '{}');
   this.customerWrapper.cartItems.forEach((cartItem: any) => {
   this.productdata.addCartItemWithCustomer(cartItem, customerId).subscribe(
      (response: any) => {
        console.log('Cart item added successfully:', response);
      },
      (error: any) => {
        console.error('Error adding cart item:', error);
      }
    );
  });
}
    
createInvoice() {

  this.productdata.createInvoice(this.invoice).subscribe(
    (invoiceResponse: any) => {
      console.log('Invoice created successfully. Invoice ID:', invoiceResponse.invoiceId);
      this.sharedInvoiceDataService.setInvoiceId(invoiceResponse.invoiceId);
    },
    (invoiceError: any) => {
      console.error('Failed to create invoice:', invoiceError);
    }
  );
}
}


