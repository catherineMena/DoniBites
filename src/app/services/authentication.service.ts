import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // apiUrl = 'http://45.79.199.80:8080/minidonas/users';
  apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${username}:${password}`)
    });

return this.http.post<any>(`${this.apiUrl}/login`, { username, password }, { headers }).pipe(
      catchError(error => {
        return throwError('No se pudo iniciar sesión. Comprueba tus credenciales.');
      })
    );
  }


}
