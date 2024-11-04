import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

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
    console.log('Datos del ingrediente a guardar:', ingredient);
    return this.http.post<any>(`${this.apiUrl}/newIngredient`, ingredient);
  }

  updateIngredient(id: number, ingredient: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, ingredient, { headers });
  }

  deactivateIngredient(id: number): Observable<any> {
    // Check that the ID is valid before calling delete
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteIngredient(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}
