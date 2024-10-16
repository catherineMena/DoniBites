import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacturaService } from '../../services/factura.service';

@Component({
  selector: 'app-visualizar-factura',
  templateUrl: './visualizar-factura.component.html',
  styleUrls: ['./visualizar-factura.component.css']
})
export class VisualizarFacturaComponent implements OnInit {
  factura: any;

  constructor(private facturaService: FacturaService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const facturaId = +params['id'];
      this.obtenerFacturaPorId(facturaId);
    });
  }

  obtenerFacturaPorId(id: number): void {
    this.facturaService.getFacturaById(id).subscribe(
      res => {
        this.factura = res;
      },
      err => {
        console.error('Error al obtener factura:', err);
        alert('No se pudo obtener la factura.');
      }
    );
  }
}
