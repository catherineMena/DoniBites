import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos: any = [];

  constructor(private router: Router, private productoService: ProductoService) { }

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.getAllProductos().subscribe(
      res => {
        this.productos = res;
      },
      err => console.error(err)
    );
  }

  verProducto(id: number): void {
    this.router.navigate(['/visualizar-producto', id]);
  }

  editarProducto(id: number): void {
    this.router.navigate(['/actualizar-producto', id]);
  }

  eliminarProducto(id: number): void {
    this.router.navigate(['/eliminar-producto', id]);
  }
}
