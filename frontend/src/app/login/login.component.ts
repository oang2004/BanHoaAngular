import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { TokenStorageService } from '../services/token-storage.service';


@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  isLoginTab = true; 
  isPasswordVisible = false; 
  router: any;
  
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
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    if (!this.form.email||!this.form.password) {
      this.isLoginFailed = true;
      this.errorMessage = 'Cần phải nhập cả email và mật khẩu!';
      return;
    }
    const { email, password } = this.form;
    this.authService.login(email, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    alert('Đăng nhập thành công');
    window.location.href = '/';
  }
  logout(): void {
    this.tokenStorage.signOut(); 
    this.isLoggedIn = false;
    this.form = { email: '', password: '' };
    window.location.href = '/login'; 
  }
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible; 
  }
    forgotPassword(): void {
      this.router.navigate(['/forgot-password']);
    }
}