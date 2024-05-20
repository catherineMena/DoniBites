import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-eliminar-categoria',
  templateUrl: './eliminar-categoria.component.html',
  styleUrls: ['./eliminar-categoria.component.css']
})
export class EliminarCategoriaComponent implements OnInit {
  id: number = 0;
  categoria: any = {};

  constructor(private categoriaService: CategoriaService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.categoriaService.getCategoriaById(this.id).subscribe(
        (res: any) => {
          this.categoria = res;
        },
        err => console.error(err)
      );
    });
  }

  desactivarCategoria(): void {
    this.categoriaService.desactivarCategoria(this.id).subscribe(
      () => {
        console.log('Categoría desactivada con éxito');
        this.router.navigate(['/categoria']); // Redirige a la lista de categorías u otra página según tu flujo
      },
      (error: any) => {
        console.error('Error al desactivar la categoría:', error);
        alert('Error al desactivar la categoría. Por favor, inténtalo de nuevo.');
      }
    );
  }
}
