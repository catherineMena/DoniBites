import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
export class HttpInterceptorService implements HttpInterceptor {

    public authString:string='';

    constructor(private authService: AuthenticationService, private router: Router) { 
    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.authService.isUserLoggedIn()){
            this.router.navigate(['/login']);
        }

        if (req.url.indexOf('basicauth') === -1) {
            const authReq = req.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': this.authService.getAutString()
                })
            });
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }
}