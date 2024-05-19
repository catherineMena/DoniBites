import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {
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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarRoles();
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

  guardarUsuario(): void {
    if (this.username.trim() === '' || this.password.trim() === '' || this.email.trim() === '' || this.rolId <= 0) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    const nuevoUsuario = {
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

    this.usuarioService.crearUsuario(nuevoUsuario).subscribe(
      (response: any) => {
        console.log('Usuario guardado con éxito:', response);
        this.router.navigate(['/usuarios']);
      },
      (error: any) => {
        console.error('Error al guardar el usuario:', error);
        alert('Error al guardar el usuario. Por favor, inténtalo de nuevo.');
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
