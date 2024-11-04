import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
        this.router.navigate(['/usuario']); // Redirige a la lista de usuarios u otra página según tu flujo
      },
      (error: any) => {
        console.error('Error al eliminar el usuario:', error);
        alert('Error al eliminar el usuario. Por favor, inténtalo de nuevo.');
      }
    );
  }
}
