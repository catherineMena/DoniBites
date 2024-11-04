import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OutgoingService {
  apiUrl = 'http://139.177.206.17:8080/minidonas/inventory/outgoings'; // URL base para los outgoings

  constructor(private http: HttpClient) {}

  // Obtener todos los outgoings
  getAllOutgoings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener un outgoing por su ID
  getOutgoingById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/find/${id}`);
  }

  // Crear un nuevo outgoing
  crearOutgoing(outgoing: any): Observable<any> {
    console.log('Datos del outgoing a guardar:', outgoing);
    return this.http.post<any>(`${this.apiUrl}/newOutgoing`, outgoing);
  }

  // Actualizar un outgoing existente
  updateOutgoing(id: number, outgoing: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, outgoing);
  }

  deleteOutgoing(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
