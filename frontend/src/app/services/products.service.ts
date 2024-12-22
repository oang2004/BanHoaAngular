import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:5000/api/products'; 

  constructor(private http: HttpClient) {}
  getProducts(productId: any): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  searchProducts(query: string): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/products/search?q=${query}`);
  }
  
}