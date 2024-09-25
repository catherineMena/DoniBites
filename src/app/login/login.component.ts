import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthenticationService, private router: Router) {}

  iniciarSesion() {
     // Deshabilitar la verificación de credenciales
  // this.authService.login(this.username, this.password).subscribe(
  //   response => {
  //     console.log('Inicio de sesión exitoso', response);
  //     this.router.navigate(['/menu']);
  //   },
  //   error => {
  //     this.errorMessage = error;
  //     console.error('Error de inicio de sesión', error);
  //   }
  // );

  // Redirigir directamente al menú
  // console.log('Inicio de sesión deshabilitado, redirigiendo al menú');
  // this.router.navigate(['/menu']);
  }
}
