import { Component } from '@angular/core';
import { ProveedoresService } from '../../services/proveedores.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css']
})
export class AgregarProveedorComponent {
  id: string = '';
  proveedor: string = '';
  direccion: string = '';
  telefono: string = '';
  correoElectronico: string = '';
  estadoProveedor: string = 'activo';

  constructor(private proveedoresService: ProveedoresService, private router: Router) { }

  guardarProveedor(): void {
    if (this.id.trim() === '' || this.proveedor.trim() === '' || this.direccion.trim() === '' || this.telefono.trim() === '' || this.correoElectronico.trim() === '') {
      alert('Por favor, completa todos los campos.');
      return;
    }
    const newProvider = {
      id: this.id,
      name: this.proveedor,
      address: this.direccion,
      phone: this.telefono,
      email: this.correoElectronico,
      status: this.estadoProveedor
    };

    this.proveedoresService.createProviders(newProvider).subscribe(
      (response: any) => {
        console.log('Proveedor guardado con éxito:', response);
        this.router.navigate(['/proveedores']);
      },
      (error: any) => {
        console.error('Error al guardar el proveedor:', error);
        alert('Error al guardar el proveedor. Por favor, inténtalo de nuevo.');
      }
    );
  }
}
