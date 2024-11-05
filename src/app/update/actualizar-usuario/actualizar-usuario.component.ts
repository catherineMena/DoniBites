import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { RolService } from '../../services/rol.service';
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
  rolId: number = 0;
  rolName: string = '';
  completeName: string = '';
  address: string = '';
  phone: string = '';
  status: string = ''; // Asegúrate de que esto esté definido para el estado

  roles: any[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private rolService: RolService
  ) { }

  ngOnInit(): void {
    this.cargarRoles();
    this.obtenerUsuario();
  }

  cargarRoles(): void {
    this.rolService.getAllRoles().subscribe(
      (data: any[]) => {
        this.roles = data;
        console.log(this.roles); // Verifica que se estén cargando correctamente
      },
      (error: any) => {
        console.error('Error al cargar los roles:', error);
      }
    );
  }

  obtenerUsuario(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // Convertir el ID a número
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
          this.status = res.status; // Asegúrate de que este campo se esté asignando
        },
        err => console.error('Error al obtener el usuario:', err)
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
      status: this.status // Asegúrate de que el estado se incluya aquí
    };

    this.usuarioService.actualizarUsuario(this.id, usuarioActualizado).subscribe(
      (response: any) => {
        console.log('Usuario actualizado con éxito:', response);
        Toastify({
          text: "Usuario actualizado con éxito",
          duration: 3000,
          gravity: "top", // `top` o `bottom`
          position: "center", // `left`, `center` o `right`
          backgroundColor: "#36CB7C",
        }).showToast();
        this.router.navigate(['/usuario']);
      },
      (error: any) => {
        console.error('Error al actualizar el usuario:', error);
        Toastify({
          text: "Error al actualizar el usuario. Por favor, inténtalo de nuevo.",
          duration: 3000,
          gravity: "top",
          position: "center",
          backgroundColor: "#ff5f6d",
        }).showToast();
      }
    );
  }

  // Método para manejar el cambio de selección de rol
  onRoleChange(event: any): void {
    const selectedRoleId = +event.target.value; // Convertir a número
    const selectedRole = this.roles.find(rol => rol.id === selectedRoleId);

    if (selectedRole) {
      this.rolId = selectedRole.id;
      this.rolName = selectedRole.name;
    } else {
      this.rolId = 0; // Restablecer el rol si no es válido
    }
  }
}
