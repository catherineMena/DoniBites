import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RolService } from '../../services/rol.service';

@Component({
  selector: 'app-agregar-rol',
  templateUrl: './agregar-rol.component.html',
  styleUrls: ['./agregar-rol.component.css']
})
export class AgregarRolComponent {
  id: string = '';
  nombreRol: string = '';
  descripcion: string = '';

  constructor(private rolService: RolService, private router: Router) { }

  guardarRol(): void {
    if (this.id.trim() === ''|| this.nombreRol.trim() === '' || this.descripcion.trim() === '') {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Crear el objeto del nuevo rol con todos los atributos
    const newRole = {
      id: this.id,
      name: this.nombreRol, // Asegúrate de que estos nombres coincidan con lo que espera tu API
      description: this.descripcion
    };


    this.rolService.createRole(newRole).subscribe(
      (response: any) => {
        console.log('Rol guardado con éxito:', response);
        this.router.navigate(['/roles']); // Redirigir a la lista de roles
      },
      (error: any) => {
        console.error('Error al guardar el rol:', error);
        alert('Error al guardar el rol. Por favor, inténtalo de nuevo.');
      }
    );
  }
}
