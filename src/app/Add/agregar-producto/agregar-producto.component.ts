import { Component } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent {
  id: string = '';
  nombre: string = '';
  descripcion: string = '';
  existencia: number = 0;
  categoriaId: number = 0;
  categoriaName: string = '';
  precio: number = 0;

  constructor(private productService: ProductoService, private router: Router) { }

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
        this.router.navigate(['/productos']);
      },
      (error: any) => {
        console.error('Error al guardar el producto:', error);
        alert('Error al guardar el producto. Por favor, inténtalo de nuevo.');
      }
    );
  }
}
