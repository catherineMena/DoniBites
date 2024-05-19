import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthenticationService,private router: Router) { }

  onSubmit() {
    this.authService.login({ nombre_usuario: this.username, contraseña: this.password }).subscribe(response => {
      // handle successful login
      this.router.navigate(['/menu']);
      console.log('Login successful', response);
    }, error => {
      // handle error
      console.error('Login failed', error);
    });
  }
}
