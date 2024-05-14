import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  apiUrl = 'http://45.79.199.80:8080/minidonas/products'; // URL de tu API

  constructor(private http: HttpClient) { }

  getAllProductos(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProductoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/find/${id}`);
  }

  crearProducto(producto: any): Observable<any> {
    console.log('Datos del producto a guardar:', producto);
    return this.http.post<any>(`${this.apiUrl}/newProduct`, producto);
  }

  actualizarProducto(id: number, producto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, producto);
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
