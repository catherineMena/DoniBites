import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
 apiUrl = 'http://45.79.199.80:8080/minidonas/categories'; // URL de tu API

  constructor(private http: HttpClient) { }

   getAllCategorias() {
    return this.http.get(this.apiUrl);
  }

  getCategoriaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/find/${id}`);
  }

  crearCategoria(categoria: any): Observable<any> {
    console.log('Datos de la categoría a guardar:', categoria);
    return this.http.post<any>(`${this.apiUrl}/newCategory`, categoria);
  }

  actualizarCategoria(id: number, categoria: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, categoria);
  }

  eliminarCategoria(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

}
