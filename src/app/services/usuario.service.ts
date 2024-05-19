import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  apiUrl = 'http://45.79.199.80:8080/minidonas/users';

  constructor(private http: HttpClient) { }

  getAllUsuarios(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUsuarioById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/find/${id}`);
  }

  crearUsuario(usuario: any): Observable<any> {
    console.log('Datos del usuario a guardar:', usuario);
    return this.http.post<any>(`${this.apiUrl}/newUser`, usuario);
  }

  actualizarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, usuario);
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
