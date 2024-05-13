import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-actualizar-categoria',
  templateUrl: './actualizar-categoria.component.html',
  styleUrls: ['./actualizar-categoria.component.css']
})
export class ActualizarCategoriaComponent implements OnInit {
  id: number = 0;
  categoria: string = '';

  constructor(private categoriaService: CategoriaService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.categoriaService.getCategoriaById(this.id).subscribe(
        (res: any) => {
          this.categoria = res.name;
        },
        err => console.error(err)
      );
    });
  }

  actualizarCategoria(): void {
    if (this.categoria.trim() === '') {
      alert('Por favor, completa el nombre de la categoría.');
      return;
    }

    const categoriaActualizada = {
      id: this.id,
      name: this.categoria
    };

    this.categoriaService.actualizarCategoria(this.id, categoriaActualizada).subscribe(
      (response: any) => {
        console.log('Categoría actualizada con éxito:', response);
        this.router.navigate(['/categorias']);
      },
      (error: any) => {
        console.error('Error al actualizar la categoría:', error);
        alert('Error al actualizar la categoría. Por favor, inténtalo de nuevo.');
      }
    );
  }
}
