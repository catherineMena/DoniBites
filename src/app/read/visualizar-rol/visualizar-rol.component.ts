import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RolService } from '../../services/rol.service';

@Component({
  selector: 'app-visualizar-rol',
  templateUrl: './visualizar-rol.component.html',
  styleUrls: ['./visualizar-rol.component.css']
})
export class VisualizarRolComponent implements OnInit {
  rol: any;

  constructor(private rolService: RolService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const rolId = +params['id'];
      this.obtenerRolPorId(rolId);
    });
  }

  obtenerRolPorId(id: number): void {
    this.rolService.getRoleById(id).subscribe(
      res => {
        this.rol = res;
      },
      err => {
        console.error('Error al obtener rol:', err);
        alert('No se pudo obtener el rol.'); // Muestra un mensaje al usuario
      }
    );
  }
}
