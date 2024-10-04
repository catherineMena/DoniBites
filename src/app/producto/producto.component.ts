import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(private router: Router, private productoService: ProductoService) { }

  ngOnInit() {
    this.loadProducts();
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

  loadProducts(): void {
    this.productoService.getAllProductos().subscribe(
      (data: any[]) => {
        this.products = data;
        this.filteredProducts = data;
      },
      err => console.error(err)
    );
  }

  searchProduct(event: any): void {
    const valor = event.target.value.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(valor) ||
      product.description.toLowerCase().includes(valor)
    );
  }



  downloadList(formato: string) {
    if (formato === 'pdf') {
      this.downloadPDF();
    } else if (formato === 'excel') {
      this.downloadExcel();
    }
  }

  // Método para descargar en PDF
  downloadPDF() {
    const doc = new jsPDF();
    doc.text('Tabla de productos', 10, 10);
    (doc as any).autoTable({
      head: [['ID', 'Nombre', 'Descripción', 'Existencias','Precio']],
      body: this.filteredProducts.map(products => [products.id, products.name, products.description, products.qty,products.unitPrice])    });
    doc.save('Producto.pdf');
  }

  // Método para descargar en Excel
  downloadExcel() {
    const headers = [['ID', 'Nombre', 'Descripción', 'Existencias', 'Precio']];
    const data = this.filteredProducts.map(product => [
      product.id,
      product.name,
      product.description,
      product.qty,
      product.unitPrice
    ]);
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([...headers, ...data]);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, 'Producto.xlsx');
  }
}
