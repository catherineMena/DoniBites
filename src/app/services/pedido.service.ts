import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  apiUrl = 'http://139.177.206.17:8080/minidonas/orders'; // URL base para los pedidos

  constructor(private http: HttpClient) { }

  // Obtener todos los pedidos
  getAllPedidos(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener un pedido por su ID
  getPedidoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/find/${id}`);
  }

  // Crear un nuevo pedido
  createPedido(pedido: any): Observable<any> {
    console.log('Datos del pedido a guardar:', pedido);
    return this.http.post<any>(`${this.apiUrl}/newOrder`, pedido);
  }


  // Actualizar un pedido existente
  updatePedido(id: number, pedido: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, pedido);
  }

// Desactivar (eliminar lógicamente) un pedido por su ID
deletePedidoById(id: number): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
}

deletePedido(id: number): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
}



}
