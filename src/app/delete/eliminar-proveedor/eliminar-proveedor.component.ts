import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { ProveedoresService } from '../../services/proveedores.service';

@Component({
  selector: 'app-eliminar-proveedor',
  templateUrl: './eliminar-proveedor.component.html',
  styleUrls: ['./eliminar-proveedor.component.css']
})
export class EliminarProveedorComponent implements OnInit {
  id: number = 0;
  proveedor: any = {};

  constructor(
    private proveedoresService: ProveedoresService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.proveedoresService.getProvidersById(this.id).subscribe(
        (res: any) => {
          this.proveedor = res;
        },
        err => console.error(err)
      );
    });
  }

  eliminarProveedor(): void {
    this.proveedoresService.deleteProvider(this.id).subscribe(
      () => {
        console.log('Proveedor eliminado con éxito');
        Toastify({
          text: "Proveedor eliminado con éxito",
          duration: 3000,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          backgroundColor: "#36CB7C",
        }).showToast();
        this.router.navigate(['/proveedores']); // Redirige a la lista de proveedores u otra página según tu flujo
      },
      (error: any) => {
        console.error('Error al eliminar el proveedor:', error);
        Toastify({
          text: "Error al eliminar el proveedor. Por favor, inténtalo de nuevo.",
          duration: 3000,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          backgroundColor: "#ff5f6d",
        }).showToast();
      }
    );
  }
}
