import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../services/categoria.service';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categorias: any[] = [];
  categoriasFiltradas: any[] = [];

  constructor(private router: Router, private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.cargarCategorias();
  }

  verCategoria(id: number): void {
    this.router.navigate(['/visualizar-categoria', id]);
  }

  cargarCategorias(): void {
    this.categoriaService.getAllCategorias().subscribe(
      (data: any) => {
        this.categorias = data;
        this.categoriasFiltradas = data;
      },
      err => console.error(err)
    );
  }

  eliminarCategoria(id: number): void {
    this.router.navigate(['/eliminar-categoria', id]);
  }

  buscarCategoria(event: any): void {
    const valor = event.target.value.toLowerCase();
    this.categoriasFiltradas = this.categorias.filter(categoria =>
      categoria.name.toLowerCase().includes(valor)
    );
  }

  // Método para descargar la lista en el formato especificado
  descargarLista(formato: string) {
    if (formato === 'pdf') {
      this.descargarPDF();
    } else if (formato === 'excel') {
      this.downloadExcel();
    }
  }

  // Método para descargar en PDF
  descargarPDF() {
    const doc = new jsPDF();
    doc.text('Tabla de Categorías', 10, 10);
    (doc as any).autoTable({
      head: [['Id', 'Nombre']],
      body: this.categoriasFiltradas.map(categoria => [categoria.id, categoria.name])
    });
    doc.save('categorias.pdf');
  }

  // Método para descargar en Excel
  downloadExcel() {
    const headers = [['Id', 'Nombre', 'Descripción']];
    const data = this.categoriasFiltradas.map(categorias => [
      categorias.id,
      categorias.name,
      categorias.description
    ]);
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([...headers, ...data]);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, 'categorias.xlsx');
  }
}
