import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:5000/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router: any;
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const url = `http://localhost:5000/api/login`;
    return this.http.post(url, {
      email,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    const url = `http://localhost:5000/api/register`;
    return this.http.post(url, {
      username,
      email,
      password
    }, httpOptions);
  }
  // Đăng xuất
  logout(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    this.router.navigate(['/login']); 
  }
}