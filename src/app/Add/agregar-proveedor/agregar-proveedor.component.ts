import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { ProveedoresService } from '../../services/proveedores.service';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css']
})
export class AgregarProveedorComponent {
  id: number = 0;
  proveedor: string = '';
  direccion: string = '';
  telefono: string = '';
  correoElectronico: string = '';
  estadoProveedor: string = 'activo';

  constructor(private proveedoresService: ProveedoresService, private router: Router) { }

  guardarProveedor(): void {
    if (this.proveedor.trim() === '' || this.direccion.trim() === '' || this.telefono.trim() === '' || this.correoElectronico.trim() === '') {
      alert('Por favor, completa todos los campos.');
      return;
    }
    const newProvider = {
      name: this.proveedor,
      address: this.direccion,
      phone: this.telefono,
      email: this.correoElectronico,
      status: this.estadoProveedor
    };

    this.proveedoresService.createProviders(newProvider).subscribe(
      (response: any) => {
        console.log('Proveedor guardado con éxito:', response);
        Toastify({
          text: "El proveedor se ha guardado con éxito",
          duration: 3000,
          gravity: "top",
          position: "center",
          backgroundColor: "#36CB7C",
        }).showToast();
        this.router.navigate(['/proveedores']);
      },
      (error: any) => {
        console.error('Error al guardar el proveedor:', error);
        Toastify({
          text: "Error al guardar proveedor. Inténtalo de nuevo.",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#ff5f6d",
        }).showToast();      }
    );
  }
}
