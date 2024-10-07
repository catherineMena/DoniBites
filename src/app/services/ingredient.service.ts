import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  apiUrl = 'http://139.177.206.17:8080/minidonas/ingredients';

  constructor(private http: HttpClient) { }

  getAllIngredients(): Observable<any> {
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
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, ingredient, { headers });
  }

  deactivateIngredient(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/delete/${id}`);
  }
}
