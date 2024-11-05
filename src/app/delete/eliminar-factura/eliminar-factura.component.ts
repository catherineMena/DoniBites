import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { FacturaService } from '../../services/factura.service';

@Component({
  selector: 'app-eliminar-factura',
  templateUrl: './eliminar-factura.component.html',
  styleUrls: ['./eliminar-factura.component.css']
})
export class EliminarFacturaComponent implements OnInit {
  id: number = 0;
  factura: any = {};

  constructor(private facturaService: FacturaService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.facturaService.getFacturaById(this.id).subscribe(
        (res: any) => {
          this.factura = res;
        },
        err => console.error(err)
      );
    });
  }

  eliminarFactura(): void {
    this.facturaService.deleteFactura(this.id).subscribe(
      () => {
        console.log('Factura eliminada con éxito');
        Toastify({
          text: "Factura eliminada con éxito",
          duration: 3000,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          backgroundColor: "#36CB7C",
        }).showToast();
        this.router.navigate(['/factura']); // Redirige a la lista de facturas u otra página según tu flujo
      },
      (error: any) => {
        console.error('Error al eliminar la factura:', error);
        Toastify({
          text: "Error al eliminar la factura. Por favor, inténtalo de nuevo.",
          duration: 3000,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          backgroundColor: "#ff5f6d",
        }).showToast();
      }
    );
  }
}
