// product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../environment';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/Products`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  searchProducts(searchTerm: string): Observable<Product[]> {
    const searchUrl = `${this.apiUrl}/Search?term=${searchTerm}`;
    return this.http.get<Product[]>(searchUrl);
  }
}
