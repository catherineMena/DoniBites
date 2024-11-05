import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  logout() {
    // Aquí puedes agregar la lógica para cerrar sesión, como eliminar tokens, etc.
    localStorage.removeItem('token'); // Ejemplo de eliminación de token
    this.router.navigate(['/login']);
  }
}
