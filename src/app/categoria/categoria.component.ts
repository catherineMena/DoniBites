import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categorias: any = []; // Inicialización de la propiedad

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {

    this.categoriaService.getAllCategorias().subscribe(
      res => {
        this.categorias = res
      },

      err => console.error(err)
    );
  }

  // obtenerCategorias(): void {
  //   this.categoriaService.getAllCategorias().subscribe(
  //     (data: any[]) => {
  //       this.categorias = data;
  //     },
  //     (error) => {
  //       console.error('Error al obtener las categorías:', error);
  //     }
  //   );
  // }

  // eliminar(id: number): void {
  //   this.categoriaService.eliminarCategoria(id).subscribe(
  //     () => {
  //       console.log('Categoría eliminada con éxito');
  //       // Vuelve a cargar la lista de categorías o actualiza la vista según sea necesario
  //       this.getAllCategorias(); // Actualiza la lista después de eliminar
  //     },
  //     (error) => {
  //       console.error('Error al eliminar la categoría:', error);
  //     }
  //   );
  // }

  // editar(id: number): void {
  //   // Implementa la lógica para editar una categoría
  // }

  eliminar(_t17: any) {
    throw new Error('Method not implemented.');
    }
    editar(_t17: any) {
    throw new Error('Method not implemented.');
    }
}
