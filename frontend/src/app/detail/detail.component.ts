import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-detail',
  standalone: false,
  
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  product: any = {}; 

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.params['id'];
    this.productService.getProducts(productId).subscribe(
      (response) => {
        if (response) {
          this.product = response; 
        } else {
          console.error('Không tìm thấy sản phẩm');
        }
      },
      (error) => {
        console.error('Lỗi khi tải sản phẩm:', error);
      }
    );
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    alert(`Bạn đã thêm sản phẩm vào giỏ hàng!`);
  }
}