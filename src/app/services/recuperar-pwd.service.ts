
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class RecuperarPwdService {

 apiUrl = 'http://localhost:8080/changepwd';

  constructor(private http: HttpClient) { }

  crearContraseña(usuario: any): Observable<any> {
    console.log('Datos de usuario a enviar:', usuario);
    return this.http.post<any>(`${this.apiUrl}`, usuario);
  }      
}
