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

  constructor(private authService: AuthenticationService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(response => {
      // handle successful login
      this.router.navigate(['/menu']); // Redirecciona al menú
      console.log('Login successful', response);
    }, error => {
      // handle error
      console.error('Login failed', error);
    });
  }
}
