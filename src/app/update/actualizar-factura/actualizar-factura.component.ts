import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturaService } from '../../services/factura.service';

// Definición de la interfaz para la Factura
interface Factura {
  id: number;
  invoiceDate: string;
  order: {
    description: string;
    orderDate: string;
    expectedDeliverDate: string;
  };
  ruc: string;
  paidAmount: number;
  status: string;
  details: DetalleFactura[];
}

interface DetalleFactura {
  qty: number; // Cantidad
  price: number; // Precio total
}

@Component({
  selector: 'app-actualizar-factura',
  templateUrl: './actualizar-factura.component.html',
  styleUrls: ['./actualizar-factura.component.css']
})
export class ActualizarFacturaComponent implements OnInit {
  factura: Factura = {
    id: 0,
    invoiceDate: '',
    order: {
      description: '',
      orderDate: '',
      expectedDeliverDate: ''
    },
    ruc: '',
    paidAmount: 0,
    status: '',
    details: []
  };

  constructor(
    private facturaService: FacturaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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
        this.factura.invoiceDate = this.formatearFecha(this.factura.invoiceDate);
        this.factura.order.orderDate = this.formatearFecha(this.factura.order.orderDate);
        this.factura.order.expectedDeliverDate = this.formatearFecha(this.factura.order.expectedDeliverDate);
      },
      err => {
        console.error('Error al obtener factura:', err);
        alert('No se pudo obtener la factura.');
      }
    );
  }

  formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    return date.toISOString().split('T')[0]; // Devuelve la fecha en formato YYYY-MM-DD
  }

  actualizarFactura(): void {
    this.facturaService.updateFactura(this.factura.id, this.factura).subscribe(
      res => {
        console.log('Factura actualizada con éxito:', res);
        this.router.navigate(['/factura']);
      },
      err => {
        console.error('Error al actualizar la factura:', err);
        alert('Error al actualizar la factura. Por favor, inténtalo de nuevo.');
      }
    );
  }
}
