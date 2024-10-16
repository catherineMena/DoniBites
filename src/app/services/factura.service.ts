import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  apiUrl = 'http://139.177.206.17:8080/minidonas/invoices'; // URL base para las facturas

  constructor(private http: HttpClient) { }

  // Obtener todas las facturas
  getAllFacturas(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener una factura por su ID
  getFacturaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/find/${id}`);
  }

  // Crear una nueva factura
  crearFactura(factura: any): Observable<any> {
    console.log('Datos de la factura a guardar:', factura);
    return this.http.post<any>(`${this.apiUrl}/newInvoice`, factura);
  }

  // Actualizar una factura existente
  updateFactura(id: number, factura: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, factura);
  }

  // Desactivar (eliminar lógicamente) una factura por su ID
  deactivateFacturaById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/delete/${id}`);
  }
}
