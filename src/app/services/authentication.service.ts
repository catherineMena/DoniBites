import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://45.79.199.80:8080/minidonas/users';


  constructor(private http: HttpClient) { }

  login(credentials: { nombre_usuario: string, contraseña: string }, optionalArg?: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user`, { nombre_usuario: credentials.nombre_usuario, contraseña: credentials.contraseña });
  }
}
