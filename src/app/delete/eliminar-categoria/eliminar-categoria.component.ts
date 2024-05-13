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

  eliminarCategoria(): void {
    this.categoriaService.eliminarCategoria(this.id).subscribe(
      () => {
        console.log('Categoría eliminada con éxito');
        this.router.navigate(['/categorias']);
      },
      (error: any) => {
        console.error('Error al eliminar la categoría:', error);
        alert('Error al eliminar la categoría. Por favor, inténtalo de nuevo.');
      }
    );
  }
}
