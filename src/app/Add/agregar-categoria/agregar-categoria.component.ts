import { Component } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Router } from '@angular/router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-categoria.component.html',
  styleUrls: ['./agregar-categoria.component.css']
})
export class AgregarCategoriaComponent {
  categoria: string = '';

  constructor(private categoriaService: CategoriaService, private router: Router) { }

  guardarCategoria(): void {
    if (this.categoria.trim() === '') {
      Toastify({
        text: "Por favor, completa todos los campos antes de guardar",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "rgba(145, 142, 244)",
      }).showToast();
      return;
    }

    const nuevaCategoria = {
      name: this.categoria
    };

    this.categoriaService.crearCategoria(nuevaCategoria).subscribe(
      (response: any) => {
        console.log('Categoría guardada con éxito:', response);
        Toastify({
          text: "Categoría guardada con éxito.",
          duration: 3000,
          gravity: "top",
          position: "center",
          backgroundColor: "#36CB7C",
        }).showToast();
        this.router.navigate(['/categoria']);
      },
      (error: any) => {
        console.error('Error al guardar la categoría:', error);
        Toastify({
          text: "Error al guardar la categoría. Inténtalo de nuevo.",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#ff5f6d",
        }).showToast();
      }
    );
  }
}
