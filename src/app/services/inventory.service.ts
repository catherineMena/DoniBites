import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'http://139.177.206.17:8080/minidonas/inventory/incomings';

  constructor(private http: HttpClient) {}

  getIncomingStocks(): Observable<any[]> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getStockEntryById(id: number): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any>(`${this.apiUrl}/find/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  createEntry(stockEntry: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.post<any>(`${this.apiUrl}/newIncoming`, stockEntry, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  updateEntry(id: number, stockEntry: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, stockEntry, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deleteEntry(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

  private createAuthorizationHeader(): HttpHeaders {
    const token = 'your-auth-token'; // Reemplaza esto con el token de autenticación real
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}
