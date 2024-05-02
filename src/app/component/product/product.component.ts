import { Component,OnInit } from '@angular/core';
import { ProductDataService } from 'src/app/Service/product-data-service.service';
import { CartItem } from 'src/app/cart-item';
import { ToastrService } from 'ngx-toastr';
import { Chart, registerables } from 'chart.js'; // Import Chart and registerables from 'chart.js'

Chart.register(...registerables); // Register necessary components

// import { Chart } from 'chart.js';
export interface SalesData {
  date: Date;
  totalSales: number;
}


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit  { 
  products:any [] = [];
  badgeValue: number = 0;
  searchTerm: string = '';
  searchResults: any[] = [];
  alertVisible: boolean = false;

  salesData!: any[];

  constructor(private prodata:ProductDataService,
               private toastr: ToastrService) {
          this.prodata.getData().subscribe((data:any)=>{
          this.products = data;

          this.searchResults = [...this.products];
        })
      }

  ngOnInit(): void {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        this.badgeValue = storedCartItems.length; 
  }
  
   searchProducts(): void {
        this.searchResults = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }

   addToCart(cartItem: CartItem) {
        this.prodata.addToCart(cartItem).subscribe((response: any) => {
          console.log("Successfully added to cart:", response);

          this.updateBadgeValue(this.badgeValue + 1);

          this.showNotification('Added to cart successfully');
          this.addtoCartData(cartItem);

          this.addToLocalStorage(cartItem);
        }, (error: any) => {
          console.error("Error adding to cart:", error);
          this.showNotification('Failed to add to cart');
        });
      }

   updateBadgeValue(newValue: number): void {
      this.badgeValue = newValue;
      }
    
   showNotification(message: string): void {
      this.toastr.success(message, 'Success', { timeOut: 1000 });
      }

   addToLocalStorage(cartItem:CartItem): void {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        cartItems.push(cartItem);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }

   addtoCartData(cartItem: CartItem){
       this.prodata.addtoCartData(cartItem).subscribe((response:any)=>{
       console.log("Successfully added to cartdata:", response);  
        });
      }
      
   Addtostripe(productData:any){
        this.prodata.Addtostripe(productData).subscribe((response: any) => {
         if (response) {
          console.log("Added to stripe", response);
          } else {
            console.error("Response is null or undefined");
          }
        });
      }
      fetchDataAndRenderChart() {
        this.prodata.getMonthlySales().subscribe(data => {
          this.salesData = data;
          console.log(data);
          this.renderChart();
        });
      }   
      
    
     renderChart() {
  const months = this.salesData.map(sales => new Date(sales.date)); // Parse date strings into Date objects
  const sales = this.salesData.map(sales => sales.totalSales);

  new Chart('canvas', {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: 'Monthly Sales',
        data: sales,
        borderColor: 'rgb(75, 192, 192)',
        fill: false
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Monthly Sales'
        }
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'month'
          }
        },
        y: {
          beginAtZero: true, // Add this line if you want the y-axis to start at zero
          title: {
            display: true,
            text: 'Sales'
          }
        }
      }
    }
  });
}

    
      
    }