import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent implements OnInit {
  id: number = 0;
  usuario: any = {};

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.usuarioService.getUsuarioById(this.id).subscribe(
        (res: any) => {
          this.usuario = res;
        },
        err => console.error(err)
      );
    });
  }

  eliminarUsuario(): void {
    this.usuarioService.eliminarUsuario(this.id).subscribe(
      () => {
        console.log('Usuario eliminado con éxito');
        Toastify({
          text: "Usuario eliminado con éxito",
          duration: 3000,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          backgroundColor: "#36CB7C",
        }).showToast();
        this.router.navigate(['/usuario']); // Redirige a la lista de usuarios u otra página según tu flujo
      },
      (error: any) => {
        console.error('Error al eliminar el usuario:', error);
        Toastify({
          text: "Error al eliminar el usuario. Por favor, inténtalo de nuevo.",
          duration: 3000,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          backgroundColor: "#ff5f6d",
        }).showToast();
      }
    );
  }
}
