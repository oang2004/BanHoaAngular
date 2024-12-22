import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class CartService {
  private cartKey = 'cart_items';

  constructor() {}

  clearCart() {
    localStorage.removeItem('cart_items');
  }
  
  getCart() {
    const cart = localStorage.getItem('cart_items');
    return cart ? JSON.parse(cart) : [];
  }

  addToCart(product: any) {
    const cart = this.getCart();
    const item = cart.find((p: any) => p.product_id === product.product_id);
    if (item) {
      item.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    this.saveCart(cart);
  }

  removeFromCart(productId: number) {
    const cart = this.getCart().filter((p: any) => p.product_id !== productId);
    this.saveCart(cart);
  }

  saveCart(cart: any[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }
  
}
