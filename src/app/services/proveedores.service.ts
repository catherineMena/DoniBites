import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  apiUrl = 'http://139.177.206.17:8080/minidonas/users';

  constructor(private http: HttpClient) { }

  getAllProviders(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProvidersById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/find/${id}`);
  }

  createProviders(proveedor: any): Observable<any> {
    console.log('Datos del proveedor a guardar:', proveedor);
    return this.http.post<any>(`${this.apiUrl}/newProvider`, proveedor);
  }

  updateProvider(id: number, proveedor: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, proveedor);
  }

  deleteProvider(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }



}
