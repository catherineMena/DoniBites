
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class RecuperarPwdService {

 apiUrl = 'http://139.177.206.17:8080/minidonas/changepwd';

  constructor(private http: HttpClient) { }

  crearContraseña(usuario: any): Observable<any> {
    console.log('Datos de la categoría a guardar:', usuario);
    return this.http.post<any>(`${this.apiUrl}`, usuario);
  }      
}
