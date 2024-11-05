import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { RolService } from '../../services/rol.service';
import { UsuarioService } from '../../services/usuario.service';

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
    private rolService: RolService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarRoles();
  }

  // Método para cargar los roles desde el servicio
  cargarRoles(): void {
    this.rolService.getAllRoles().subscribe(
      (data: any[]) => {
        this.roles = data;
      },
      (error: any) => {
        console.error('Error al cargar los roles:', error);
      }
    );
  }

  // Método para guardar el usuario
  guardarUsuario(): void {
    // Validación de campos requeridos
    if (!this.username.trim() || !this.password.trim() || !this.email.trim() || this.rolId <= 0) {
      alert('Por favor, completa todos los campos obligatorios y selecciona un rol válido.');
      return;
    }

    // Creación del objeto del nuevo usuario
    const newUser = {
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

    // Llamada al servicio para crear el usuario
    this.usuarioService.crearUsuario(newUser).subscribe(
      (response: any) => {
        console.log('Usuario guardado con éxito:', response);
        Toastify({
          text: "El usuario se ha guardado con éxito",
          duration: 3000,
          gravity: "top",
          position: "center",
          backgroundColor: "#36CB7C",
        }).showToast();
        this.router.navigate(['/usuario']);
      },
      (error: any) => {
        console.error('Error al guardar el usuario:', error);
        Toastify({
          text: "Error al guardar usuario. Inténtalo de nuevo.",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#ff5f6d",
        }).showToast();
      }
    );
  }

  // Método para manejar el cambio de selección de rol
  onRoleChange(event: any): void {
    const selectedRoleId = +event.target.value;
    const selectedRole = this.roles.find(rol => rol.id === selectedRoleId);

    if (selectedRole) {
      this.rolId = selectedRole.id;
      this.rolName = selectedRole.name;
    } else {
      this.rolId = 0; // Restablecer el rol si no es válido
    }
  }
}
