import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { FacturaService } from '../../services/factura.service';
import { PedidoService } from '../../services/pedido.service'; // Asegúrate de importar el servicio de pedidos

// Definición de la interfaz para la Factura
interface Factura {
  id: number;
  invoiceDate: string;
  order: {
    id: number;
    recordUser: number;
    updateUser: number;
    orderDate: string;
    expectedDeliverDate: string;
    deliverDate: string;
    description: string; // descripción del pedido
    status: string; // estado del pedido
    details: DetalleFactura[];
  };
  ruc: string;
  description: string; // descripción normal de la factura
  paidAmount: number;
  status: string;
}

interface DetalleFactura {
  qty: number; // Cantidad
  price: number; // Precio total
}

interface Pedido {
  id: number;
  description: string; // Descripción del pedido
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
      id: 0,
      recordUser: 0,
      updateUser: 0,
      orderDate: '',
      expectedDeliverDate: '',
      deliverDate: '',
      description: '', // descripción del pedido
      status: '',
      details: []
    },
    ruc: '',
    description: '', // descripción de la factura
    paidAmount: 0,
    status: ''
  };

  pedidos: Pedido[] = []; // Array para almacenar los pedidos disponibles

  constructor(
    private facturaService: FacturaService,
    private pedidoService: PedidoService, // Inicializa el servicio de pedidos
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const facturaId = +params['id'];
      this.obtenerFacturaPorId(facturaId);
      this.cargarPedidos(); // Cargar los pedidos al iniciar
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

  cargarPedidos(): void {
    this.pedidoService.getAllPedidos().subscribe(
      res => {
        this.pedidos = res; // Asignar la respuesta a la lista de pedidos
      },
      err => {
        console.error('Error al cargar pedidos:', err);
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
        Toastify({
          text: "Factura actualizada con éxito",
          duration: 3000,
          gravity: "top",
          position: "center",
          backgroundColor: "#36CB7C",
        }).showToast();
        this.router.navigate(['/factura']);
      },
      err => {
        console.error('Error al actualizar la factura:', err);
        Toastify({
          text: "Error al actualizar la factura. Por favor, inténtalo de nuevo.",
          duration: 3000,
          gravity: "top",
          position: "center",
          backgroundColor: "#ff5f6d",
        }).showToast();
      }
    );
  }
}
