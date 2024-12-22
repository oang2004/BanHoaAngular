import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isLoggedIn = false;
  isRegisterFailed = false;
  errorMessage = '';
  roles: string[] = [];
  isLoginTab = true; 
  isPasswordVisible = false; 

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }
    openTab(tabName: string) {
      if (tabName === 'login') {
        this.isLoginTab = true;
      } else {
        this.isLoginTab = false;
      }
    }
  
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    if (!this.form.username || !this.form.email || !this.form.password) {
      this.isRegisterFailed = true;
      this.errorMessage = 'Tất cả các trường là bắt buộc!';
      return;
    }

    const { username, email, password } = this.form;
    const emailPattern = /^(.*@gmail\.com|.*@nttu\.edu\.vn)$/;
    if (!emailPattern.test(email)) {
      this.isRegisterFailed = true;
      this.errorMessage = 'Email của bạn bị sai';
      return;
    }
    this.authService.register(username, email, password).subscribe(
      data => {
        this.isRegisterFailed = false;
        alert('Đăng ký thành công');
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isRegisterFailed = true;
      }
    );
  }
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible; 
  }

  reloadPage(): void {
    window.location.href = '/login';
  }
}