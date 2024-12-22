import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiLoaiSP, ApiSanPhamLoai, loaiSP } from '../models/loaiSP.model';

@Injectable({
  providedIn: 'root'
})
export class LoaiSPService {
  [x: string]: any;
  httpOptions={
    headers:new HttpHeaders({'Content-Type':'Application/json'})
    };
    apiURL='http://localhost:5000/api';
    constructor(private http: HttpClient) { }
    getAll(): Observable<ApiLoaiSP>{
       return this.http.get<ApiLoaiSP>(this.apiURL + '/category').pipe();
    }

    getProductsByCategory(category_id: number): Observable<ApiSanPhamLoai> {
      const params = new HttpParams().set('category_id', category_id.toString());
  
      return this.http.get<ApiSanPhamLoai>(`${this.apiURL}/productCategory`, { params });
    }

    searchProducts(query: string): Observable<any> {
      return this.http.get<any>(`http://localhost:5000/api/products/search?q=${query}`);
    }
    
}