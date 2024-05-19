import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';  // Asegúrate de importar el servicio de categorías
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  id: string = '';
  nombre: string = '';
  descripcion: string = '';
  existencia: number = 0;
  categoriaId: number = 0;
  categoriaName: string = '';
  precio: number = 0;

  categorias: any[] = [];

  constructor(
    private productService: ProductoService,
    private router: Router,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.getAllCategorias().subscribe(
      (data: any) => {
        this.categorias = data;
      },
      (error: any) => {
        console.error('Error al cargar las categorías:', error);
      }
    );
  }

  guardarProducto(): void {
    if (this.id.trim() === '' || this.nombre.trim() === '' || this.descripcion.trim() === '' || this.categoriaId <= 0 || this.precio <= 0) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    const nuevoProducto = {
      id: this.id,
      name: this.nombre,
      description: this.descripcion,
      qty: this.existencia,
      category: {
        id: this.categoriaId,
        name: this.categoriaName
      },
      unitPrice: this.precio
    };

    this.productService.crearProducto(nuevoProducto).subscribe(
      (response: any) => {
        console.log('Producto guardado con éxito:', response);
        this.router.navigate(['/producto']);
      },
      (error: any) => {
        console.error('Error al guardar el producto:', error);
        alert('Error al guardar el producto. Por favor, inténtalo de nuevo.');
      }
    );
  }

  onCategoryChange(event: any): void {
    const selectedCategory = this.categorias.find(categoria => categoria.id === +event.target.value);
    if (selectedCategory) {
      this.categoriaName = selectedCategory.name;
    }
  }
}
