import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl = 'http://localhost:5000/api';  

  constructor(private http: HttpClient) {}

  searchProducts(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search`, { params: { query } });
  }
}
