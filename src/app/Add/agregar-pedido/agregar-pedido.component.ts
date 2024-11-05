import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { PedidoService } from '../../services/pedido.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-agregar-pedido',
  templateUrl: './agregar-pedido.component.html',
  styleUrls: ['./agregar-pedido.component.css']
})
export class AgregarPedidoComponent implements OnInit {
  id: number = 0;
  orderDate: string = '';
  description: string = '';
  status: string = 'pendiente';
  expectedDeliverDate: string = '';
  deliverDate: string = '';
  detail: any = { product: { id: 0, name: '' }, qty: 0, price: 0 };
  unitPrice: number = 0;
  products: any[] = [];

  constructor(
    private pedidoService: PedidoService,
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.getAllProductos().subscribe(
      (data: any[]) => {
        this.products = data;
      },
      (error: any) => {
        console.error('Error al obtener los productos:', error);
        alert('Error al cargar los productos. Por favor, intenta de nuevo.');
      }
    );
  }

  actualizarPrecio(): void {
    const selectedProduct = this.products.find(product => product.id == this.detail.product.id);
    if (selectedProduct) {
      this.unitPrice = selectedProduct.unitPrice; // Asigna el precio unitario
      this.detail.price = this.unitPrice * this.detail.qty; // Actualiza el total al seleccionar producto
    }
  }

  calcularTotal(): void {
    if (this.unitPrice > 0 && this.detail.qty > 0) {
      this.detail.price = this.unitPrice * this.detail.qty; // Calcula el total basado en la cantidad
    } else {
      this.detail.price = 0; // Total es 0 si no hay cantidad o precio unitario válido
    }
  }

  guardarPedido(): void {
    const newOrder = {
      recordUser: 1,
      updateUser: 1,
      orderDate: this.orderDate + 'T00:00:00.000+00:00',
      updateDate: new Date().toISOString(),
      expectedDeliverDate: this.expectedDeliverDate + 'T00:00:00.000+00:00',
      deliverDate: this.deliverDate ? this.deliverDate + 'T00:00:00.000+00:00' : null,
      description: this.description,
      status: this.status,
      details: [{
        product: { id: this.detail.product.id },
        qty: this.detail.qty,
        price: this.detail.price
      }]
    };

    this.pedidoService.createPedido(newOrder).subscribe(
      (response: any) => {
        console.log('Pedido guardado con éxito:', response);
        Toastify({
          text: "El pedido se ha guardado con éxito",
          duration: 3000,
          gravity: "top",
          position: "center",
          backgroundColor: "#36CB7C",
        }).showToast();
        this.router.navigate(['/pedido']);
      },
      (error: any) => {
        console.error('Error al guardar el pedido:', error);
        Toastify({
          text: "Error al guardar pedido. Inténtalo de nuevo.",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#ff5f6d",
        }).showToast();      }
    );
  }
}
