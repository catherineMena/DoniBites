import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { CategoriaService } from '../../services/categoria.service';
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
  categorias: any[] = [];

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarCategorias();
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
        Toastify({
          text: "Producto actualizado con éxito",
          duration: 3000,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          backgroundColor: "#36CB7C",
        }).showToast();
        this.router.navigate(['/producto']);
      },
      (error: any) => {
        console.error('Error al actualizar el producto:', error);
        Toastify({
          text: "Error al actualizar el producto. Por favor, inténtalo de nuevo.",
          duration: 3000,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          backgroundColor: "#ff5f6d",
        }).showToast();      }
    );
  }

  onCategoryChange(event: any): void {
    const selectedCategory = this.categorias.find(categoria => categoria.id === +event.target.value);
    if (selectedCategory) {
      this.categoriaName = selectedCategory.name;
    }
  }
}
