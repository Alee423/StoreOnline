import { Component } from '@angular/core';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: any[] = [];
  totalSum:number = 0;
  constructor() {}
  
   
  ngOnInit() {
    this.loadCartItemsFromLocalStorage();
  }

  loadCartItemsFromLocalStorage(): void {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.cartItems = storedCartItems;
    this.calculateTotalSum();
  }

  calculateTotalSum(): void {
    this.totalSum = 0;
    for (const item of this.cartItems) {
      this.totalSum += item.price; 
    }
  }

}




