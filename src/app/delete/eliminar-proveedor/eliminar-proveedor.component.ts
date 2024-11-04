import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
        this.router.navigate(['/proveedores']); // Redirige a la lista de proveedores u otra página según tu flujo
      },
      (error: any) => {
        console.error('Error al eliminar el proveedor:', error);
        alert('Error al eliminar el proveedor. Por favor, inténtalo de nuevo.');
      }
    );
  }
}
