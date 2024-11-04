import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

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
      Toastify({
        text: "Por favor, completa el nombre de la categoría.",
        duration: 3000,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        backgroundColor: "#ff5f6d",
      }).showToast();
      return;
    }

    const categoriaActualizada = {
      id: this.id,
      name: this.categoria
    };

    this.categoriaService.actualizarCategoria(this.id, categoriaActualizada).subscribe(
      (response: any) => {
        console.log('Categoría actualizada con éxito:', response);
        Toastify({
          text: "Categoría actualizada con éxito",
          duration: 3000,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          backgroundColor: "#36CB7C",
        }).showToast();
        this.router.navigate(['/categoria']);
      },
      (error: any) => {
        console.error('Error al actualizar la categoría:', error);
        Toastify({
          text: "Error al actualizar la categoría. Por favor, inténtalo de nuevo.",
          duration: 3000,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          backgroundColor: "#ff5f6d",
        }).showToast();
      }
    );
  }
}
