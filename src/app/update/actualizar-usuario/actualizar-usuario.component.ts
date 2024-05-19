import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  rolId: number = 0;
  rolName: string = '';
  completeName: string = '';
  address: string = '';
  phone: string = '';
  status: string = '';

  roles: any[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargarRoles();
    this.obtenerUsuario();
  }

  cargarRoles(): void {
    this.usuarioService.getAllRoles().subscribe(
      (data: any[]) => {
        this.roles = data;
      },
      (error: any) => {
        console.error('Error al cargar los roles:', error);
      }
    );
  }

  obtenerUsuario(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.usuarioService.getUsuarioById(this.id).subscribe(
        (res: any) => {
          this.username = res.username;
          this.password = res.password;
          this.email = res.email;
          this.rolId = res.rol.id;
          this.rolName = res.rol.name;
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
    if (this.username.trim() === '' || this.password.trim() === '' || this.email.trim() === '' || this.rolId <= 0) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    const usuarioActualizado = {
      id: this.id,
      username: this.username,
      password: this.password,
      email: this.email,
      rol: {
        id: this.rolId,
        name: this.rolName
      },
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

  onRoleChange(event: any): void {
    const selectedRole = this.roles.find(rol => rol.id === +event.target.value);
    if (selectedRole) {
      this.rolName = selectedRole.name;
    }
  }
}
