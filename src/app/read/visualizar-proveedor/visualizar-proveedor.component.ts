import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProveedoresService } from '../../services/proveedores.service';

@Component({
  selector: 'app-visualizar-proveedor',
  templateUrl: './visualizar-proveedor.component.html',
  styleUrls: ['./visualizar-proveedor.component.css']
})
export class VisualizarProveedorComponent implements OnInit {
  proveedor: any;

  constructor(private proveedoresService: ProveedoresService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const proveedorId = +params['id'];
      this.obtenerProveedorPorId(proveedorId);
    });
  }

  obtenerProveedorPorId(id: number): void {
    this.proveedoresService.getProvidersById(id).subscribe(
      res => {
        this.proveedor = res;
      },
      err => console.error(err)
    );
  }
}
