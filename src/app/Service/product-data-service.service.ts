import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartItem } from '../cart-item';
import { Observable } from 'rxjs';
import { Invoice } from '../invoice';

export interface SalesData {
  date: Date;
  totalSales: number;
}
export interface StripeInvoice {
  customerId: string;
  amountDue: string;
  currency: string;
  id: string;
}
@Injectable({
  providedIn: 'root'
})

export class ProductDataService {
 


  private apiUrl = 'https://localhost:7250/api/Stripe';

  private apiUrl2 = 'https://localhost:7250/api/InvoiceReport/GenerateInvoiceReport';
 
  private apiUrl5 = 'https://localhost:7250/api/StoreOnline';
  
  constructor(private http:HttpClient) { }
 
 private productUrl = "https://localhost:7250/api/StoreOnline/GetProducts";
 private addToCartUrl =  "https://localhost:7250/api/StoreOnline/AddToCart";
 private getCartItemsUrl = "https://localhost:7250/api/StoreOnline/GetCarts";
 private addproduct = "https://localhost:7250/api/Stripe/product/add";
 


 
 getData() {
   return this.http.get(this.productUrl);
 }

 addToCart(cartItem: CartItem) {

   return this.http.post(this.addToCartUrl,cartItem);
 }

 getCartItems() {

   return this.http.get(this.getCartItemsUrl);
 }
 addCustomer(customerWrapper: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/customer/add`,customerWrapper);
 }

 Addtostripe(productData: any): Observable<any> {
  return this.http.post(this.addproduct, productData);
}
createInvoice(invoice: Invoice): Observable<any> { 
  return this.http.post(`${this.apiUrl}/invoice/add`,invoice);
}


addCreditCardToCustomer(customerId: string, cardDetails: any): Observable<boolean> {
  const url = `${this.apiUrl}/addCreditCardToCustomer`;

  return this.http.post<boolean>(url, { customerId, cardDetails });
}

addStripePayment(payment: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/payment/add`, payment);
}


generateInvoiceReport(customerEmail: string, customerName: string,invoiceNumber: string, amount: number): Observable<Blob> {
  const headers  = new HttpHeaders({ 'Content-Type': 'application/json' });
  const options = { headers, responseType: 'blob' as 'json' };
  const body = { customerEmail, customerName, invoiceNumber, amount };

  return this.http.post<Blob>(`${this.apiUrl2}?invoiceNumber=${invoiceNumber}&customerName=${customerName}&customerEmail=${customerEmail}&amount=${amount}`,body, options);
}

deleteAllItemsFromCart(customerId: string): Observable<any> {
  return this.http.delete(`${this.apiUrl5}/RemoveAllFromCart?customerId=${customerId}`);
} 

addCartItemWithCustomer(cartItem: CartItem, customerId: string): Observable<any> {
  const payload = {
    cartItem: cartItem,
    customerId: customerId,
  };

  return this.http.post(`${this.apiUrl}/add-cart-item`, payload,);
}

addtoCartData(cartItem: CartItem){
  return this.http.post(`${this.apiUrl5}/AddToCartdata`,cartItem)
}


getMonthlySales(): Observable<SalesData[]> {
  return this.http.get<SalesData[]>(`${this.apiUrl5}/GetMonthlySales`);
}

}
 