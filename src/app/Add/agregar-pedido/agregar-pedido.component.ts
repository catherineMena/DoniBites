import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-agregar-pedido',
  templateUrl: './agregar-pedido.component.html',
  styleUrls: ['./agregar-pedido.component.css']
})
export class AgregarPedidoComponent implements OnInit {
  id: string = '';
  productoId: number | null = null;
  cantidad: number = 1;
  precioUnitario: number = 0;
  fechaPedido: string = new Date().toISOString().split('T')[0];
  fechaEsperada: string = new Date().toISOString().split('T')[0];
  descripcion: string = '';
  estado: string = 'Pendiente'; // Valor predeterminado
  productos: any[] = [];

  constructor(
    private pedidoService: PedidoService,
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.getAllProductos().subscribe(
      (data: any) => {
        this.productos = data;
      },
      (error: any) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  guardarPedido(): void {
    if (
      this.id.trim() === '' ||
      this.productoId === null ||
      this.cantidad <= 0 ||
      this.descripcion.trim() === '' ||
      this.estado.trim() === ''
    ) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Verificar que el precio unitario no sea cero
    if (this.precioUnitario === 0) {
      alert('Por favor, seleccione un producto válido.');
      return;
    }

    const newOrder = {
      id: this.id,
      product: {
        id: this.productoId,
        qty: this.cantidad,
        price: this.precioUnitario,
      },
      total: this.calcularTotal(),
      deliverDate: this.fechaPedido,
      expectedDeliverDate: this.fechaEsperada,
      description: this.descripcion,
      status: this.estado
    };

    this.pedidoService.createPedido(newOrder).subscribe(
      (response: any) => {
        console.log('Pedido guardado con éxito:', response);
        this.router.navigate(['/pedidos']);
      },
      (error: any) => {
        console.error('Error al guardar el pedido:', error);
        const errorMessage = error.error?.message || 'Error desconocido';
        alert(`Error al guardar el pedido: ${errorMessage}`);
      }
    );
  }

  onProductChange(event: any): void {
    this.productoId = +event.target.value;
    const selectedProduct = this.productos.find(producto => producto.id === this.productoId);
    if (selectedProduct) {
      this.precioUnitario = selectedProduct.unitPrice;
      this.onCantidadChange(); // Actualiza el total al cambiar el producto
    } else {
      this.precioUnitario = 0; // Restablecer el precio si no se encuentra el producto
    }
  }

  calcularTotal(): number {
    return this.precioUnitario * this.cantidad;
  }

  onCantidadChange(): void {
    this.calcularTotal();
  }

  onFechaChange(event: any): void {
    this.fechaPedido = event.target.value;
  }

  onFechaEsperadaChange(event: any): void {
    this.fechaEsperada = event.target.value;
  }
}
