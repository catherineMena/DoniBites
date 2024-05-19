import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-visualizar-usuario',
  templateUrl: './visualizar-usuario.component.html',
  styleUrls: ['./visualizar-usuario.component.css']
})
export class VisualizarUsuarioComponent implements OnInit {
  usuario: any;

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const usuarioId = +params['id'];
      this.obtenerUsuarioPorId(usuarioId);
    });
  }

  obtenerUsuarioPorId(id: number): void {
    this.usuarioService.getUsuarioById(id).subscribe(
      res => {
        this.usuario = res;
      },
      err => console.error(err)
    );
  }
}
