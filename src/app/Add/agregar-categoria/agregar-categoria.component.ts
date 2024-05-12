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
    // Verifica que los campos no estén vacíos
    if (this.id.trim() === '' || this.categoria.trim() === '') {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Crea un objeto con los datos de la categoría
    const nuevaCategoria = {
      id: this.id,
      nombre: this.categoria
    };

    // Envía la nueva categoría al servidor
    this.categoriaService.crearCategoria(nuevaCategoria).subscribe(
      (response: any) => {
        console.log('Categoría guardada con éxito:', response);
        // Redirige a la página de categorías después de guardar
        this.router.navigate(['/categorias']); // Ajusta la ruta según corresponda
      },
      (error: any) => {
        console.error('Error al guardar la categoría:', error);
        alert('Error al guardar la categoría. Por favor, inténtalo de nuevo.');
      }
    );
  }
}
