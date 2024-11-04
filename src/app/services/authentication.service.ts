import { Injectable, Optional, SkipSelf } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public apiUrl = 'http://139.177.206.17:8080/minidonas';
  public autString:string = 'Basic amVzc2ltYXNzaTpqZXNzaWNh';



  constructor(private http: HttpClient) {
    console.log('AuthenticationService instantiated');
  }


  login(username: String, password: String) : Observable<any> {

    return this.http.get(this.apiUrl+'/api/v1/basicauth',
      { headers: { authorization: this.createBasicAuthToken(username, password)} }).pipe(map((res: any) => {
        if(res['message']=='Acceso permitido'){
          this.registerSuccessfulLogin(username, password);
        }
      }),
      catchError(error => {
        return throwError('No se pudo iniciar sesión. Comprueba tus credenciales.');
      }))
      ;

  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username: String, password: String) {
    this.setAutString(this.createBasicAuthToken(username, password));
  }

  logout() {
    this.setAutString('Basic');
  }

  isUserLoggedIn() {
    // if (this.autString  == 'Basic') return false
    return true
  }

  setAutString(val: string) {
    this.autString = val;
  }

  getAutString = () => this.autString;


}
