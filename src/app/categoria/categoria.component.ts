import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../services/categoria.service';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
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

  cargarCategorias(): void {
    this.categoriaService.getAllCategorias().subscribe(
      (data: any) => {
        this.categorias = data;
        this.categoriasFiltradas = data;
      },
      err => console.error(err)
    );
  }

  buscarCategoria(event: any): void {
    const valor = event.target.value.toLowerCase();
    this.categoriasFiltradas = this.categorias.filter(categoria =>
      categoria.name.toLowerCase().includes(valor) ||
      categoria.description.toLowerCase().includes(valor)
    );
  }

  descargarLista(): void {
    const doc = new jsPDF();
    const tableColumn = ["Id", "Nombre", "Descripción"];
    const tableRows: any[] = [];

    this.categoriasFiltradas.forEach(categoria => {
      const categoriaData = [
        categoria.id,
        categoria.name,
        categoria.description
      ];
      tableRows.push(categoriaData);
    });

    (doc as any).autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Lista de Categorías", 14, 15);
    doc.save('categorias.pdf');
  }

  verCategoria(id: number): void {
    this.router.navigate(['/visualizar-categoria', id]);
  }

  editarCategoria(id: number): void {
    this.router.navigate(['/actualizar-categoria', id]);
  }

  eliminarCategoria(id: number): void {
    this.router.navigate(['/eliminar-categoria', id]);
  }
}
