import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  apiUrl = 'http://139.177.206.17:8080/minidonas/roles';

  constructor(private http: HttpClient) { }

  getAllRoles(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getRoleById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/find/${id}`);
  }

  createRole(role: any): Observable<any> {
    console.log('Datos del rol a guardar:', role);
    return this.http.post<any>(`${this.apiUrl}/newRole`, role);
  }

  updateRole(id: number, role: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, role);
  }

  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
