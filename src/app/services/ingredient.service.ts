import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  apiUrl = 'http://45.79.199.80:8080/minidonas/ingredients';

  constructor(private http: HttpClient) { }

   getAllIngredients() {
    return this.http.get(this.apiUrl);
  }

  getIngredientById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/find/${id}`);
  }

  createIngredient(ingredient: any): Observable<any> {
    console.log('Datos de la categoría a guardar:', ingredient);
    return this.http.post<any>(`${this.apiUrl}/newIngredient`, ingredient);
  }

  updateIngredient(id: number, ingredient: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, ingredient);
  }

  // eliminarCategoria(id: number): Observable<any> {
  //   return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  // }

  deactivateIngrediente(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/delete/${id}`);
  }

  getIngredientByStatus(estado: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?estado=${estado}`);
  }

}
