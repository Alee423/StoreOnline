import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './component/product/product.component';
import { CartComponent } from './component/cart/cart.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { OrderComponent } from './component/order/order.component';
const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  {path: 'product', component:ProductComponent},
  { path: 'checkout', component: CheckoutComponent },
  {path: 'add-customer', component: OrderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
