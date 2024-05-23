import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos: any[] = [];
  productosFiltrados: any[] = [];

  constructor(private router: Router, private productoService: ProductoService) { }

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.getAllProductos().subscribe(
      (data: any[]) => {
        this.productos = data;
        this.productosFiltrados = data;
      },
      err => console.error(err)
    );
  }

  buscarProducto(event: any): void {
    const valor = event.target.value.toLowerCase();
    this.productosFiltrados = this.productos.filter(producto =>
      producto.name.toLowerCase().includes(valor) ||
      producto.description.toLowerCase().includes(valor)
    );
  }

  descargarLista(): void {
    const doc = new jsPDF();
    const tableColumn = ["Id", "Producto", "Descripción", "Existencia", "Categoría", "Nombre", "Precio por unidad"];
    const tableRows: any[] = [];

    this.productosFiltrados.forEach(producto => {
      const productoData = [
        producto.id,
        producto.name,
        producto.description,
        producto.qty,
        producto.category.id,
        producto.category.name,
        producto.unitPrice
      ];
      tableRows.push(productoData);
    });

    (doc as any).autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Lista de Productos", 14, 15);
    doc.save('productos.pdf');
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
