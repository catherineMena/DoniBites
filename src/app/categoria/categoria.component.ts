import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../services/categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categorias: any = [];

  constructor(private router: Router, private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.obtenerCategorias('activa');
  }

  obtenerCategorias(estado: string): void {
    this.categoriaService.getCategoriasByEstado(estado).subscribe(
      res => {
        this.categorias = res;
      },
      err => console.error(err)
    );
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


  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');

    if (this.isSidebarCollapsed) {
      sidebar?.classList.add('collapsed');
      content?.classList.add('expanded');
    } else {
      sidebar?.classList.remove('collapsed');
      content?.classList.remove('expanded');
    }
  }
}
