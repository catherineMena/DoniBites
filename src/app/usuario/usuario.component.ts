import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuarios: any = [];

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.usuarioService.getAllUsuarios().subscribe(
      res => {
        this.usuarios = res;
      },
      err => console.error(err)
    );
  }

  verUsuario(id: number): void {
    this.router.navigate(['/visualizar-usuario', id]);
  }

  editarUsuario(id: number): void {
    this.router.navigate(['/actualizar-usuario', id]);
  }

  eliminarUsuario(id: number): void {
    this.router.navigate(['/eliminar-usuario', id]);
  }
}


