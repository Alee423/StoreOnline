import { CartItem } from "./cart-item";

export class Customer {
  email: string = '';
    name: string = '';
    phone: string = '';
    cartItem: CartItem | null = null;
}
