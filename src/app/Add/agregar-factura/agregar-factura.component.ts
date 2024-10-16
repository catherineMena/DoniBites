import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacturaService } from '../../services/factura.service';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-agregar-factura',
  templateUrl: './agregar-factura.component.html',
  styleUrls: ['./agregar-factura.component.css']
})
export class AgregarFacturaComponent implements OnInit {
  id: string = '';
  invoiceDate: string = ''; // Se espera en formato "YYYY-MM-DDTHH:MM:SSZ"
  ruc: string = '';
  paidAmount: number = 0;
  selectedOrder: string = ''; // ID del pedido seleccionado
  orderDate: string = ''; // Se espera en formato "YYYY-MM-DD"
  expectedDeliverDate: string = ''; // Se espera en formato "YYYY-MM-DD"
  orders: any[] = []; // Array para almacenar las órdenes disponibles

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
        this.orders = data; // Asigna las órdenes al array
      },
      (error) => {
        console.error('Error al cargar órdenes:', error);
      }
    );
  }

  guardarFactura(): void {
    // Validar que se seleccione un pedido
    if (!this.selectedOrder) {
      alert('Por favor, selecciona un pedido.');
      return;
    }

    const newInvoice = {
      invoiceDate: this.invoiceDate + 'T00:00:00.000+00:00', // Convertir la fecha a formato ISO
      ruc: this.ruc,
      paidAmount: this.paidAmount.toFixed(2), // Asegurarse de que sea un string con dos decimales
      status: 'activo', // Asignar estado
      order: {
        id: this.selectedOrder, // Usar el pedido seleccionado
        recordUser: 1,
        updateUser: 1,
        orderDate: this.orderDate + 'T00:00:00.000+00:00', // Convertir a formato ISO
        expectedDeliverDate: this.expectedDeliverDate + 'T00:00:00.000+00:00', // Convertir a formato ISO
        description: 'Descripción del pedido', // Descripción estática o dinámica
        status: 'pendiente', // Estado del pedido
        details: [] // Inicializa detalles si es necesario
      }
    };

    this.facturaService.crearFactura(newInvoice).subscribe(
      (response: any) => {
        console.log('Factura guardada con éxito:', response);
        this.router.navigate(['/factura']);
      },
      (error: any) => {
        console.error('Error al guardar la factura:', error);
        alert('Error al guardar la factura. Por favor, inténtalo de nuevo.');
      }
    );
  }
}
