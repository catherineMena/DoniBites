import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css']
})
export class ActualizarProductoComponent implements OnInit {
  id: number = 0;
  nombre: string = '';
  descripcion: string = '';
  existencia: number = 0;
  categoriaId: number = 0;
  categoriaName: string = '';
  precio: number = 0;

  constructor(private productoService: ProductoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.productoService.getProductoById(this.id).subscribe(
        (res: any) => {
          this.nombre = res.name;
          this.descripcion = res.description;
          this.existencia = res.qty;
          this.categoriaId = res.category.id;
          this.categoriaName = res.category.name;
          this.precio = res.unitPrice;
        },
        err => console.error(err)
      );
    });
  }

  actualizarProducto(): void {
    if (this.nombre.trim() === '' || this.descripcion.trim() === '' || this.existencia <= 0 || this.categoriaId <= 0 || this.precio <= 0) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    const productoActualizado = {
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

    this.productoService.actualizarProducto(this.id, productoActualizado).subscribe(
      (response: any) => {
        console.log('Producto actualizado con éxito:', response);
        this.router.navigate(['/producto']);
      },
      (error: any) => {
        console.error('Error al actualizar el producto:', error);
        alert('Error al actualizar el producto. Por favor, inténtalo de nuevo.');
      }
    );
  }
}
