import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
        this.router.navigate(['/factura']); // Redirige a la lista de facturas u otra página según tu flujo
      },
      (error: any) => {
        console.error('Error al eliminar la factura:', error);
        alert('Error al eliminar la factura. Por favor, inténtalo de nuevo.');
      }
    );
  }
}
