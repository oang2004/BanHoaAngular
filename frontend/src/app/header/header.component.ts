import { Component, OnInit } from '@angular/core';
import { ApiLoaiSP, ApiSanPhamLoai, loaiSP, productCategory } from '../models/loaiSP.model';
import { LoaiSPService } from '../services/loai-sp.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  searchResults: any[] = [];  
  [x: string]: any;
  timkiem: string = '';
  data: loaiSP[] = [];
  dataProduct: productCategory[] = [];
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  dropdownOpen!: boolean;
  cartItemCount: number = 0;

  constructor(
    private pros: LoaiSPService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchLoaiSP(); 
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser(); 
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username; 
    }
  }
  logout(): void {
    this.tokenStorageService.signOut(); 
    this.isLoggedIn = false; 
    this.username = '';  
    this.cartItemCount = 0;
    this.dropdownOpen = false;
    this.router.navigate(['/home']); 
  }
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen; 
  }
  onItemClick(id : number): void {
    console.log('ID đã chọn:', id);
    
  }
  fetchLoaiSP(): void {
    this.pros.getAll().subscribe(
      (response: ApiLoaiSP) => {
        if (response.status === 200) {
          this.data = response.list;  
          console.log('Danh sách sản phẩm:', this.data);
        } else {
          console.error('Lỗi: API không trả về dữ liệu hợp lệ');
        }
      },
      (error) => {
        console.error('Lỗi khi tải loại sản phẩm:', error); 
      }
    );
  }
  onSearch(): void {
    if (this.timkiem.trim()) {
      this.pros.searchProducts(this.timkiem).subscribe(
        (result: any) => {
          console.log('Kết quả tìm kiếm: ', result);
          this.router.navigate(['/search'], { queryParams: { query: this.timkiem } });
        },
        (error: any) => {
          console.error('Lỗi tìm kiếm:', error);
        }
      );
    }
  }
  
  }
  

