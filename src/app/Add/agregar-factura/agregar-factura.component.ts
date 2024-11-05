import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { FacturaService } from '../../services/factura.service';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-agregar-factura',
  templateUrl: './agregar-factura.component.html',
  styleUrls: ['./agregar-factura.component.css']
})
export class AgregarFacturaComponent implements OnInit {
  id: number = 0;
  invoiceDate: string = '';
  ruc: string = '';
  paidAmount: number = 0;
  selectedOrder: string = '';
  orderDate: string = '';
  expectedDeliverDate: string = '';
  description: string = '';
  orders: any[] = [];

  constructor(
    private facturaService: FacturaService,
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarOrdenes(); // Cargar órdenes al inicializar
  }

  cargarOrdenes(): void {
    this.pedidoService.getAllPedidos().subscribe(
      (data: any) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error al cargar órdenes:', error);
      }
    );
  }

  guardarFactura(): void {
    if (!this.selectedOrder) {
      alert('Por favor, selecciona un pedido.');
      return;
    }

    const newInvoice = {
      id: this.id,
      invoiceDate: this.invoiceDate + 'T00:00:00.000+00:00',
      ruc: this.ruc,
      description: this.description, // Descripción de la factura
      paidAmount: this.paidAmount.toFixed(2),
      status: 'activo',
      order: {
        id: this.selectedOrder,
        recordUser: 1,
        updateUser: 1,
        orderDate: this.orderDate + 'T00:00:00.000+00:00',
        expectedDeliverDate: this.expectedDeliverDate + 'T00:00:00.000+00:00',
        description: 'Pedido en Masaya', // Esto se puede modificar según tu lógica
        status: 'completado', // Esto también puede ser dinámico según el estado del pedido
        details: []
      }
    };

    this.facturaService.crearFactura(newInvoice).subscribe(
      (response: any) => {
        console.log('Factura guardada con éxito:', response);
        Toastify({
          text: "La factura se ha guardado con éxito",
          duration: 3000,
          gravity: "top",
          position: "center",
          backgroundColor: "#36CB7C",
        }).showToast();
        this.router.navigate(['/factura']);
      },
      (error: any) => {
        console.error('Error al guardar la factura:', error);
        Toastify({
          text: "Error al guardar la factura.",
          duration: 3000,
          gravity: "top",
          position: "center",
          backgroundColor: "#ff5f6d",
        }).showToast();
      }
    );
  }
}
