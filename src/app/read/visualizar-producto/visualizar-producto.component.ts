import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-visualizar-producto',
  templateUrl: './visualizar-producto.component.html',
  styleUrls: ['./visualizar-producto.component.css']
})
export class VisualizarProductoComponent implements OnInit {
  producto: any;

  constructor(private productoService: ProductoService, private route: ActivatedRoute) { }

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
}
