import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: false,
  
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  constructor(private cartService: CartService) { 
    this.loadCart();
  }

  ngOnInit(): void {
    this.cartItems.forEach((item) => {
      item.subtotal = parseInt(item.product_price.replace(/[^\d.-]/g, '')) * parseInt(item.quantity);
    });
    this.calculateTotalAmount();
    
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCart();
  }
  deleteFromCart(item: any): void {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
      this.cartService.removeFromCart(item.product_id);
      this.loadCart();
    }
  }
  updateSubtotal(item: any): void {
    item.subtotal = parseInt(item.product_price.replace(/[^\d.-]/g, '')) * parseInt(item.quantity);
    
    this.cartService.saveCart(this.cartItems);
    this.calculateTotalAmount(); 
  }
  calculateTotalAmount(): void {
    this.totalAmount = this.cartItems.reduce((total, item) => {
      return total + (parseInt(item.product_price.replace(/[^\d.-]/g, '')) * parseInt(item.quantity));
    }, 0);
  }
  continueShopping(): void {
    console.log('Đi tới trang sản phẩm');
  }
  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
  }
  checkout(): void {
    console.log('Đi đến trang thanh toán');
  }
  editItem(item: any): void {
    console.log('Chỉnh sửa sản phẩm:', item);
  }
}