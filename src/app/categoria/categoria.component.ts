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
    this.obtenerCategorias();
  }

  obtenerCategorias(): void {
    this.categoriaService.getAllCategorias().subscribe(
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
}
