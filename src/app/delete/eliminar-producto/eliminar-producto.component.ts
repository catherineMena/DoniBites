import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.css']
})
export class EliminarProductoComponent implements OnInit {
  id: number = 0;
  producto: any = {};

  constructor(private productoService: ProductoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.productoService.getProductoById(this.id).subscribe(
        (res: any) => {
          this.producto = res;
        },
        err => console.error(err)
      );
    });
  }

  eliminarProducto(): void {
    this.productoService.eliminarProducto(this.id).subscribe(
      () => {
        console.log('Producto eliminado con éxito');
        Toastify({
          text: "Producto eliminado con éxito",
          duration: 3000,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          backgroundColor: "#36CB7C",
        }).showToast();
        this.router.navigate(['/producto']); // Redirige a la lista de productos u otra página según tu flujo
      },
      (error: any) => {
        console.error('Error al eliminar el producto:', error);
        Toastify({
          text: "Error al eliminar el producto. Por favor, inténtalo de nuevo.",
          duration: 3000,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          backgroundColor: "#ff5f6d",
        }).showToast();
      }
    );
  }
}
