import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { RolService } from '../../services/rol.service';

@Component({
  selector: 'app-agregar-rol',
  templateUrl: './agregar-rol.component.html',
  styleUrls: ['./agregar-rol.component.css']
})
export class AgregarRolComponent {
  id: number = 0;
  nombreRol: string = '';
  descripcion: string = '';

  constructor(private rolService: RolService, private router: Router) { }

  guardarRol(): void {
    if (this.nombreRol.trim() === '' || this.descripcion.trim() === '') {
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
        Toastify({
          text: "El rol se ha guardado con éxito",
          duration: 3000,
          gravity: "top",
          position: "center",
          backgroundColor: "#36CB7C",
        }).showToast();
        this.router.navigate(['/roles']); // Redirigir a la lista de roles
      },
      (error: any) => {
        console.error('Error al guardar el rol:', error);
        Toastify({
          text: "Error al guardar ingrediente. Inténtalo de nuevo.",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#ff5f6d",
        }).showToast();      }
    );
  }
}
