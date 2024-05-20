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
  username: string = '';

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.usuarioService.getUsuarioById(this.id).subscribe(
        (res: any) => {
          this.username = res.username; // Cambio aquí
        },
        err => console.error(err)
      );
    });
  }

  eliminarUsuario(): void {
    if (!confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      return;
    }

    this.usuarioService.eliminarUsuario(this.id).subscribe(
      () => {
        console.log('Usuario eliminado con éxito');
        this.router.navigate(['/usuario']); // Cambio aquí
      },
      // (error: any) => {
      //   console.error('Error al eliminar el usuario:', error);
      //   alert('Error al eliminar el usuario. Por favor, inténtalo de nuevo.');
      // }
    );
  }
}
