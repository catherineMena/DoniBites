import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-visualizar-categoria',
  templateUrl: './visualizar-categoria.component.html',
  styleUrls: ['./visualizar-categoria.component.css']
})
export class VisualizarCategoriaComponent implements OnInit {
  categoria: any;

  constructor(private categoriaService: CategoriaService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const categoryId = +params['id'];
      this.obtenerCategoriaPorId(categoryId);
    });
  }

  obtenerCategoriaPorId(id: number): void {
    this.categoriaService.getCategoriaById(id).subscribe(
      res => {
        this.categoria = res;
      },
      err => console.error(err)
    );
  }
}
