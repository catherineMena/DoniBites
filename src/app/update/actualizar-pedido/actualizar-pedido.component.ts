import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { ProductoService } from '../../services/producto.service'; // Asegúrate de importar tu servicio de productos.

interface Producto {
  id: number;
  name: string;
  description: string;
  unitPrice: number;
}

interface DetallePedido {
  product: Producto;
  qty: number;
  price: number;
}

@Component({
  selector: 'app-actualizar-pedido',
  templateUrl: './actualizar-pedido.component.html',
  styleUrls: ['./actualizar-pedido.component.css']
})
export class ActualizarPedidoComponent implements OnInit {
  pedido: {
    id: number;
    orderDate: string;
    expectedDeliverDate: string;
    deliverDate: string; // Añadir el campo deliverDate
    description: string;
    status: string;
    details: DetallePedido[];
  } = {
    id: 0,
    orderDate: '',
    expectedDeliverDate: '',
    deliverDate: '', // Inicializar deliverDate
    description: '',
    status: '',
    details: []
  };

  productos: Producto[] = []; // Lista de productos

  constructor(
    private pedidoService: PedidoService,
    private productoService: ProductoService, // Agregar productoService
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const pedidoId = +params['id'];
      this.obtenerPedidoPorId(pedidoId);
      this.obtenerProductos(); // Cargar productos disponibles
    });
  }

  obtenerPedidoPorId(id: number): void {
    this.pedidoService.getPedidoById(id).subscribe(
      res => {
        this.pedido = res;

        // Asegúrate de que las fechas estén en el formato correcto
        if (this.pedido.orderDate) {
          this.pedido.orderDate = this.formatearFecha(this.pedido.orderDate);
        }
        if (this.pedido.expectedDeliverDate) {
          this.pedido.expectedDeliverDate = this.formatearFecha(this.pedido.expectedDeliverDate);
        }
        if (this.pedido.deliverDate) {
          this.pedido.deliverDate = this.formatearFecha(this.pedido.deliverDate);
        }
      },
      err => {
        console.error('Error al obtener pedido:', err);
        alert('No se pudo obtener el pedido.');
      }
    );
  }

  obtenerProductos(): void {
    this.productoService.getAllProductos().subscribe(
      res => {
        this.productos = res;
      },
      err => {
        console.error('Error al obtener productos:', err);
        alert('No se pudo cargar la lista de productos.');
      }
    );
  }

  formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    return date.toISOString().split('T')[0]; // Devuelve la fecha en formato YYYY-MM-DD
  }

  actualizarPedido(): void {
    this.calcularPreciosTotales(); // Llama al método antes de actualizar el pedido
    this.pedidoService.updatePedido(this.pedido.id, this.pedido).subscribe(
      res => {
        console.log('Pedido actualizado con éxito:', res);
        this.router.navigate(['/pedido']);
      },
      err => {
        console.error('Error al actualizar el pedido:', err);
        alert('Error al actualizar el pedido. Por favor, inténtalo de nuevo.');
      }
    );
  }

  calcularPreciosTotales(): void {
    this.pedido.details.forEach((detail: DetallePedido) => {
      detail.price = detail.qty * detail.product.unitPrice; // Calcula el precio total
    });
  }

  onProductoChange(detail: DetallePedido): void {
    const selectedProduct = this.productos.find(p => p.id === detail.product.id);
    if (selectedProduct) {
      detail.product.unitPrice = selectedProduct.unitPrice; // Actualiza el precio unitario
      this.calcularPreciosTotales(); // Recalcula el precio total
    }
  }

}
