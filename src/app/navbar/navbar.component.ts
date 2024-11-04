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
    // Aquí podrías agregar lógica para limpiar datos del usuario o cerrar sesión
    this.router.navigate(['/login']); // Redirige a la página de login
  }
}
