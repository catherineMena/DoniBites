import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { ProveedoresService } from '../../services/proveedores.service';

@Component({
  selector: 'app-actualizar-proveedor',
  templateUrl: './actualizar-proveedor.component.html',
  styleUrls: ['./actualizar-proveedor.component.css']
})
export class ActualizarProveedorComponent implements OnInit {
  id: number = 0;
  proveedor: string = '';
  direccion: string = '';
  telefono: string = '';
  correoElectronico: string = '';
  estadoProveedor: string = 'activo'; // Valor predeterminado

  constructor(private proveedoresService: ProveedoresService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.proveedoresService.getProvidersById(this.id).subscribe(
        (res: any) => {
          this.proveedor = res.name;
          this.direccion = res.address;
          this.telefono = res.phone;
          this.correoElectronico = res.email;
          this.estadoProveedor = res.status;
        },
        err => console.error(err)
      );
    });
  }

  actualizarProveedor(): void {
    if (this.proveedor.trim() === '' || this.direccion.trim() === '' || this.telefono.trim() === '' || this.correoElectronico.trim() === '') {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const proveedorActualizado = {
      id: this.id,
      name: this.proveedor,
      address: this.direccion,
      phone: this.telefono,
      email: this.correoElectronico,
      status: this.estadoProveedor
    };

    this.proveedoresService.updateProvider(this.id, proveedorActualizado).subscribe(
      (response: any) => {
        console.log('Proveedor actualizado con éxito:', response);
        Toastify({
          text: "Proveedor actualizado con éxito",
          duration: 3000,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          backgroundColor: "#36CB7C",
        }).showToast();
        this.router.navigate(['/proveedores']);
      },
      (error: any) => {
        console.error('Error al actualizar el proveedor:', error);
        Toastify({
          text: "Error al actualizar el proveedor. Por favor, inténtalo de nuevo.",
          duration: 3000,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          backgroundColor: "#ff5f6d",
        }).showToast();      }
    );
  }
}
