import { Component } from '@angular/core';
import { ProveedoresService } from '../../services/proveedores.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrl: './agregar-proveedor.component.css'
})
export class AgregarProveedorComponent {
  id: string = '';
  proveedor: string = '';
  direccion: string = '';
  telefono: string = '';
  correo_electronico: string = '';
  estado_proveedor: string = 'activo'; // Default value

  constructor(private proveedoresService: ProveedoresService, private router: Router) { }

  safeProvider(): void {
    if (this.id.trim() === '' || this.proveedor.trim() === '' || this.direccion.trim() === '' || Number(this.telefono) <= 0 || Number(this.correo_electronico) <= 0) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    const newProvider = {
      id: this.id,
      name: this.proveedor,
      address: this.direccion,
      phone: Number(this.telefono),
      email: Number(this.correo_electronico),
      status: this.estado_proveedor
    };

    this.proveedoresService.createProviders(newProvider).subscribe(
      (response: any) => {
        console.log('Proveedor guardado con éxito:', response);
        this.router.navigate(['/providers']);
      },
      (error: any) => {
        console.error('Error al guardar el proveedor:', error);
        alert('Error al guardar el proveedor. Por favor, inténtalo de nuevo.');
      }
    );
  }
}
