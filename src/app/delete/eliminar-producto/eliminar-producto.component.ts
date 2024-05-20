import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.css']
})
export class EliminarProductoComponent implements OnInit {
  producto: any;

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      this.obtenerProductoPorId(productId);
    });
  }

  obtenerProductoPorId(id: number): void {
    this.productoService.getProductoById(id).subscribe(
      res => {
        this.producto = res;
      },
      err => console.error(err)
    );
  }

  eliminarProducto(): void {
    if (this.producto && this.producto.id) {
      this.productoService.deactivateProductoById(this.producto.id).subscribe(
        () => {
          console.log('Producto eliminado con éxito');
          this.router.navigate(['/producto']);
        },
        err => console.error('Error al eliminar el producto:', err)
      );
    }
  }
}
