import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.css']
})
export class ActualizarUsuarioComponent implements OnInit {
  id: number = 0;
  username: string = '';
  password: string = '';
  email: string = '';
  rol: string = '';
  completeName: string = '';
  address: string = '';
  phone: string = '';
  status: string = '';

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.usuarioService.getUsuarioById(this.id).subscribe(
        (res: any) => {
          this.username = res.username;
          this.password = res.password;
          this.email = res.email;
          this.rol = res.rol.id;
          this.completeName = res.completeName;
          this.address = res.address;
          this.phone = res.phone;
          this.status = res.status;
        },
        err => console.error(err)
      );
    });
  }

  actualizarUsuario(): void {
    if (
      this.username.trim() === '' || this.password.trim() === '' || this.email.trim() === '' ||
      this.rol.trim() === '' || this.completeName.trim() === '' || this.address.trim() === '' ||
      this.phone.trim() === '' || this.status.trim() === ''
    ) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    const usuarioActualizado = {
      id: this.id,
      username: this.username,
      password: this.password,
      email: this.email,
      rol: this.rol,
      completeName: this.completeName,
      address: this.address,
      phone: this.phone,
      status: this.status
    };

    this.usuarioService.actualizarUsuario(this.id, usuarioActualizado).subscribe(
      (response: any) => {
        console.log('Usuario actualizado con éxito:', response);
        this.router.navigate(['/usuario']);
      },
      (error: any) => {
        console.error('Error al actualizar el usuario:', error);
        alert('Error al actualizar el usuario. Por favor, inténtalo de nuevo.');
      }
    );
  }
}
