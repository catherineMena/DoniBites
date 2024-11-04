import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  apiUrl = 'http://139.177.206.17:8080/minidonas/users';
  roles: any[] = [];

  constructor(private http: HttpClient) { }

  getAllUsuarios(): Observable<any[]> {
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

  getAllRoles(): Observable<any[]> {
    return new Observable<any[]>(observer => {
      if (this.roles.length === 0) {
        this.http.get<any[]>('http://45.79.199.80:8080/minidonas/roles').subscribe(
          (roles: any[]) => {
            this.roles = roles;
            observer.next(this.roles);
            observer.complete();
          },
          error => {
            observer.error(error);
          }
        );
      } else {
        observer.next(this.roles);
        observer.complete();
      }
    });
  }
}
