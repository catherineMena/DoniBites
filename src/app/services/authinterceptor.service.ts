import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Añadir las credenciales de autenticación básicas
    const authReq = req.clone({
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa('username:password') // Reemplaza 'username' y 'password' con las credenciales correctas
      })
    });
    return next.handle(authReq);
  }
}
