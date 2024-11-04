import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

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
    this.categoriaService.eliminarCategoria(this.id).subscribe(
      () => {
        console.log('Categoría eliminada con éxito');
        Toastify({
          text: "Categoría eliminada con éxito",
          duration: 3000,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          backgroundColor: "#36CB7C",
        }).showToast();
        this.router.navigate(['/categoria']); // Redirige a la lista de categorías u otra página según tu flujo
      },
      (error: any) => {
        console.error('Error al eliminar la categoría:', error);
        Toastify({
          text: "Error al eliminar la categoría. Por favor, inténtalo de nuevo.",
          duration: 3000,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          backgroundColor: "#ff5f6d",
        }).showToast();
      }
    );
  }
}
