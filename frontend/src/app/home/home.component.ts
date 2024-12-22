import { Component, OnInit } from '@angular/core';  // Import service LoaiSPService
// import { LoaiSPService } from '../services/loai-sp.service';
import { TokenStorageService } from '../services/token-storage.service';
import { loaiSP } from '../models/loaiSP.model';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {  
  products = [
    {
      id: 1,
      name: 'Giỏ hoa đẹp nhất - GH242',
      price: 1100000,
      imageUrl:'assets/hcm/gio-hoa-dep-nhat-2.jpg',
      isSale: false
    },
    {
      id: 2,
      name: 'Giỏ hoa đơn giản - GH247',
      price: 365000,
      imageUrl:'assets/hcm/gio-hoa-don-gian.jpg',
      isSale: false
    },
    {
      id: 3,
      name: 'Giỏ hoa giá rẻ - GH246',
      price: 350000,
      imageUrl:'assets/hcm/gio-hoa-gia-re.jpg',
      isSale: false
    },
    {
      id: 4,
      name: 'Giỏ hoa rực rỡ - GH135',
      price: 500000,
      imageUrl:'assets/hcm/gio-hoa-ruc-ro.jpg',
      isSale: false
    },
    {
      id: 5,
      name: 'Giỏ hoa tươi tone cam - GH266',
      price: 1100000,
      imageUrl:'assets/hcm/gio-hoa-tuoi-chuyen-nghiep.jpg',
      isSale: false
      
    },
    {
      id: 6,
      name: 'Giỏ hoa cẩm tú cầu mix hoa hồng – GH200',
      price: 650000,
      imageUrl:'assets/hcm/gio-hoa-cam-tu-cau-mix-hoa-hong.jpg',
      isSale: false
    },
    {
      id: 7,
      name: 'Giỏ hoa để bàn tone tím hồng – GH243',
      price: 600000,
      imageUrl:'assets/hcm/GH37.jpg',
      isSale: false
    },
    {
      id: 8,
      name: 'Giỏ hoa để bàn tone tím hồng – GH243',
      price: 500000,
      imageUrl:'assets/hcm/gio-hoa-de-ban-tone-tim-hong-2.jpg',
      isSale: false
    },
    { 
      id: 8, 
      name: 'Bó hoa tặng sinh nhật tone tím nhạt – BH230', 
      price: 499000, 
      imageUrl: 'assets/htm/bo-hoa-phu-hop-tang-sinh-nhat.jpg', 
    },
    { 
      id: 9, 
      name: 'Giỏ hoa tươi sinh động – GH254', 
      price: 599000, 
      imageUrl: 'assets/htm/gio-hoa-tuoi-sinh-dong.jpg', 
    },
    { 
      id: 10, 
      name: 'Giỏ hoa tươi tinh tế – GH249', 
      price: 1150000, 
      imageUrl: 'assets/htm/gio-hoa-tuoi-tinh-te.jpg', 
    },
    { 
      id: 11, 
      name: 'Bó hoa tặng sinh nhật tone tím nhạt – BH230', 
      price: 499000, 
      imageUrl: 'assets/htm/bo-hoa-phu-hop-tang-sinh-nhat.jpg', 
    },
    { 
      id: 1, 
      name: 'Bình hoa kiểu hiện đại – GH205', 
      price: 3600000, 
      imageUrl: 'assets/htm/binh-hoa-kieu-hien-dai.jpg', 
      isSale: true 
    },
    { 
      id: 2, 
      name: 'Bình hoa kiểu sang trọng – GH206', 
      price: 3650000, 
      imageUrl: 'assets/htm/binh-hoa-kieu-sang-trong.jpg', 
      isSale: false 
    },
    { 
      id: 3, 
      name: 'Bó hoa hiện đại nhất – BH199', 
      price: 580000, 
      imageUrl: 'assets/htm/bo-hoa-hien-dai-nhat.jpg', 
      isSale: false 
    },
    { 
      id: 4, 
      name: 'Bó hoa kiểu Hàn Quốc – BH142', 
      price: 580000, 
      imageUrl: 'assets/htm/bo-hoa-kieu-han-quoc.jpg', 
      isSale: false 
    },
    { 
      id: 9, 
      name: 'Giỏ hoa hồng đỏ dày dạn - GH181', 
      price: 1500000 , 
      imageUrl: 'assets/hty/gio-hoa-hong-do-day-dan.jpg', 
      isSale: true },
    { 
      id: 10, 
      name: 'Giỏ hoa hồng đỏ đẹp - GH180', 
      price: 700000 , 
      imageUrl: 'assets/hty/gio-hoa-hong-do-dep.jpg', 
      isSale: false 
    },
    { 
      id: 11, 
      name: 'Giỏ hoa hồng đỏ không lồ - GH236', 
      price: 1650000, 
      imageUrl: 'assets/hty/gio-hoa-hong-do-khong-lo-2.jpg', 
      isSale: true },
    { 
      id: 12, 
      name: 'Giỏ hoa hồng không lồ - GH179', 
      price: 2500000 , 
      imageUrl: 'assets/hty/gio-hoa-hong-do-khong-lo.jpg', 
      isSale: false 
    },
  ];
  commonService: any;
  dataPro: any;
  formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN').format(price) + ' VND';
  }
  timkiem: string = ''; 
  data: loaiSP[] = []; 
  private roles: string[] = [];  
  isLoggedIn = false;  
  showAdminBoard = false;  
  showModeratorBoard = false; 
  username?: string;  

  constructor(
    private tokenStorageService: TokenStorageService  
  ) { }

  ngOnInit(): void {
    
    
    this.fetchData();  
    this.isLoggedIn = !!this.tokenStorageService.getToken(); 

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();  
      this.roles = user.roles;  
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');  
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR'); 
      this.username = user.username;
    }
  }
  getLastProduct(){
    this.commonService.listAllProduct().subscribe((res: any)=>{
      this.dataPro = res;
    })
  }
  logout(): void {
    this.tokenStorageService.signOut(); 
    window.location.reload();
  }
  addToCart(product: any) {
    this.addToCart(product);
    alert('Đã thêm vào giỏ hàng!');
  }
  fetchData(): void {
  }
}