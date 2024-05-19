import { Component } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-categoria.component.html',
  styleUrls: ['./agregar-categoria.component.css']
})
export class AgregarCategoriaComponent {
  id: string = '';
  categoria: string = '';

  constructor(private categoriaService: CategoriaService, private router: Router) { }

  guardarCategoria(): void {
    if (this.id.trim() === '' || this.categoria.trim() === '') {
      alert('Por favor, completa todos los campos.');
      return;
    }
    const nuevaCategoria = {
      id: this.id,
      name: this.categoria
    };

    this.categoriaService.crearCategoria(nuevaCategoria).subscribe(
      (response: any) => {
        console.log('Categoría guardada con éxito:', response);
        this.router.navigate(['/categoria']);
      },
      (error: any) => {
        console.error('Error al guardar la categoría:', error);
        alert('Error al guardar la categoría. Por favor, inténtalo de nuevo.');
      }
    );
  }
}
