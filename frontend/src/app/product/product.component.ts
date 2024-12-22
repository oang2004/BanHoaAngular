import { Component, inject, OnInit } from '@angular/core';
import { ApiSanPhamLoai, productCategory } from '../models/loaiSP.model';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Params } from '@angular/router';
import { CartService } from '../services/cart.service';
import { LoaiSPService } from '../services/loai-sp.service';

@Component({
  selector: 'app-product',
  standalone: false,
  
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  cartService = inject(CartService);
  categoryName: any;
  categoryID: any; 
  dataProduct: productCategory[] = [];
 
  products = [
    
  ];
  constructor(
    private productService: ProductsService,
    private carService: CartService,
    private route: ActivatedRoute,
    private pros: LoaiSPService,) {}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {  
      this.categoryName = params['category'];  
      this.categoryID = params['categoryID'];
      if(this.categoryID == null ){
      this.categoryID = 0;
      }
      this.pros.getProductsByCategory(this.categoryID).subscribe(
        (response: ApiSanPhamLoai) => {
          if (response.status === 200) {
            this.dataProduct = response.list;  
            console.log('Danh sách sản phẩm:', this.dataProduct);
           
          } else {
            console.error('Lỗi: API không trả về dữ liệu hợp lệ');
          }
        },
        (error) => {
          console.error('Lỗi khi tải loại sản phẩm:', error); 
        }
      );
    });
    
  }
  addToCart(product: any) {
    this.carService.addToCart(product);
    alert(`Sản phẩm đã được thêm vào giỏ hàng!`);
  }  
}